import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiUser, FiMail, FiFileText, FiHome, FiPhone, FiMapPin, FiUploadCloud } from "react-icons/fi";
import { apiCall } from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

const Registration = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [imgPrev, setImagePrev] = useState('');

    const logo = watch('companyLogo');

    const inputFields = [
        {
            id: "firstName",
            label: "First Name",
            icon: <FiUser />,
            placeholder: "John",
            validation: {
                required: "First Name is required",
                minLength: { value: 2, message: "Must be at least 2 characters" },
                maxLength: { value: 50, message: "Must not exceed 50 characters" },
                pattern: { value: /^[A-Za-z\s]+$/, message: "Only letters allowed" }
            }
        },
        {
            id: "lastName",
            label: "Last Name",
            icon: <FiUser />,
            placeholder: "Doe",
            validation: {
                required: "Last Name is required",
                minLength: { value: 2, message: "Must be at least 2 characters" },
                maxLength: { value: 50, message: "Must not exceed 50 characters" },
                pattern: { value: /^[A-Za-z\s]+$/, message: "Only letters allowed" }
            }
        },
        {
            id: "email",
            label: "Email Address",
            icon: <FiMail />,
            placeholder: "john@example.com",
            type: "email",
            validation: {
                required: "Email Address is required",
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email format"
                }
            }
        },
        {
            id: "gstin",
            label: "GSTIN",
            icon: <FiFileText />,
            placeholder: "22AAAAA0000A1Z5",
            validation: {
                required: "GSTIN is required",
                pattern: {
                    value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                    message: "Invalid GSTIN format"
                }
            }
        },
        {
            id: "companyName",
            label: "Company Name",
            icon: <FiHome />,
            placeholder: "Global Traders Inc.",
            validation: {
                required: "Company Name is required",
                minLength: { value: 2, message: "Must be at least 2 characters" },
                maxLength: { value: 100, message: "Must not exceed 100 characters" }
            }
        },
        {
            id: "contactNumber",
            label: "Contact Number",
            icon: <FiPhone />,
            placeholder: "9876XXXXXX",
            maxLength: 10,
            validation: {
                required: "Contact Number is required",
                pattern: {
                    value: /^[6-9][0-9]{9}$/,
                    message: "Invalid phone number"
                },
                minLength: { value: 10, message: "Must be 10 digits" },
                maxLength: { value: 10, message: "Must be 10 digits" }
            }
        },
    ]

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            let formData = new FormData();

            for (let i in data) {
                if (i === 'companyLogo') {
                    formData.append('image', data[i][0]);
                }
                else {
                    formData.append(i, data[i]);
                }
            }

            let res = await apiCall('POST', '/api/dealer/register', formData);

            if (res?.data?.success) {
                setLoading(false);
                toast.success(res?.data?.message);
                navigate('/login');
            }

        } catch (er) {
            toast.error(er?.response?.data?.message);
        }
        finally {
            setLoading(false);
        }

    };

    const accentColor = "#a20000";

    useEffect(() => {
        if (!logo) return;
        let img = logo[0];
        if (!img) return;
        let prv = URL.createObjectURL(img);
        setImagePrev(prv);


    }, [logo]);

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 font-sans">
            <div className="bg-white p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-full max-w-5xl shadow-gray-400 border border-gray-300">

                <header className="mb-10 text-center border-b border-gray-400 flex items-center flex-wrap justify-center sm:justify-between flex-row-reverse">
                    <div><img src="/logo.png" alt="Logo" className="w-40" /></div>
                    <div>
                        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                            Dealer <span style={{ color: accentColor }}>Registration</span>
                        </h2>
                        <div className="h-1 w-20 bg-[#a20000] mx-auto rounded-full"></div>
                        <p className="text-gray-500 mt-4 font-medium">Create your partner account to get started.</p>
                    </div>
                </header>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                        {inputFields?.map((field) => (
                            <div key={field.id} className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-600 ml-1">
                                    {field.label}
                                </label>
                                <div className="group flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl border border-gray-300 focus-within:border-[#a20000] focus-within:bg-white focus-within:ring-4 focus-within:ring-red-50 transition-all duration-200">
                                    <span className="text-gray-400 group-focus-within:text-[#a20000] transition-colors">
                                        {field.icon}
                                    </span>
                                    <input
                                        type={field.type || "text"}
                                        maxLength={field.maxLength}
                                        className="w-full bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none text-sm font-medium"
                                        placeholder={field.placeholder}
                                        {...register(field.id, field.validation)}
                                    />
                                </div>
                                {errors[field.id] && (
                                    <span className="text-[11px] font-semibold text-red-600 ml-1 uppercase">
                                        {errors[field.id].message}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>


                    {/* Bottom Section: Address and Logo */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4 border-t border-gray-300">

                        {/* Address Area */}
                        <div className="lg:col-span-2 space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-600 ml-1 flex items-center gap-2">
                                <FiMapPin style={{ color: accentColor }} /> Business Address
                            </label>
                            <textarea
                                className="w-full bg-gray-50 text-gray-800 resize-none placeholder-gray-400 p-4 rounded-xl border border-gray-300 focus:outline-none focus:border-[#a20000] focus:bg-white focus:ring-4 focus:ring-red-50 transition-all min-h-[120px]"
                                placeholder="Enter full street address, City, State, Zip..."
                                {...register("address", { required: "Address is required" })}
                            />
                            {errors.address && <p className="text-[11px] font-semibold text-red-600 ml-1 uppercase">{errors.address.message}</p>}
                        </div>

                        {/* Logo Upload Card */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-600 ml-1 text-center lg:text-left block">Company Logo</label>
                            <div className="relative group h-[120px] flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-xl hover:border-[#a20000] hover:bg-red-50/30 transition-all cursor-pointer overflow-hidden bg-gray-50">
                                <img src={imgPrev} alt="" className="w-20" />
                                <FiUploadCloud className="text-3xl text-gray-400 group-hover:text-[#a20000] mb-1 transition-transform group-hover:-translate-y-1" />
                                <span className="text-[11px] font-bold text-gray-500 uppercase">Upload Image</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    {...register("companyLogo", { required: "Logo is required" })}
                                />
                            </div>
                            {errors.companyLogo && <p className="text-[11px] font-semibold text-red-600 ml-1 uppercase text-center lg:text-left">{errors.companyLogo.message}</p>}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                        <button
                            title={loading ? 'Please wait' : ''}
                            type="submit"
                            disabled={loading === true}
                            className="group relative w-52 mx-auto overflow-hidden py-4 rounded-xl bg-[#a20000] text-white tracking-widest shadow-xl shadow-red-900/10 hover:bg-[#850000] active:scale-[0.98] transition-all flex items-center justify-center"
                        >
                            {loading ? <LoaderCircle className="animate-spin" /> :
                                <span className="relative z-10 uppercase">Register Account</span>
                            }
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}

export default Registration