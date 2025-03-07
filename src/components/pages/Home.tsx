import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Görev Yönetim Uygulaması
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Projelerinizi ve görevlerinizi kolayca yönetin
                    </p>

                    {!user ? (
                        <div className="space-x-4">
                            <Link
                                to="/login"
                                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Giriş Yap
                            </Link>
                            <Link
                                to="/register"
                                className="inline-block px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                            >
                                Kayıt Ol
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-lg text-gray-700">
                                Hoş geldin, {user.displayName || user.email}
                            </p>
                            <Link
                                to="/admin"
                                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Görevleri Yönet
                            </Link>
                        </div>
                    )}

                    <div className="mt-16 grid md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-3">Görev Oluşturma</h3>
                            <p className="text-gray-600">
                                Yeni görevler oluşturun ve detayları ekleyin
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-3">Görev Takibi</h3>
                            <p className="text-gray-600">
                                Görevlerin durumunu kolayca takip edin
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-3">Yetkilendirme</h3>
                            <p className="text-gray-600">
                                Güvenli yetkilendirme sistemi ile görevleri yönetin
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
