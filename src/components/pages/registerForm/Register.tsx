import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebaseConfig.ts";
import { validateTCKimlikNo } from "../../../utils/validation.ts";
import ControllerInput from "../../molecules/ControllerInput.tsx";
import {RegisterFormValidationSchema} from "./validation/RegisterFormValidation.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {RegisterFormValues} from "./types.ts";

const Register = () => {
    const { control, handleSubmit } = useForm<RegisterFormValues>({
        resolver:zodResolver(RegisterFormValidationSchema)
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (data: RegisterFormValues) => {
        try {
            setError("");
            setLoading(true);

            if (data.password !== data.confirmPassword) {
                setError("Şifreler eşleşmiyor");
                return;
            }

            if (!validateTCKimlikNo(data.tcKimlikNo)) {
                setError("Geçersiz TC Kimlik Numarası");
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await setDoc(doc(db, "users", userCredential.user.uid), {
                uid: userCredential.user.uid,
                email: data.email,
                displayName: data.displayName,
                tcKimlikNo: data.tcKimlikNo,
                role: "user",
                createdAt: new Date().toISOString()
            });

            navigate("/login", { replace: true });
        } catch (error: any) {
            console.error("Register error:", error);
            if (error.code === "auth/email-already-in-use") {
                setError("Bu email adresi zaten kullanımda");
            } else {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Hesap Oluştur
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <ControllerInput
                            name="displayName"
                            control={control}
                            label="Ad Soyad"
                        />

                        <ControllerInput
                            name="email"
                            control={control}
                            label="Email"
                            type="email"
                        />

                        <ControllerInput
                            name="tcKimlikNo"
                            control={control}
                            label="TC Kimlik No"
                        />

                        <ControllerInput
                            name="password"
                            control={control}
                            label="Şifre"
                            type="password"
                        />

                        <ControllerInput
                            name="confirmPassword"
                            control={control}
                            label="Şifre Tekrar"
                            type="password"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                                loading
                                    ? "bg-blue-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            {loading ? "Kaydediliyor..." : "Kayıt Ol"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
