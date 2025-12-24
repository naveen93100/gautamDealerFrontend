import { useForm } from "react-hook-form";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom";
import { apiCall } from "../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      toast.dismiss()
      setLoading(true)
      let res = await apiCall('POST', '/api/dealer/login', data);

      if (res?.data?.success) {
        setLoading(false)
        toast.success(`Welcome,${(res?.data?.data?.firstName.charAt(0).toUpperCase()+res?.data?.data?.firstName.slice(1))}`)
        login(res?.data?.data, res?.data?.token)
        navigate('/dashboard')
      }

    } catch (er) {
      toast.error(er?.response?.data?.message);
      console.log(er);
    }
    finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-full shadow-gray-400 max-w-md border border-gray-300">

        {/* Brand Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="/logo.png"
            alt="Gautam Solar Logo"
            className="h-16 mb-4 object-contain"
          />
          <div className="h-1 w-12 bg-[#a20000] rounded-full mb-6"></div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Dealer Login
          </h2>
          <p className="text-gray-500 text-sm mt-1">Access your solar partnership dashboard</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Email Field */}
          <div className="space-y-1.5">
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
                    message: "Invalid email address"
                  }
                })}
              />
            </div>
            {errors.email && (
              <p className="text-[11px] font-semibold text-red-600 ml-1 uppercase">{errors.email.message}</p>
            )}
          </div>

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
                {...register("password", { required: "Password is required" })}
              />
            </div>
            {errors.password && (
              <p className="text-[11px] font-semibold text-red-600 ml-1 uppercase">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="group cursor-pointer relative w-40 mx-auto flex items-center justify-center gap-2 overflow-hidden py-4 rounded-xl bg-[#a20000] text-white  text-md tracking-widest shadow-xl shadow-red-900/10 hover:bg-[#850000] active:scale-[0.98] transition-all"
          >
            <span className="relative z-10 uppercase flex">
              {loading ?
                <Loader2 className="animate-spin" />
                :
                <span className="flex items-center">
                  Login Now
                  <FiArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </span>
              }
            </span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>

          {/* Footer Link */}
          <div className="text-center pt-4">
            <p className="text-gray-500 text-sm font-medium">
              New to Gautam Solar?{" "}
              <Link to="/register" className="text-[#a20000] font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </div>

        </form>
      </div>

      {/* Subtle bottom disclaimer */}
      <div className="fixed bottom-6 text-center w-full">
        <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em]">
          © { new Date().getFullYear()} Gautam Solar Private Limited
        </p>
      </div>
    </div>
  );
}

export default Login;