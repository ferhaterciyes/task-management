import { ReactNode } from "react";
import { Link } from "react-router-dom";

type DashboardLayoutProps = {
    children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white p-4">
                <h2 className="text-lg font-bold mb-4">Görev Yönetimi</h2>
                <ul className="space-y-2">
                    <li>
                        <Link to="/" className="block p-2 rounded hover:bg-gray-700 transition-colors">
                            Ana Sayfa
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin" className="block p-2 rounded hover:bg-gray-700 transition-colors">
                            Görevler
                        </Link>
                    </li>
                </ul>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6 bg-gray-100">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
