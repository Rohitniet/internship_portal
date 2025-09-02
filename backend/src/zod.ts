import { z, ZodAny } from "zod";


export const userschema= z.object({
    
    name:z.string(),
    email:z.string().email(),
    password: z.string().min(5)

})

export const usersignin= z.object({
    
    
    email:z.string().email(),
    password: z.string().min(5)

})




export const employerschema= z.object({
    
    companyname:z.string(),
    email:z.string().email(),
    password: z.string().min(5)

})



export const employersignin= z.object({
    
    
    email:z.string().email(),
    password: z.string().min(5)

})