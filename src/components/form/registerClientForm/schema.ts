import {z} from "zod";

const minValidDate = () => {
  const nowDate = new Date();
  const minAge = nowDate.setFullYear(nowDate.getFullYear() - 18, nowDate.getMonth(), nowDate.getDay());
  return minAge;
};

export const clientSchema = z.object({
  name: z.string().max(255).min(1, "Nome é obrigatorio"),
  email: z.string().email().min(1, "Email é obrigatorio"),
  password: z
    .string()
    .min(8, "A senha precisa ter 8 caracteres")
    .max(50)
    .regex(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/),
  confirmPwd: z
    .string()
    .min(8)
    .max(50)
    .regex(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/),
  birthDate: z.coerce.date().max(new Date(minValidDate())),
  CPF: z.string().max(11),
  phone: z.string().max(11),
});

export type TCreateClient = z.infer<typeof clientSchema>;
