
import { useForm } from "react-hook-form";
import { FiMail, FiLock, FiArrowRight, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import gautamimage from "../assets/gautamimage.jpg";
const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [loginType, setLoginType] = useState("dealer");

    const onSubmit = async (data) => {
        try {
            toast.dismiss();
            setLoading(true);

            if (loginType === "dealer") {
                let res = await axios.post(
                    `${import.meta.env.VITE_SERVER_ADDRESS}/api/dealer/login`,
                    data,
                );
                if (res?.data?.success) {
                    login(res?.data?.data, res?.data?.token, "dealer");
                    navigate("/dashboard");
                }
            } else if (loginType === "admin") {
                let res = await axios.post(
                    `${import.meta.env.VITE_SERVER_ADDRESS}/adminPanel/loginAdmin`,
                    data,
                    { withCredentials: true },
                );
                if (res?.data?.success) {
                    login(
                        res?.data?.data,
                        res?.data?.token,
                        res?.data?.data?.role,
                    );
                    navigate("/admin");
                }
            } else if (loginType === "sales") {
                let res = await axios.post(
                    `${import.meta.env.VITE_SERVER_ADDRESS}/api/sales/login`,
                    data,
                    { withCredentials: true },
                );
                if (res?.data?.success) {
                    login(res?.data?.data, res?.data?.token, "sales");
                    navigate("/salesdashbord");
                }
            }
        } catch (er) {
            toast.error(er?.response?.data?.message || er.message);
            console.log("error ", er);
        } finally {
            setLoading(false);
        }
    };

    const switchLoginType = (type) => {
        setLoginType(type);
        reset();
    };

    const titles = {
        dealer: {
            heading: "Dealer Login",
            sub: "Access your solar partnership dashboard",
        },
        admin: { heading: "Admin Login", sub: "" },
        sales: { heading: "Sales Login", sub: "Access your sales dashboard" },
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-red-600 via-red-900 to-white/50 p-4 font-sans">
            {/* ── Outer card split into LEFT + RIGHT ── */}
            <div className="flex w-full max-w-7xl rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] shadow-gray-400 border border-gray-300">
                {/* ══ LEFT — brand image ══ */}
                <div className="hidden md:block w-1/2 relative">
                    <img
                        src={gautamimage}
                        alt="Gautam Solar"
                        className="w-full h-full object-cover"
                    />
                    {/* subtle dark overlay so image doesn't feel too harsh */}
                    <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* ══ RIGHT — your original login form, completely unchanged ══ */}

                <div className="bg-white p-6 w-full md:w-1/2 flex flex-col justify-center">
                    {/* Brand Logo Section — same as before */}
                    <div className="flex flex-col items-center mb-8">
                        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                            {titles[loginType].heading}
                        </h2>

                        {titles[loginType].sub && (
                            <p className="text-gray-500 text-sm mt-1">
                                {titles[loginType].sub}
                            </p>
                        )}
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        {/* Email Field — hidden for Sales login */}

                        {/* <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-600 ml-1">
                                Email Address
                            </label>
                            <div className="group flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus-within:border-[#a20000] focus-within:bg-white focus-within:ring-4 focus-within:ring-red-50 transition-all duration-200">
                                <FiMail className="text-gray-400 group-focus-within:text-[#a20000] transition-colors" />
                                <input
                                    type="email"
                                    className="w-full bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none text-sm font-medium"
                                    placeholder="email@company.com"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-[11px] font-semibold text-red-600 ml-1 uppercase">
                                    {errors.email.message}
                                </p>
                            )}
                        </div> */}

                        {loginType !== "sales" ? (
                            // ✅ EMAIL (Dealer + Admin)
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-600 ml-1">
                                    Email Address
                                </label>
                                <div className="group flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus-within:border-[#a20000]">
                                    <FiMail className="text-gray-400" />
                                    <input
                                        type="email"
                                        placeholder="email@company.com"
                                        className="w-full bg-transparent focus:outline-none text-sm"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message:
                                                    "Invalid email address",
                                            },
                                        })}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-xs text-red-600">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                        ) : (
                            // ✅ USER ID (Sales)
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-600 ml-1">
                                    User ID
                                </label>
                                <div className="group flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus-within:border-[#a20000]">
                                    <FiUser className="text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Enter your User ID"
                                        className="w-full bg-transparent focus:outline-none text-sm"
                                        {...register("userId", {
                                            required: "User ID is required",
                                        })}
                                    />
                                </div>
                                {errors.userId && (
                                    <p className="text-xs text-red-600">
                                        {errors.userId.message}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* User ID Field — only for Sales login */}
                        {/* {loginType === "sales" && (
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-600 ml-1">
                                    User ID
                                </label>
                                <div className="group flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus-within:border-[#a20000] focus-within:bg-white focus-within:ring-4 focus-within:ring-red-50 transition-all duration-200">
                                    <FiUser className="text-gray-400 group-focus-within:text-[#a20000] transition-colors" />
                                    <input
                                        type="text"
                                        className="w-full bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none text-sm font-medium"
                                        placeholder="Enter your User ID"
                                        {...register("userId", {
                                            required: "User ID is required",
                                        })}
                                    />
                                </div>
                                {errors.userId && (
                                    <p className="text-[11px] font-semibold text-red-600 ml-1 uppercase">
                                        {errors.userId.message}
                                    </p>
                                )}
                            </div>
                        )} */}

                        {/* Password Field */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
                                    Password
                                </label>
                            </div>
                            <div className="group flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus-within:border-[#a20000] focus-within:bg-white focus-within:ring-4 focus-within:ring-red-50 transition-all duration-200">
                                <FiLock className="text-gray-400 group-focus-within:text-[#a20000] transition-colors" />
                                <input
                                    type="password"
                                    className="w-full bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none text-sm font-medium"
                                    placeholder="••••••••"
                                    {...register("password", {
                                        required: "Password is required",
                                    })}
                                />
                            </div>
                            {errors.password && (
                                <p className="text-[11px] font-semibold text-red-600 ml-1 uppercase">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="group cursor-pointer relative w-40 mx-auto flex items-center justify-center gap-2 overflow-hidden py-4 rounded-xl bg-[#a20000] text-white text-md tracking-widest shadow-xl shadow-red-900/10 hover:bg-[#850000] active:scale-[0.98] transition-all"
                        >
                            <span className="relative z-10 uppercase flex">
                                {loading ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <span className="flex items-center gap-1">
                                        Login Now
                                        <FiArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                )}
                            </span>
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>

                        {/* Footer Links */}
                        <div className="text-center pt-4 space-y-2">
                            {loginType === "dealer" && (
                                <p className="text-gray-500 text-sm font-medium">
                                    New to Gautam Solar?{" "}
                                    <Link
                                        to="/register"
                                        className="text-[#a20000] font-bold hover:underline"
                                    >
                                        Create Account
                                    </Link>
                                </p>
                            )}

                            <div className="flex items-center justify-center gap-5">
                                {loginType !== "dealer" && (
                                    <span
                                        onClick={() =>
                                            switchLoginType("dealer")
                                        }
                                        className="text-red-700 cursor-pointer hover:underline text-sm"
                                    >
                                        Dealer Login
                                    </span>
                                )}
                                {loginType !== "admin" && (
                                    <span
                                        onClick={() => switchLoginType("admin")}
                                        className="text-red-700 cursor-pointer hover:underline text-sm"
                                    >
                                        Admin Login
                                    </span>
                                )}
                                {loginType !== "sales" && (
                                    <span
                                        onClick={() => switchLoginType("sales")}
                                        className="text-red-700 cursor-pointer hover:underline text-sm"
                                    >
                                        Sales Login
                                    </span>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="fixed bottom-6 text-center w-full">
                <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em]">
                    © {new Date().getFullYear()} Gautam Solar Private Limited
                </p>
            </div>
        </div>
    );
};

export default Login;
