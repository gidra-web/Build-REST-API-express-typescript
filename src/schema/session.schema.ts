import {object, string} from 'zod';

export const createSessionSchema = object({
    body: object({
        email: string({
            required_error: 'Email is required',
        }).email('Invalid email'),
        password: string({
            required_error: 'Password is required',
        }).min(7, 'Min 7 characters'),
    }),
});