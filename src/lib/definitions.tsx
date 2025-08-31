import { z } from 'zod'

export const SignupFormSchema = z.object({
    phone: z
        .string()
        .regex(/^254\d{9}$/, { message: "Phone number must be in format 254XXXXXXXXX (12 digits)." })
        .trim(),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
    confirmPassword: z.string().trim(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // error will show on confirmPassword field
})

export type FormState =
    | {
        errors?: {
            phone?: string[]
            email?: string[]
            password?: string[]
            confirmPassword?: string[]
        }
        message?: string
        success?: boolean
    }
    | undefined