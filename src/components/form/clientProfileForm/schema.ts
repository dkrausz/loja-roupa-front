import {z} from "zod";

const minValidDate = () => {
  const nowDate = new Date();
  const minAge = nowDate.setFullYear(nowDate.getFullYear() - 18, nowDate.getMonth(), nowDate.getDay());
  return minAge;
};

export const updateClientSchema = z
  .object({
    name: z.string().max(255).min(1, "o campo nome é obrigatorio"),
    email: z.string().email().min(1, "o campo email é obrigatorio"),
    password: z
      .string()
      .min(8, "A senha precisa ter no minimo 8 caracteres")
      .regex(/[a-z]+/, "É necessario pelo menos uma letra minuscula")
      .regex(/[A-Z]+/, "É necessario pelo menos uma letra maiuscula")
      .regex(/[0-9]+/, "É necessario pelo menos um número")
      .regex(/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]+/, "É necessário conter pelo menos um caracter especial."),
    confirmPwd: z.string(),
    birthDate: z.coerce.date().max(new Date(minValidDate())),
    CPF: z.string().max(14),
    phone: z.string().max(14),
  })
  .partial();

export type TUpdateClient = z.infer<typeof updateClientSchema>;
