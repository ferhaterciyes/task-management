import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface AuthUser extends User {
    displayName: string | null;
    email: string | null;
}

const useAuth = () => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [role, setRole] = useState<"user" | "admin">("user");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            try {
                if (!isMounted) return;
                setLoading(true);

                if (firebaseUser) {
                    const userDocRef = doc(db, "users", firebaseUser.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (!isMounted) return;

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setRole(userData.role || "user");
                        setUser(firebaseUser as AuthUser);
                    } else {
                        const newUserData = {
                            uid: firebaseUser.uid,
                            role: "user",
                            email: firebaseUser.email,
                            displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Kullanıcı',
                            tcKimlikNo: ""
                        };
                        await setDoc(userDocRef, newUserData);
                        if (!isMounted) return;
                        setRole("user");
                        setUser(firebaseUser as AuthUser);
                    }
                } else {
                    if (!isMounted) return;
                    setUser(null);
                    setRole("user");
                }
            } catch (error) {
                console.error("Auth state change error:", error);
                if (!isMounted) return;
                setUser(null);
                setRole("user");
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        });

        return () => {
            isMounted = false;
            unsubscribe();
        };
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setRole("user");
        } catch (error) {
            console.error("Logout error:", error);
            throw error;
        }
    };

    return {
        user,
        role,
        loading,
        isAdmin: role === "admin",
        currentUser: user,
        logout
    };
};

export default useAuth;
