import {z} from 'zod';

export type LoginRequest = {
    username:string,
    password:string
}

export const schema = z.object({
    username:z.string().min(4,"The username should be at least 4 characters long"),
    password:z.string().min(6, "The password should be at least 6 characters long"),
    email:z.email()
});

export type RegisterRequest = z.infer<typeof schema>;

export type Verification = {
    verificationCode: string
}

export type BMIForm = {
    height: number,
    weight:number
}