import { Request, Response, NextFunction } from 'express';
import { clerkClient, verifyToken } from '@clerk/clerk-sdk-node';

declare global {
    namespace Express {
        interface RequestAuth {
            userId: string;
            sessionId: string;
        }
        interface Request {
            auth: RequestAuth;
            user?: Awaited<ReturnType<typeof clerkClient.users.getUser>>;
        }
    }
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    // console.log('Auth Middleware: Entered requireAuth'); 
    const authHeader = req.headers.authorization;
    const sessionToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

    if (!sessionToken) {
        // console.log('Auth Middleware: No token provided. Authorization header missing or malformed.');
        return res.status(401).json({ error: 'No token provided. Authorization header missing or malformed.' });
    }

    try {
        // console.log('Auth Middleware: Attempting to verify token.');
        if (!process.env.CLERK_SECRET_KEY) {
            console.error('Auth Middleware: CLERK_SECRET_KEY is not set.');
            return res.status(500).json({ error: 'Server configuration error (secret key missing).' });
        }
        // CLERK_ISSUER is typically your instance URL e.g. https://<your-instance-id>.clerk.accounts.dev
        // It can also be found in your Clerk Dashboard -> API Keys -> (Select an SDK key) -> JWT Templates -> Issuer
        // Ensure it matches exactly, including the https://
        const clerkIssuer = process.env.CLERK_ISSUER;
        if (!clerkIssuer) { 
            console.error('Auth Middleware: CLERK_ISSUER environment variable is not set.');
            return res.status(500).json({ error: 'Server configuration error (issuer missing).' });
        }

        const claims = await verifyToken(sessionToken, {
            secretKey: process.env.CLERK_SECRET_KEY,
            issuer: clerkIssuer, 
            // authorizedParties: process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',') : undefined,
        });

        // console.log('Auth Middleware: Token verified. Claims:', JSON.stringify(claims, null, 2));

        if (!claims.sub || !claims.sid) { 
            console.error('Auth Middleware: Token claims missing sub (userId) or sid (sessionId).');
            return res.status(401).json({ error: 'Invalid token claims.' });
        }

        req.auth = {
            userId: claims.sub,
            sessionId: claims.sid,
        };

        try {
            // console.log(`Auth Middleware: Fetching full user object for userId: ${req.auth.userId}`);
            const fullUser = await clerkClient.users.getUser(req.auth.userId);
            req.user = fullUser;
            // console.log('Auth Middleware: req.user populated.'); // Simplified log for brevity
        } catch (userError: any) {
            console.error(`Auth Middleware: Failed to fetch full user object for userId ${req.auth.userId}:`, userError);
            
            // Handle rate limiting specifically
            if (userError.status === 429) {
                console.warn('Auth Middleware: Rate limited by Clerk API, proceeding without full user object');
                // Don't fail the request, just proceed without req.user
                // The getUserIdFromRequest function can fall back to query parameters
            } else {
                console.error('Auth Middleware: Unexpected error fetching user object:', userError);
                // For other errors, still proceed but log the error
            }
            // Continue with the request - getUserIdFromRequest can handle missing req.user
        }

        next();
    } catch (error: any) {
        console.error('Auth Middleware: Token verification failed or other error:', error.message);
        // console.error(error.stack); // Optionally log full stack for more details
        if (error.message && (error.message.includes('Token has expired') || error.message.includes('exp'))) {
             return res.status(401).json({ error: 'Token expired. Please sign in again.', code: 'TOKEN_EXPIRED' });
        }
        // Add more specific error checks based on Clerk common errors if needed
        // For instance, clock skew errors, issuer mismatch, etc.
        return res.status(401).json({ error: 'Authentication failed. Invalid token.' });
    }
}; 