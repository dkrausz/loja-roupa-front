import {z} from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8,{message:"Senha precisa conter 8 caracteres"}).max(50).regex(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/)

});

  
export type TloginForm = z.infer<typeof loginSchema>;