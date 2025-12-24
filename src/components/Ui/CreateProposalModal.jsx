import { useForm } from 'react-hook-form';
import { X, Sun, User, Mail, Phone, MapPin, Zap, DollarSign, MessageCircle } from "lucide-react"
import { useAuth } from '../../Context/AuthContext';
import { apiCall } from '../../services/api';
import toast from 'react-hot-toast';

const CreateProposalModal = ({ setClose, proposalData }) => {

    const { user,token } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            customerName: "",
            email: "",
            phone: "",
            address: "",
            orderCapacity: "",
            rate: "",
        },
    })

    const handleCreateProposal = async (d) => {
        toast.dismiss();
        try {
            d.dealerId = user?.id;
            // console.log(d)
            let res = await apiCall('POST', '/api/dealer/create-propsal', d);
            // console.log(res);
            if (res?.data.success) {
                toast.success(res.data?.message)
                await proposalData();
                setClose(false)

            }

        } catch (er) {
            console.log(er);
            toast.error(er.response?.data?.message)
        }
    };

    return (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full min-h-[90vh] overflow-hidden">

                {/* Header */}
                <div className="bg-linear-to-r from-red-600 to-orange-600 p-4 text-white relative">
                    <button
                        onClick={() => setClose(false)}
                        className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="w-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                            <Sun className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">New Solar Proposal</h2>
                            <p className="text-red-100 text-sm mt-1">
                                Create a detailed proposal for your customer
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(handleCreateProposal)}>

                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-50px)]">

                        {/* Customer Information */}
                        <section className="mb-6">
                            <div className="flex items-center gap-2 mb-4">
                                <User className="w-5 h-5 text-red-600" />
                                <h3 className="text-lg font-semibold">Customer Information</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Name */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-2">
                                        Customer Name *
                                    </label>
                                    <input
                                        {...register("customerName", { required: "Customer name is required" })}
                                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500"
                                        placeholder="Enter customer full name"
                                    />
                                    {errors.customerName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.customerName.message}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email *</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^\S+@\S+$/i,
                                                    message: "Invalid email",
                                                },
                                            })}
                                            className="w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500"
                                            placeholder="customer@example.com"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone *</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            {...register("phone", { required: "Phone number is required" })}
                                            className="w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                    {errors.phone && (
                                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                                    )}
                                </div>

                                {/* Address */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-2">Address *</label>
                                    <textarea
                                        {...register("address", { required: "Address is required" })}
                                        rows={3}
                                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 resize-none"
                                        placeholder="Complete installation address"
                                    />
                                    {errors.address && (
                                        <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* System Details */}
                        <section className="mb-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Zap className="w-5 h-5 text-red-600" />
                                <h3 className="text-lg font-semibold">System Details</h3>
                            </div>

                            <input
                                {...register("orderCapacity", { required: "Capacity is required" })}
                                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500"
                                placeholder="Order Capacity (kW)"
                            />
                            {errors.rooftopCapacity && (
                                <p className="text-red-500 text-sm mt-1">{errors.rooftopCapacity.message}</p>
                            )}
                        </section>

                        {/* Pricing */}
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <DollarSign className="w-5 h-5 text-red-600" />
                                <h3 className="text-lg font-semibold">Pricing Information</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="number"
                                    {...register("rate", { required: "Rate is required" })}
                                    className="px-4 py-3 border rounded-xl"
                                    placeholder="Rate ₹"
                                />

                            </div>
                        </section>

                        {/* message */}
                        <section className="mb-6">
                            <div className="flex items-center gap-2 mb-4">
                                <MessageCircle className="w-5 h-5 text-red-600" />
                                <h3 className="text-lg font-semibold">Terms & Conditions / Message</h3>
                            </div>

                            <textarea
                                {...register("termsAndConditions")}
                                rows={4}
                                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 resize-none"
                                placeholder="Add any terms, conditions, or messages to include in the proposal PDF"
                            />
                        </section>

                        {/* Footer */}
                        <div className="  items-center justify-center bg-gray-50 flex gap-3 mt-5">
                            <button
                                type="button"
                                onClick={() => setClose(false)}
                                className="sm:flex-1 p-3 border rounded-xl text-sm cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className=" p-3 sm:flex-1 cursor-pointer bg-linear-to-r from-red-600 to-orange-600 text-white rounded-xl"
                            >
                                Create Proposal
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default CreateProposalModal