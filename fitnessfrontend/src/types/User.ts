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