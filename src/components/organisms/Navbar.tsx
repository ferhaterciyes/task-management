import { useState } from 'react';
      import { Link, useNavigate } from 'react-router-dom';
      import useAuth from '../../hooks/useAuth.ts';
      import { FiMenu, FiX, FiUser, FiLogOut, FiPlusCircle } from 'react-icons/fi';
      import Button from '../atom/Button.tsx';

      const Navbar = () => {
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const { user, logout, isAdmin } = useAuth();
        const navigate = useNavigate();

        const handleLogout = async () => {
          try {
            setIsMenuOpen(false);
            await logout();
            navigate('/', { replace: true });
          } catch (error) {
            console.error('Çıkış yapılırken hata oluştu:', error);
          }
        };

        const handleNavigation = (path: string) => {
          setIsMenuOpen(false);
          navigate(path);
        };

        return (
          <nav className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold" onClick={() => setIsMenuOpen(false)}>
                  Görev Yönetimi
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-4">
                  {user ? (
                    <>
                      <Button
                        text="Görevleri Yönet"
                        onClick={() => handleNavigation('/admin')}
                        className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        <FiPlusCircle />
                      </Button>

                      <div className="px-3 py-2 font-medium">
                        <FiUser className="inline mr-1" />
                        {user.displayName || user.email}
                        {isAdmin && <span className="ml-1 text-xs bg-yellow-500 text-yellow-900 px-1.5 py-0.5 rounded-full">Admin</span>}
                      </div>

                      <Button
                        text="Çıkış"
                        onClick={handleLogout}
                        className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        <FiLogOut />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        text="Giriş"
                        onClick={() => handleNavigation('/login')}
                        className="px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      />
                      <Button
                        text="Kayıt Ol"
                        onClick={() => handleNavigation('/register')}
                        className="px-3 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-colors"
                      />
                    </>
                  )}
                </div>

                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden bg-blue-600 pb-3 px-4">
                {user ? (
                  <div className="flex flex-col space-y-2">
                    <div className="px-3 py-2 font-medium">
                      <FiUser className="inline mr-1" />
                      {user.displayName || user.email}
                      {isAdmin && <span className="ml-1 text-xs bg-yellow-500 text-yellow-900 px-1.5 py-0.5 rounded-full">Admin</span>}
                    </div>

                    <Button
                      text="Görevleri Yönet"
                      onClick={() => handleNavigation('/admin')}
                      className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-blue-700 transition-colors text-left"
                    >
                      <FiPlusCircle />
                    </Button>

                    <Button
                      text="Çıkış"
                      onClick={handleLogout}
                      className="flex items-center gap-1 w-full text-left px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <FiLogOut />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Button
                      text="Giriş"
                      onClick={() => handleNavigation('/login')}
                      className="px-3 py-2 rounded-md hover:bg-blue-700 transition-colors text-left"
                    />
                    <Button
                      text="Kayıt Ol"
                      onClick={() => handleNavigation('/register')}
                      className="px-3 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-colors text-left"
                    />
                  </div>
                )}
              </div>
            )}
          </nav>
        );
      };

      export default Navbar;
