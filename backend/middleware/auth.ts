import { Request, Response, NextFunction } from 'express';
// import { clerkClient } from '@clerk/clerk-sdk-node';
import { verifyToken } from '@clerk/backend';

declare global {
    namespace Express {
        interface Request {
            auth?: {
                userId: string;
                sessionId: string;
            };
        }
    }
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('Auth headers:', req.headers); // Debug log
        const sessionToken = req.headers.authorization?.split(' ')[1];
        console.log('Session token:', sessionToken); // Debug log
        
        if (!sessionToken) {
            console.log('No token provided'); // Debug log
            return res.status(401).json({ error: 'No token provided' });
        }

        // Verify the JWT token from Clerk
        const { sessionId, userId } = await verifyToken(sessionToken, {
            secretKey: process.env.CLERK_SECRET_KEY!,
            issuer: process.env.CLERK_ISSUER!,
        });
        console.log('Verified session:', String(sessionId), 'user:', String(userId)); // Debug log

        // Add auth info to request object
        req.auth = {
            userId: String(userId),
            sessionId: String(sessionId)
        };

        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({ error: 'Authentication failed' });
    }
}; 