import { useFieldArray, useForm } from 'react-hook-form';
import { X, Sun, User, Mail, Phone, MapPin, Zap, DollarSign, MessageCircle } from "lucide-react"
import { useAuth } from '../../Context/AuthContext';
import { apiCall } from '../../services/api';
import toast from 'react-hot-toast';
import { useEffect, useRef, useState } from 'react';
import { BiRupee } from 'react-icons/bi';
import JoditEditor from 'jodit-react';

const CreateProposalModal = ({ setClose, proposalData, data, setData }) => {

    const { user, token } = useAuth();
    const joditConfig = {
        readonly: false,
        height: 400,
        resize: true,
        uploader: {
            insertImageAsBase64URI: true,
        },
        toolbarAdaptive: false,
        buttons: "bold,italic,underline,|,ul,ol,|,table,link,image,|,align,left,center,right,justify,|,brush,eraser,|,paragraph,fontsize,|,undo,redo",
        allowHTML: true,
        useClasses: true,
    }

    const [Body, setBody] = useState(`
       <h3><strong>Payment Terms</strong></h3>
            <ul>
            <li><strong>20% advance</strong> at the time of order confirmation.</li>
            <li><strong>75% payment</strong> upon delivery of material at site.</li>
            <li><strong>5% balance</strong> after completion of net metering.</li>
            <li>Net metering licensing and documentation will be handled by our team.</li>
            <li>Any applicable net metering charges will be charged separately.</li>
            </ul>

            <h3><strong>Mode of Payments</strong></h3>
            <p>
            Kindly transfer the advance amount through any of the following modes: <br>
            <strong>Bank Transfer:</strong> [Bank Account Number] <br>
            <strong>UPI:</strong> [UPI ID]
            </p>

            <br>

            <h3 style="background-color:#a20000; color:#fff; display:inline-block;">
            <strong>Terms and Conditions:</strong>
            </h3>

            <p><strong>A) Scope &amp; Design Basis:</strong></p>
            <p>
            The proposal is prepared based on a standard system/design configuration. Any changes or deviations in scope, layout, specifications, or quantities may result in additional costs.
            </p>

            <p><strong>B) Validity of Quotation:</strong></p>
            <p>
            This quotation is valid for <strong>7 days</strong> from the date of issue.
            </p>

            <p><strong>C) WARRANTY:</strong></p>
            <p>
            <strong>5 Year warranty</strong> on Solar System.
            </p>

            <p style="font-size: 14px; color: #555;">
            <em>
                The above warranties cover manufacturing defects, premature material degradation, and equipment failures.
            </em>
            </p>
`)


    const {
        register,
        handleSubmit,
        formState: { errors, dirtyFields },
        setValue,
        watch,
        getValues
    } = useForm({
        defaultValues: {
            customerName: "",
            email: "",
            phone: "",
            address: "",
            orderCapacity: "",
            rate: "",
            components: []
        },
    })


    let selectedMaterial = watch('components')

    const handleCreateProposal = async (d) => {
        toast.dismiss();
        // console.log(d);
        // edit
        if (data) {
            console.log(d);
            // console.log(selectedMaterial);

            // if (Object.keys(dirtyFields).length === 0) {
            //     toast.error('No field changes detected.');
            //     return;
            // }

            if (selectedMaterial.length < 5) {
                toast.error('Please Select At least 5 Components')
                return;
            }

            let formData = {};
            formData.propId = data?.proposalsData[0]?._id


            if (Object.keys(dirtyFields).length >= 1) {
                Object.keys(dirtyFields).forEach((k) => {
                    if (k === 'rate' || k === 'orderCapacity' || k === 'termsAndConditions') {
                        // if (k === 'rate' || k === 'orderCapacity') {
                        formData[k] = d?.[k]
                    }
                    else {
                        if (k === 'customerName') {
                            formData.name = d['customerName'];
                        }
                        else {
                            formData[k] = d[k];
                        }
                    }
                })
            }


            try {
                formData.termsAndConditions = Body;
                formData.components = d?.components

                let res = await apiCall('PATCH', '/api/dealer/edit-proposal', formData);
                if (res?.data?.success) {
                    toast.success(res?.data?.message);
                    setClose(false);
                    setTimeout(() =>
                        window.location.reload()
                        , 1000)
                }
            } catch (er) {
                toast.error(er?.response?.data?.message);
                console.log(er);
            }
        }
        // // create
        else {
            try {
                if (selectedMaterial.length < 5) {
                    toast.error('Please Select At least 5 Components')
                    return;
                }
                d.dealerId = user?.id;
                d.termsAndConditions = Body;
                let res = await apiCall('POST', '/api/dealer/create-propsal', d);
                if (res?.data.success) {
                    toast.success(res.data?.message)
                    await proposalData();
                    setClose(false)
                }

            } catch (er) {
                console.log(er);
                toast.error(er.response?.data?.message)
            }

        }
    };

    const handleSelect = (qty, item) => {
        let updated = [...selectedMaterial];

        if (qty === 0) {
            updated = updated.filter(v => v.name !== item);
        }
        else {
            let find = updated.findIndex(v => v.name === item);

            if (find === -1) {
                updated.push({ name: item, qty });
            }
            else {
                updated[find].qty = qty
            }

        }
        setValue('components', updated);


    }

    useEffect(() => {
        if (!data) return;
        setValue('customerName', data?.name);
        setValue('email', data?.email);
        setValue('phone', data?.phone);
        setValue('address', data?.address);
        setValue('orderCapacity', data?.proposalsData[0]?.orderCapacity / 1000);
        setValue('rate', data?.proposalsData[0]?.rate);

         setBody(data?.proposalsData[0]?.termsAndConditions);
        // setValue('termsAndConditions', data?.proposalsData[0]?.termsAndConditions);
        let names = data?.proposalsData[0]?.material.map(item => ({ name: item?.materialData?.name, qty: item?.quantity }));
        setValue('components', names);
    }, [data]);

    // console.log(data);
    // console.log(selectedMaterial);

    return (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full min-h-[90vh] overflow-hidden">

                {/* Header */}
                <div className="bg-[#d40202] p-4 text-white relative">
                    <button
                        onClick={() => {
                            setData(null)
                            setClose(false)
                        }
                        }
                        className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="w-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                            <Sun className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">New Solar Power Plant</h2>
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
                                <h3 className="text-lg font-semibold">Power Plant Capacity</h3>
                            </div>

                            <input
                                type='number'
                                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500"
                                placeholder="Order Capacity (kW)"
                                {...register("orderCapacity", { required: "orderCapacity is required" })}
                            />
                            {errors.rooftopCapacity && (
                                <p className="text-red-500 text-sm mt-1">{errors.rooftopCapacity.message}</p>
                            )}
                        </section>

                        {/* Pricing */}
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <BiRupee className="w-5 h-5 text-red-600" />
                                <h3 className="text-lg font-semibold">Rate/Watt</h3>
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
                        {data &&
                            <section className="mb-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <MessageCircle className="w-5 h-5 text-red-600" />
                                    <h3 className="text-lg font-semibold">Terms & Conditions / Message</h3>
                                </div>

                                {/* <textarea
                                    {...register("termsAndConditions")}
                                    rows={4}
                                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 resize-y min-h-60"
                                    placeholder="Add any terms, conditions, or messages to include in the proposal PDF"
                                /> */}
                                <JoditEditor
                                    config={joditConfig}
                                    value={Body}
                                    onBlur={(c)=>setBody(c)}
                                />
                            </section>
                        }
                        {/* Components Included */}
                        <section className="mb-6 mt-5">
                            <div className="flex items-center gap-2 mb-4">
                                <Zap className="w-5 h-5 text-red-600" />
                                <h3 className="text-lg font-semibold">Components Included</h3>
                            </div>

                            <div className='space-y-3'>
                                {[
                                    "Inverter",
                                    "ACDB",
                                    "DCDB",
                                    "Wiring Cables",
                                    "Lightning Arrester",
                                    "Earthing",
                                    "PVC Cable",
                                ].map((item) => {

                                    // let isSelected = selectedMaterial.find(v => v.name === item  {check:true,qty:v.qty}:{check:false,qty:0});
                                    let match = selectedMaterial.find(v => v.name === item);
                                    let isSelected = match ? { check: true, qty: match?.qty } : { check: false, qty: 0 }


                                    return (

                                        <div key={item} className='p-2 border rounded-2xl flex justify-between'>
                                            <label key={item} className="flex items-center gap-2 ">
                                                <input
                                                    onChange={(e) => {
                                                        if (!e.target.checked) {
                                                            handleSelect(0, item);
                                                        }
                                                        else {
                                                            handleSelect(1, item);
                                                        }
                                                    }}
                                                    type="checkbox"
                                                    checked={isSelected?.check}
                                                    value={item}
                                                    className="w-4 h-4"
                                                />
                                                {item}
                                            </label>

                                            {isSelected &&
                                                <input value={isSelected?.qty} onChange={(e) => handleSelect(Number(e.target.value), item)} type="number" placeholder='Quantity' className='border border-dotted w-48 p-1 rounded-sm mr-5' />
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                        </section>


                        {/* Footer */}
                        <div className="  items-center justify-center bg-gray-50 flex gap-3 mt-5">
                            <button
                                type="button"
                                onClick={() => {
                                    setData(null)
                                    setClose(false)
                                }}
                                className="sm:flex-1 p-3 border rounded-xl text-sm cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className=" p-3 sm:flex-1 cursor-pointer bg-linear-to-r from-red-600 to-red-600 text-white rounded-xl"
                            >
                                {data ? 'Update Proposal' : 'Create Proposal'}

                            </button>
                        </div>
                    </div>

                </form>

            </div>
        </div>

    )
}

export default CreateProposalModal