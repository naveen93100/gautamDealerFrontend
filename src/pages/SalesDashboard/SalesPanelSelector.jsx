// import { IndianRupee } from "lucide-react";
// import React, { useEffect } from "react";
// import toast from "react-hot-toast";

// const SalesPanelSelector = ({
//     selectPanel,
//     setSelectPanel,
//     panelData,
//     technologyData,
//     constructiveData,
//     panelWatt,
//     setActiveIndex,
//     gst,
// }) => {
//     return (
//         <section className="mb-6">
//             <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center gap-2">
//                     <i className="fa-solid fa-solar-panel text-red-600"></i>
//                     <h3 className="text-lg font-semibold">Panel Information</h3>
//                 </div>

//                 <div

//                     className="flex items-center gap-2 border border-blue-500 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition"
//                 >
//                     <i className="fa-solid fa-plus text-sm"></i>
//                     <span className="text-sm font-medium">Add More Panel</span>
//                 </div>
//             </div>

//         </section>
//     );
// };



import { IndianRupee } from "lucide-react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const SalesPanelSelector = ({
    selectPanel,
    setSelectPanel,
    panelData,
    technologyData,
    constructiveData,
    panelWatt,
    setActiveIndex,
    gst,
}) => {
    const addPanel = () => {
        setSelectPanel((prev) => [
            ...prev,
            {
                panelId: "",
                technologyId: "",
                constructiveId: "",
                wattId: "",
                quantity: 1,
                rate: 1,
                totalPrice: 0,
                gstAmount: 0,
                wattPerPrice: 0,
            },
        ]);

        setActiveIndex(selectPanel.length);
    };

    const handleChange = (index, key, value) => {
        setActiveIndex(index);

        setSelectPanel((prev) => {
            const copy = [...prev];

            const updatedValue =
                key === "quantity" || key === "rate" ? Number(value) : value;

            copy[index] = {
                ...copy[index],
                [key]: updatedValue,
            };

            const selectedWattId = copy[index].wattId;

            const pWatt = panelWatt?.find(i => i._id === selectedWattId);

            const quantity = Number(copy[index].quantity || 0);
            const rate = Number(copy[index].rate || 0);

            const watt = Number(pWatt?.watt);
            const amount = watt * quantity * rate;
            const gstAmount = (amount * gst) / 100;

            copy[index].totalPrice = amount;
            copy[index].gstAmount = gstAmount;

            return copy;
        });
    };


    
    useEffect(() => {
        if (!gst) return

        setSelectPanel((prev) =>
            prev.map((item) => {
                const amount = Number(item.totalPrice || 0);
                const gstAmount = (amount * gst) / 100;

                return {
                    ...item,
                    gstAmount,
                };
            })
        );
    }, [gst]);

    const handleRemove = (e, index) => {
        e.preventDefault();
        setSelectPanel((prev) => prev.filter((_, i) => i !== index));
    };


    return (
        <section className="mb-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <i className="fa-solid fa-solar-panel text-red-600"></i>
                    <h3 className="text-lg font-semibold">Panel Information</h3>
                </div>

                <div
                    onClick={addPanel}
                    className="flex items-center gap-2 border border-blue-500 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition"
                >
                    <i className="fa-solid fa-plus text-sm"></i>
                    <span className="text-sm font-medium">Add More Panel</span>
                </div>
            </div>

            {selectPanel.map((panel, index) => (
                <React.Fragment key={index}>
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="ml-2 text-base font-semibold text-red-600">
                            Panel {index + 1}
                        </h4>
                        <h4 className="mr-5 text-base font-semibold text-red-600">
                            {index >= 1 && (
                                <i
                                    onClick={(e) => handleRemove(e, index)}
                                    className="fa-solid fa-trash-can"
                                ></i>
                            )}
                        </h4>
                    </div>

                    <section
                        key={index}
                        className="border  rounded-2xl p-4  mb-4"
                    >
                        <label className="text-sm font-medium text-gray-600">
                            Select Panel
                        </label>
                        <select
                            value={panel.panelId}
                            required
                            onChange={(e) =>
                                handleChange(index, "panelId", e.target.value)
                            }
                            className="w-full px-4 py-2 border rounded-lg"
                        >
                            <option value="">Select Panel</option>
                            {panelData?.map((panel) => (
                                <option key={panel._id} value={panel._id}>
                                    {panel.panelType}
                                </option>
                            ))}
                        </select>

                        {panel?.panelId && (
                            <>
                                <label className="text-sm font-medium text-gray-600 mt-4 block">
                                    Select Technology
                                </label>

                                <select
                                    required
                                    value={panel.technologyId}
                                    onChange={(e) =>
                                        handleChange(
                                            index,
                                            "technologyId",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-4 py-2 border rounded-lg"
                                >
                                    <option value="">Select Technology</option>

                                    {technologyData?.map((tech) => (
                                        <option key={tech._id} value={tech._id}>
                                            {tech.technologyPanel}
                                        </option>
                                    ))}
                                </select>
                            </>
                        )}

                        {panel?.technologyId && (
                            <>
                                <label className="text-sm font-medium text-gray-600 mt-4 block">
                                    Select Constructive
                                </label>

                                <select
                                    key={index}
                                    required
                                    value={panel.constructiveId}
                                    onChange={(e) =>
                                        handleChange(
                                            index,
                                            "constructiveId",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-4 py-2 border rounded-lg"
                                >
                                    <option value="">
                                        Select Constructive
                                    </option>

                                    {constructiveData?.map((cons) => (
                                        <option key={cons._id} value={cons._id}>
                                            {cons.constructiveType}
                                        </option>
                                    ))}
                                </select>
                            </>
                        )}

                        {panel?.constructiveId && (
                            <>
                                <label className="text-sm font-medium text-gray-600 mt-4 block">
                                    Select Watt
                                </label>

                                <select
                                    key={index}
                                    required
                                    value={panel.wattId}
                                    onChange={(e) =>
                                        handleChange(
                                            index,
                                            "wattId",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-4 py-2 border rounded-lg"
                                >
                                    <option value="">Select Watt</option>

                                    {panelWatt?.map((w) => (
                                        <option key={w._id} value={w._id}>
                                            {w.watt} Watt
                                        </option>
                                    ))}
                                </select>
                            </>
                        )}

                        {panel?.wattId && (
                            <>
                                <label className="text-sm font-medium text-gray-600 mt-4 block">
                                    Quantity
                                </label>
                                <input
                                    key={index}
                                    type="number"
                                    min={1}
                                    required
                                    value={panel.quantity}
                                    onChange={(e) =>
                                        handleChange(
                                            index,
                                            "quantity",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full pl-5 pr-4 py-3 border rounded-xl "
                                />
                                {/* price */}
                                <div>
                                    <label className="block text-sm  mt-4 font-medium mb-2">
                                        {" "}
                                        Rate/Watt{" "}
                                        <i className="fa-solid fa-rupee-sign text-red-600"></i>{" "}
                                    </label>
                                    <div className="relative">
                                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            key={index}
                                            type="number"
                                            name="rate"
                                            value={panel.rate}
                                            onChange={(e) =>
                                                handleChange(
                                                    index,
                                                    "rate",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2"
                                            placeholder="Enter Panel Price"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Price Panel
                                        </label>
                                        <input
                                            key={index}
                                            name="totalPrice"
                                            value={panel?.totalPrice}
                                            onChange={(e) =>
                                                handleChange(
                                                    index,
                                                    "totalPrice",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-4 py-3 border rounded-xl  cursor-not-allowed"
                                            placeholder="2,40,000"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Gst Amount
                                        </label>
                                        <input

                                            key={index}
                                            name="gstAmount"
                                            value={panel?.gstAmount}
                                            onChange={(e) =>
                                                handleChange(
                                                    index,
                                                    "gstAmount",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-4 py-3 border rounded-xl  cursor-not-allowed"
                                            placeholder="2,40,000"
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </section>
                </React.Fragment>
            ))}
        </section>
    );
};

export default SalesPanelSelector;
