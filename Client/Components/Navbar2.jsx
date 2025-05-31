import React, { useState, useEffect } from "react";
import { Menu, X, Home, Mail, UserPlus, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    const handleAuthChange = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    window.addEventListener("authChanged", handleAuthChange);
    return () => window.removeEventListener("authChanged", handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('admin-auth');
    window.location.reload();
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  const navItems = [
    { id: "home", label: "Home", icon: Home, href: "/" },
    !isAuthenticated
      ? { id: "signup", label: "Sign Up", icon: UserPlus, href: "/signup", isButton: true }
      : { id: "logout", label: "Logout", icon: LogOut, action: handleLogout, isButton: true },
  ];

  return (
    <nav className="bg-black shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <a href="/Home" className="flex items-center space-x-4">
            <img 
              src="https://faceprep.in/wp-content/uploads/2023/10/Vector.png" 
              alt="logo" 
              className="h-24 w-44 mt-8"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) =>
              item.isButton ? (
                item.action ? (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="px-4 py-2 rounded-md bg-red-700 hover:bg-red-800 flex items-center gap-2 text-white"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <a
                    key={item.id}
                    href={item.href}
                    className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </a>
                )
              ) : (
                <a
                  key={item.id}
                  href={item.href}
                  className="text-white hover:text-blue-400 flex items-center gap-2"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </a>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-200 hover:text-blue-400"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            {navItems.map((item) =>
              item.isButton ? (
                item.action ? (
                  <button
                    key={item.id}
                    onClick={() => {
                      item.action();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2 text-white bg-red-700 hover:bg-red-800 w-full rounded-md"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <a
                    key={item.id}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 text-white bg-green-600 hover:bg-green-700 w-full rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </a>
                )
              ) : (
                <a
                  key={item.id}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 text-gray-200 hover:text-blue-400 hover:bg-gray-800 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </a>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
