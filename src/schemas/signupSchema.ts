import {z} from 'zod'

export const userNameValidation = z
    .string()
    .min(2, "username must be atleast 2 character")
    .max(30, "username must be no more than 30 character")
    .regex(/^[a-zA-Z0-9_]+$/ , "username must not contain special character")

export const signupSchema = z.object({
    userName: userNameValidation,
    email: z.string().email({message: 'invalid email address'}),
    password: z.string().min(6,"password must be atleast 6 characters").max(20, "password must not have more than 20 characters")
})