import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { User, FileText, X, Mail, Building, Phone, MapPin, Upload } from 'lucide-react';
import { useAuth } from '../../Context/AuthContext';
import toast from 'react-hot-toast';
import { apiCall } from '../../services/api';

const Profile = () => {

    const { user, setUser } = useAuth();
    const [loading, setLoadig] = useState(false);
    const [showEditProfileModal, setEditProfileModal] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors, dirtyFields },
        watch,
        reset,
        setValue,
    } = useForm();

    const logo = watch('image');

    const handleEditProfile = async (data) => {
        toast.dismiss();
        let changedField = Object.keys(dirtyFields)
        if (changedField.length === 0) {
            toast.error('No Field changes')
            return
        };

        let formData = new FormData();

        for (let i of changedField) {
            if (i === 'image') {
                formData.append(i, data[i][0])
            }
            else {
                formData.append(i, data[i])
            }
        }

        try {
            setLoadig(true);
            let res = await apiCall('PATCH', `/api/dealer/${data?.id}`, formData);

            if (res?.data?.success) {
                setLoadig(false);
                toast.success(res?.data?.message);
                localStorage.setItem('userData', JSON.stringify(res?.data?.data));
                setUser(res?.data?.data);
                setEditProfileModal(false);
            }


        } catch (er) {
            console.log(er);
        }
        finally {
            setLoadig(false);
        }

    }

    const handleReset = () => {
        reset();
        setEditProfileModal(false)
    }

    useEffect(() => {
        if (!logo || logo.length === 0) return;
        let imgUrl = URL.createObjectURL(logo[0]);
        setImagePreview(imgUrl);

    }, [logo]);

    useEffect(() => {
        setValue('id', user?.id);
        setValue('firstName', user?.firstName)
        setValue('lastName', user?.lastName)
        setValue('email', user?.email)
        setValue('gstin', user?.gstin)
        setValue('address', user?.address)
        setValue('contactNumber', user?.contactNumber)
        setValue('companyName', user?.companyName)
        setImagePreview(user?.profileImg)
    }, [showEditProfileModal]);

    return (
        <>
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 mb-6 8 border border-gray-300 shadow-gray-400">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 w-full sm:w-auto">
                        {/* <div className="w-20 h-24 sm:w-28 rounded-2xl bg-linear-to-br from-white to-gray-500   flex items-center justify-center overflow-hidden shrink-0">
                            <img src={user?.profileImg} alt="Logo" className=' w-full object-contain' />
                        </div> */}
                        <div className="w-20 h-24 sm:w-28 sm:h-32 rounded-2xl bg-linear-to-br from-white to-gray-200  flex items-center justify-center overflow-hidden shrink-0">
                            <img
                                src={user?.profileImg}
                                alt="Logo"
                                className="w-full h-full object-contain p-2"
                            />
                        </div>

                        <div className="text-center sm:text-left">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 capitalize">{user?.name}</h2>
                            <p className="text-base sm:text-lg text-red-600 font-semibold mb-2 capitalize">{user?.companyName}</p>
                            <div className="flex flex-col sm:flex-row sm:gap-4 text-sm text-gray-600 gap-1">
                                <span className="break-all">{user?.email}</span>
                                <span className="hidden sm:inline">•</span>
                                <span>{user?.contactNumber}</span>
                                <span className="hidden sm:inline">•</span>
                                <span className='capitalize'>{user?.address}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setEditProfileModal(true)} className="px-4 py-2 text-sm text-red-600 border border-red-600 hover:bg-red-50 rounded-lg transition-colors w-full sm:w-auto">
                        Edit Profile
                    </button>
                </div>
            </div>

            {showEditProfileModal && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-800">Edit Profile</h2>
                            <button
                                onClick={handleReset}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(handleEditProfile)} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* First Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        FIRST NAME
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            {...register('firstName', { required: 'First name is required' })}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            placeholder="John"
                                        />
                                    </div>
                                    {errors.firstName && (
                                        <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                                    )}
                                </div>

                                {/* Last Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        LAST NAME
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            {...register('lastName', { required: 'Last name is required' })}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            placeholder="Doe"
                                        />
                                    </div>
                                    {errors.lastName && (
                                        <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        EMAIL ADDRESS
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="email"
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: 'Invalid email address'
                                                }
                                            })}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                    )}
                                </div>

                                {/* GSTIN */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        GSTIN
                                    </label>
                                    <div className="relative">
                                        <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            {...register('gstin', {
                                                required: 'GSTIN is required',
                                                pattern: {
                                                    value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                                                    message: 'Invalid GSTIN format'
                                                }
                                            })}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            placeholder="22AAAAA0000A1Z5"
                                        />
                                    </div>
                                    {errors.gstin && (
                                        <p className="mt-1 text-sm text-red-600">{errors.gstin.message}</p>
                                    )}
                                </div>

                                {/* Company Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        COMPANY NAME
                                    </label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            {...register('companyName', { required: 'Company name is required' })}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            placeholder="Global Traders Inc."
                                        />
                                    </div>
                                    {errors.companyName && (
                                        <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
                                    )}
                                </div>

                                {/* Contact Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        CONTACT NUMBER
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="tel"
                                            {...register('contactNumber', {
                                                required: 'Contact number is required',
                                                pattern: {
                                                    value: /^[0-9]{10}$/,
                                                    message: 'Please enter a valid 10-digit number'
                                                }
                                            })}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            placeholder="9876543210"
                                        />
                                    </div>
                                    {errors.contactNumber && (
                                        <p className="mt-1 text-sm text-red-600">{errors.contactNumber.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Business Address - Full Width */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <MapPin className="inline mr-2" size={18} />
                                    BUSINESS ADDRESS
                                </label>
                                <textarea
                                    {...register('address', { required: 'Business address is required' })}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                                    placeholder="Enter full street address, City, State, Zip..."
                                />
                                {errors.address && (
                                    <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                                )}
                            </div>

                            {/* Company Logo Upload */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    COMPANY LOGO
                                </label>
                                <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">

                                    <>
                                        <label className="cursor-pointer flex flex-col items-center">
                                            {imagePreview &&
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="w-20 object-cover rounded-lg mb-4"
                                                />
                                            }
                                            <Upload className="text-gray-400 mb-2" size={48} />
                                            <span className="text-sm text-gray-600 font-medium">UPLOAD IMAGE</span>
                                            <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 1MB</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                {...register('image')}
                                            />
                                        </label>
                                        {errors.image &&
                                            <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
                                        }
                                    </>

                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-4 mt-8">
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="px-6 py-3 border border-gray-400 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-600 text-white cursor-pointer rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default Profile