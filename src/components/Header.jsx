
import { Sun, LogOut, Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../pages/Dashboard/index.css'

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const {logout}=useAuth();
    const navigate=useNavigate();

    const handleLogout=()=>{
         logout();
         toast.success("Logout")
         navigate('/login');
    }

    return (
        <header className="dont-print bg-linear-to-br from-red-600 via-red-700 to-red-600 text-white shadow-2xl relative overflow-hidden">
            {/* Decorative background elements */}

            <div className="relative max-w-7xl mx-auto px-4 ">
                <div className="flex items-center justify-between py-4 ">
                    {/* Logo and Title Section */}
                    <div className="flex items-center gap-3 lg:gap-4 z-10">
                        <div className="bg-white rounded-xl p-2.5 lg:p-3 shadow-lg transform hover:scale-105 transition-transform duration-200">
                            <Sun className="w-7 h-7  text-red-600 animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-sm sm:text-2xl  font-bold tracking-tight">
                                Proposal Dashboard
                            </h1>
                            <p className="text-xs sm:text-sm  opacity-90 font-light">
                                Powered by Gautam Solar
                            </p>
                        </div>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4 lg:gap-6 z-10">
                        {/* Company Badge */}
                        <div className="bg-white/0 backdrop-blur-sm rounded-xl px-4 py-2.5  shadow-lg">
                            <div className="flex items-center gap-3">
                                <img
                                    src="/logo.png"
                                    alt="Gautam Solar"
                                    className="h-8 lg:h-12 w-auto object-contain"
                                    
                                    loading='lazy'
                                />
                                <span className="hidden text-sm  font-bold text-gray-800 whitespace-nowrap">
                                    GAUTAM SOLAR
                                </span>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="group cursor-pointer bg-white/10 hover:bg-white backdrop-blur-sm border-2 border-white/30 hover:border-white rounded-xl px-4 lg:px-6 py-2.5 lg:py-3 flex items-center gap-2 lg:gap-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            <LogOut className="w-5 h-5 text-white group-hover:text-red-600 transition-colors" />
                            <span className="text-sm lg:text-base font-semibold text-white group-hover:text-red-600 transition-colors">
                                Logout
                            </span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg p-2 z-10"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden pb-4 z-10 relative">
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 space-y-3 border border-white/20">
                            {/* Company Info */}
                            <div className="bg-white/95 rounded-lg px-4 py-3 flex items-center justify-center gap-2">
                                <img
                                    src="/logo.png"
                                    alt="Gautam Solar"
                                    className="h-8 w-auto object-contain"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'block';
                                    }}
                                />
                                <span className="hidden text-sm font-bold text-gray-800">
                                    GAUTAM SOLAR
                                </span>
                            </div>

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="w-full bg-white hover:bg-red-50 text-red-600 rounded-lg px-4 py-3 flex items-center justify-center gap-2 transition-colors font-semibold shadow-md"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom accent line */}
            {/* <div className="h-1 bg-linear-to-r from-yellow-400 via-orange-400 to-red-400"></div> */}
        </header>
    )
}

export default Header