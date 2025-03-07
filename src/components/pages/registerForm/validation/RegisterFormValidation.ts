import { z } from 'zod';

export const RegisterFormValidationSchema = z.object({
    email: z.string().email({ message: "Geçersiz email adresi" }).nonempty({ message: "Email zorunludur" }),
    password: z.string().min(6, { message: "Şifre en az 6 karakter olmalıdır" }).nonempty({ message: "Şifre zorunludur" }),
    confirmPassword: z.string().min(6, { message: "Şifre en az 6 karakter olmalıdır" }).nonempty({ message: "Şifre tekrarı zorunludur" }),
    tcKimlikNo: z.string().length(11, { message: "TC Kimlik No 11 haneli olmalıdır" }).nonempty({ message: "TC Kimlik No zorunludur" }),
    displayName: z.string().min(3, { message: "Ad Soyad en az 3 karakter olmalıdır" }).nonempty({ message: "Ad Soyad zorunludur" }),
});
