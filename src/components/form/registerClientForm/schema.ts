import {z} from "zod";

const minValidDate = () => {
  const nowDate = new Date();
  const minAge = nowDate.setFullYear(nowDate.getFullYear() - 18, nowDate.getMonth(), nowDate.getDay());
  return minAge;
};

export const addressSchema = z.object({
  street: z.string().min(1).max(100),
  number: z.coerce.number().min(1),
  complement: z.string().max(100).nullish(),
  zipCode: z.string().regex(/^\d{5}-\d{3}$/, {message: "zipCode must be in format XXXXX-XXX"}),
  neighborhood: z.string().min(1).max(20),
  state: z.string().min(2).max(20),
  city: z.string().min(1).max(50),
  country: z.string().min(1).max(20),
  clientId: z.number().min(1).nullish(),
});

export const clientSchema = z
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
    address: addressSchema,
  })
  .refine(({password, confirmPwd}) => password === confirmPwd, {
    message: "As senhas não correspondem",
    path: ["confirmPwd"],
  });

export const changePasswordSchema = z
  .object({
    oldPassword: z.string(),
    password: z
      .string()
      .min(8, "A senha precisa ter no minimo 8 caracteres")
      .regex(/[a-z]+/, "É necessario pelo menos uma letra minuscula")
      .regex(/[A-Z]+/, "É necessario pelo menos uma letra maiuscula")
      .regex(/[0-9]+/, "É necessario pelo menos um número")
      .regex(/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]+/, "É necessário conter pelo menos um caracter especial."),
    confirmPwd: z.string(),
  })
  .refine(({password, confirmPwd}) => password === confirmPwd, {
    message: "As senhas não correspondem",
    path: ["confirmPwd"],
  });

export type TChangePassword = z.infer<typeof changePasswordSchema>;
export type TAddress = z.infer<typeof addressSchema>;

export type TCreateClient = z.infer<typeof clientSchema>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IAddress extends TAddress {}
