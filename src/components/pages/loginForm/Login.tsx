import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../../../firebase/firebaseConfig.ts";
import {useState} from 'react';
import { validateTCKimlikNo } from "../../../utils/validation.ts";
import { doc, getDoc } from "firebase/firestore";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoginFormValidation} from "./validation/LoginFormValidation.ts";
import ControllerInput from "../../molecules/ControllerInput.tsx";
import {LoginFormValues} from "./type.ts";


const Login = () => {
    const {control, handleSubmit} = useForm<LoginFormValues>({
        resolver:zodResolver(LoginFormValidation)
    });

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (data: LoginFormValues) => {
        setErrorMessage('');
        try {
            if (!validateTCKimlikNo(data.tcKimlikNo)) {
                setErrorMessage("Geçersiz TC Kimlik Numarası");
                return;
            }

            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);

            // TC Kimlik No doğrulaması
            const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
            const userData = userDoc.data();

            if (!userData || userData.tcKimlikNo !== data.tcKimlikNo) {
                setErrorMessage("TC Kimlik Numarası eşleşmiyor");
                return;
            }

            console.log("Logged in:", userCredential.user);
            navigate("/admin");
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Login error:", error.message);
                setErrorMessage(error.message);
            }
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-10 p-4 border rounded shadow">
            <h2 className="text-xl font-bold text-center mb-4">Giriş Yap</h2>
            {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <ControllerInput
                        control={control}
                        name="email"
                        label="Email"
                        placeholder="Email"
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <ControllerInput
                        control={control}
                        name="tcKimlikNo"
                        label="TC Kimlik No"
                        placeholder="TC Kimlik No"
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <ControllerInput
                        control={control}
                        name="password"
                        type="password"
                        placeholder="Şifre"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Giriş Yap
                </button>
            </form>
        </div>
    );
};

export default Login;
