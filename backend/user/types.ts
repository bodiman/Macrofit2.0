export class UserNotFoundError extends Error {
    constructor(message = 'User not found') {
        super(message); // Call parent constructor
        this.name = 'UserNotFoundError';
    }
}

export class BadRequestError extends Error {
    constructor(message = 'Bad request') {
        super(message); // Call parent constructor
        this.name = 'BadRequestError';
    }
}