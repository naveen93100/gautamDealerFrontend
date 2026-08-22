import { useFieldArray, useForm } from "react-hook-form";
import {
    X,
    Sun,
    User,
    Mail,
    Phone,
    MapPin,
    Zap,
    DollarSign,
    MessageCircle,
} from "lucide-react";
import { useAuth } from "../../Context/AuthContext";
import { apiCall } from "../../services/api";
import toast from "react-hot-toast";
import { useEffect, useMemo, useRef, useState } from "react";
import { BiRupee } from "react-icons/bi";
import JoditEditor from "jodit-react";
import { useRefetchProposal } from "../../hooks/useDealerProposalMethods";

const CreateProposalModal = ({ setClose, proposalData, data, setData, customerId }) => {
    const [loading, setLoading] = useState(false);


    const { user, token } = useAuth();
    const joditConfig = useMemo(() => ({
        readonly: false,
        height: 400,
        resize: true,
        uploader: {
            insertImageAsBase64URI: true,
        },
        toolbarAdaptive: false,
        buttons:
            "bold,italic,underline,|,ul,ol,|,table,link,image,|,align,left,center,right,justify,|,brush,eraser,|,paragraph,fontsize,|,undo,redo",
        allowHTML: true,
        useClasses: true,
    }), []);

    const MATERIALS = [
        "Inverter",
        "ACDB",
        "DCDB",
        "Wiring Cables",
        "Lightning Arrester",
        "Earthing",
        "PVC Cable",
    ];

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
    `);

    const {refetchProposal}=useRefetchProposal()

    const {
        register,
        handleSubmit,
        formState: { errors, dirtyFields },
        setValue,
        watch,
        getValues,
    } = useForm({
        defaultValues: {
            orderCapacity: "",
            rate: "",
            components: [],
            tax: 8.9,
        },
    });

    let selectedMaterial = watch("components");

    const handleCreateProposal = async (d) => {
        toast.dismiss();
        // edit
        if (data) {
            if (selectedMaterial.length < 5) {
                toast.error("Please Select At least 5 Components");
                return;
            }

            let formData = {};

            formData.rate = d?.rate,
                formData.orderCapacity = d?.orderCapacity,
                formData.tax = d?.tax,
                formData.propId = data?._id;


            try {
                setLoading(true);
                formData.termsAndConditions = Body;
                formData.components = d?.components;

                let res = await apiCall(
                    "PATCH",
                    "/api/dealer/edit-powerplant-proposal",
                    formData,
                );
                if (res?.data?.success) {
                    toast.success(res?.data?.message);
                    setClose(false);
                }
            } catch (er) {
                toast.error(er?.response?.data?.message);
                console.log(er);
            } finally {
                setLoading(false);
            }
        }
        // // create
        else {
            try {
                setLoading(true);
                if (selectedMaterial.length < 5) {
                    toast.error("Please Select At least 5 Components");
                    return;
                }
                d.dealerId = user?.id;
                d.termsAndConditions = Body;
                d.customerId = customerId

                let res = await apiCall(
                    "POST",
                    "/api/dealer/create-powerPlant-proposal",
                    d,
                );
                if (res?.data.success) {
                    toast.success(res.data?.message);
                    refetchProposal(user?.id,customerId)
                    setClose(false);
                }
            } catch (er) {
                console.log(er);
                toast.error(er.response?.data?.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSelect = (qty, item) => {
        let updated = [...selectedMaterial];

        if (qty === 0) {
            updated = updated.filter((v) => v.name !== item);
        } else {
            let find = updated.findIndex((v) => v.name === item);

            if (find === -1) {
                updated.push({ name: item, qty });
            } else {
                updated[find].qty = qty;
            }
        }
        setValue("components", updated);
    };

    useEffect(() => {
        const defaultMaterials = MATERIALS.map((item) => ({
            name: item,
            qty: 1,
        }));

        setValue("components", defaultMaterials);
    }, []);

    const defaultMaterials = MATERIALS.map((item) => ({
        name: item,
        qty: 1,
    }));

    useEffect(() => {
        if (!data) return;
        setValue(
            "orderCapacity", data?.orderCapacity / 1000 || 0,
        );
        setValue(
            "rate",
            data?.rate || 0,
        );
        setValue(
            "tax",
            data?.tax || 8.9,
        );

        setValue(
            "termsAndConditions",

            data?.termsAndConditions
            || "",
        );

        setBody(data?.termsAndConditions);
        let names = data?.material.map((item) => ({
            name: item?.materialData?.name,
            qty: item?.quantity,
        }))
            || defaultMaterials;

        setValue("components", names);
    }, [data]);

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full min-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-[#d40202] p-4 text-white relative">
                    <button
                        onClick={() => {
                            setData(null);
                            setClose(false);
                        }}
                        className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="w-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                            <Sun className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">
                                New Solar Power Plant
                            </h2>
                            <p className="text-red-100 text-sm mt-1">
                                Create a detailed proposal for your customer
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(handleCreateProposal)}>
                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-50px)]">

                        {/* System Details */}
                        <section className="mb-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Zap className="w-5 h-5 text-red-600" />
                                <h3 className="text-lg font-semibold">
                                    Power Plant Capacity (kW)
                                </h3>
                            </div>

                            <input
                                type="number"
                                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500"
                                placeholder="Order Capacity (kW)"
                                {...register("orderCapacity", {
                                    required: "orderCapacity is required",
                                })}
                                min={0}
                            />
                            {errors.rooftopCapacity && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.rooftopCapacity.message}
                                </p>
                            )}
                        </section>

                        {/* Pricing */}
                        <section className="max-w-5xl mx-auto border rounded-2xl p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left */}
                                <div className="w-full">
                                    <div className="flex items-center gap-2 mb-3">
                                        <BiRupee className="w-5 h-5 text-red-600" />
                                        <h3 className="text-lg font-semibold">
                                            Rate / Watt (Rs)
                                        </h3>
                                    </div>

                                    <input
                                        type="number"
                                        {...register("rate", {
                                            required: "Rate is required",
                                        })}
                                        className="w-full px-4 py-3 border rounded-xl"
                                        placeholder="Rate ₹"
                                        min={0}
                                        step='any'
                                    />
                                </div>

                                {/* Right */}
                                <div className="w-full">
                                    <div className="flex items-center gap-2 mb-3">
                                        <BiRupee className="w-5 h-5 text-red-600" />
                                        <h3 className="text-lg font-semibold">
                                            GST (%)
                                        </h3>
                                    </div>

                                    <input
                                        type="text"
                                        {...register("tax")}
                                        className="w-full px-4 py-3 border rounded-xl"
                                        placeholder="Rate ₹"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* message */}
                        {/* {data && */}

                        <section className="mb-6">
                            <div className="flex items-center gap-2 mb-4">
                                <MessageCircle className="w-5 h-5 text-red-600" />
                                <h3 className="text-lg font-semibold">
                                    Terms & Conditions / Message
                                </h3>
                            </div>

                            <JoditEditor
                                config={joditConfig}
                                value={Body}
                                onBlur={(c) => setBody(c)}
                            />
                        </section>
                        {/*  } */}
                        {/* Components Included */}
                        <section className="mb-6 mt-5">
                            <div className="flex items-center justify-between  gap-2 mb-4">
                                <div className="flex items-center">
                                    <Zap className="w-5 h-5 text-red-600" />
                                    <h3 className="text-lg font-semibold">
                                        Components Included
                                    </h3>
                                </div>
                                <h3 className="text-lg font-semibold">
                                    Quantity/Units
                                </h3>
                            </div>

                            <div className="space-y-3">
                                {MATERIALS.map((item) => {
                                    let match =
                                        selectedMaterial.length > 0 &&
                                        selectedMaterial?.find(
                                            (v) => v.name === item,
                                        );
                                    let isSelected = match
                                        ? { check: true, qty: match?.qty }
                                        : { check: false, qty: 0 };

                                    return (
                                        <div
                                            key={item}
                                            className="p-2 border rounded-2xl flex justify-between"
                                        >
                                            <label
                                                key={item}
                                                className="flex items-center gap-2 "
                                            >
                                                <input
                                                    onChange={(e) => {
                                                        if (!e.target.checked) {
                                                            handleSelect(
                                                                0,
                                                                item,
                                                            );
                                                        } else {
                                                            handleSelect(
                                                                1,
                                                                item,
                                                            );
                                                        }
                                                    }}
                                                    type="checkbox"
                                                    checked={isSelected?.check}
                                                    value={item}
                                                    className="w-4 h-4"
                                                />
                                                {item}
                                            </label>

                                            {isSelected && (
                                                <>
                                                    <input
                                                        value={isSelected?.qty}
                                                        onChange={(e) =>
                                                            handleSelect(
                                                                Number(
                                                                    e.target
                                                                        .value,
                                                                ),
                                                                item,
                                                            )
                                                        }
                                                        type="number"
                                                        placeholder="Quantity"
                                                        className="border border-dotted w-48 p-1 rounded-sm mr-5"
                                                    />
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Footer */}
                        <div className="items-center justify-center bg-gray-50 flex gap-3 mt-5">
                            <button
                                type="button"
                                onClick={() => {
                                    setData(null);
                                    setClose(false);
                                }}
                                className="sm:flex-1 p-3 border rounded-xl text-sm cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className={` p-3 sm:flex-1 bg-linear-to-r from-red-600 to-red-600 text-white rounded-xl ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                            >
                                {data
                                    ? "Update Proposal"
                                    : "Create Proposal"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProposalModal;
