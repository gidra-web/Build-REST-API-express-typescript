//used for all user endpoints
import {object, string, TypeOf} from 'zod';

export const createUserSchema = object({
    body: object({
        email: string({
            required_error: 'Email is required',
            invalid_type_error: 'Email must be a string',
        }).email('Invalid email'),
        name: string({
            required_error: 'Name is required',
            invalid_type_error: 'Name must be a string',
        }).min(1, 'Name is required'),
        password: string({
            required_error: 'Password is required',
            invalid_type_error: 'Password must be a string',
        }).min(8, 'Name is required'),
        passwordConfirmation: string({
            required_error: 'Password is required',
            invalid_type_error: 'Password must be a string',
        }).min(8, 'Name is required')
    }).refine((data)=> data.password === data.passwordConfirmation, {
        message:'Passwords do not match', path: ['passwordConfirmation']
    })
})


export type CreateUserInput = Omit<
TypeOf<typeof createUserSchema>,
"body.passwordConfirmation" >;