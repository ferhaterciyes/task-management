import { z } from 'zod';

export const LoginFormValidation = z.object({
    email: z.string().email({ message: "Geçersiz email adresi" }),
    password: z.string().min(6, { message: "Şifre en az 6 karakter olmalıdır" }),
    tcKimlikNo: z.string()
        .length(11, { message: "TC Kimlik No 11 haneli olmalıdır" })
        .regex(/^\d+$/, { message: "TC Kimlik No sadece rakamlardan oluşmalıdır" })
});
