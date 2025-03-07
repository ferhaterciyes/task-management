import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/loginForm/Login.tsx";
import Register from "./components/pages/registerForm/Register.tsx";
import Admin from "./components/pages/Admin";
import DashboardLayout from "./components/templates/DashboardLayout";
import useAuth from "./hooks/useAuth";
import Loading from "./components/molecules/Loading.tsx";

const Router = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loading />
            </div>
        );
    }

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route
                path="/login"
                element={user ? <Navigate to="/admin" replace /> : <Login />}
            />
            <Route
                path="/register"
                element={user ? <Navigate to="/admin" replace /> : <Register />}
            />
            <Route
                path="/admin"
                element={
                    user ? (
                        <DashboardLayout>
                            <Admin />
                        </DashboardLayout>
                    ) : (
                        <Navigate to="/login" replace />
                    )
                }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default Router;
