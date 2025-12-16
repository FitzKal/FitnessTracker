import {z} from 'zod';
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]


export interface User {
    id?:number,
    username:string,
    password?:string,
    email?:string
    role?:"ADMIN"|"USER",
    accessToken?: string
}

export type UserRegisterType = {
    user:User | null,
    lastOTP:string | null,
    otpTime:string | null
}
export type ResendTokenType = {
    email:string | undefined
}

export interface UserProfile{
    id?:number,
    firstName?:string,
    lastName?:string,
    height?:number,
    weight?:number,
    profilePictureName?:string,
    profilePictureSrc?:string
}

export const UpdateSchema = z.object({
    firstName:z.string().min(3,"The first name should be at least 3 characters long"),
    lastName:z.string().min(3,"The last name should be at least 3 characters long"),
    height:z.number(),
    weight:z.number(),
    image: z
        .any()
        .refine((files) => {
            if (!files) return true;
            if (files instanceof FileList && files.length === 0) return true;

            const file = files[0];
            return ACCEPTED_IMAGE_TYPES.includes(file.type);
        }, "Invalid file type. Only JPEG, PNG, and WebP are allowed.")
});

export type UserUpdate = z.infer<typeof UpdateSchema>;

export type UserUpdateRequest = {
    firstName?:string,
    lastName?:string,
    height?:number,
    weight?:number,
}