import { IndianRupee } from "lucide-react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const GaloSalesPanelSelector = ({
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
                //add the setup kw here
                setupKw: 0,
                subsidyAmount: 0,
            },
        ]);
        setActiveIndex(selectPanel.length);
    };

    const handleChange = (index, key, value) => {
        setActiveIndex(index);

        setSelectPanel((prev) => {
            const copy = [...prev];
            const updatedValue =
                key === "quantity" || key === "rate" || key === "gstAmount"
                    ? Number(value)
                    : value;

            copy[index] = {
                ...copy[index],
                [key]: updatedValue,
            };

            // this this new to add the setup kw to the calculation of total price and gst amount
            const setupKw = String(copy[index].setupKw || 0);

            const selectedWattId = copy[index].wattId || null;
            const pWatt = panelWatt?.find((i) => i._id === selectedWattId);
            const quantity = Number(copy[index].quantity || 0);
            const rate = Number(copy[index].rate || 0);

            if (selectedWattId) {
                const watt = Number(pWatt?.watt);
                const amount = watt * quantity * rate;
                // const amount = (watt + setupKw) * quantity * rate;

                const gstAmount = (amount * gst) / 100;
                copy[index].totalPrice = amount;
                copy[index].gstAmount = gstAmount;
            }

            return copy;
        });
    };

    useEffect(() => {
        if (!gst) return;
        setSelectPanel((prev) =>
            prev.map((item) => {
                const amount = Number(item.totalPrice || 0);
                const gstAmount = (amount * gst) / 100;
                return { ...item, gstAmount };
            }),
        );
    }, [gst, setSelectPanel]);

    const handleRemove = (e, index) => {
        e.preventDefault();
        setSelectPanel((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <section className="mb-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <i className="fa-solid fa-solar-panel text-black"></i>
                    <h3 className="text-lg font-semibold text-black">
                        Panel Information
                    </h3>
                </div>

                <div
                    onClick={addPanel}
                    className="flex items-center gap-2 border-2 border-yellow-400 text-black hover:bg-yellow-50 px-4 py-2 rounded-xl transition cursor-pointer"
                >
                    <i className="fa-solid fa-plus text-sm"></i>
                    <span className="text-sm font-medium">Add More Panel</span>
                </div>
            </div>

            {selectPanel.map((panel, index) => (
                <React.Fragment key={index}>
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="ml-2 text-base font-semibold text-black">
                            Panel {index + 1}
                        </h4>
                        <h4 className="mr-5 text-base font-semibold text-black">
                            {index >= 1 && (
                                <i
                                    onClick={(e) => handleRemove(e, index)}
                                    className="fa-solid fa-trash-can text-yellow-600 hover:text-black cursor-pointer transition"
                                ></i>
                            )}
                        </h4>
                    </div>

                    <section className="border-2 border-yellow-300 rounded-2xl p-4 mb-4 bg-white shadow-sm">
                        <div>
                            <label className="text-sm font-medium text-black mt-4 block">
                                Add Setup (Kw)
                            </label>
                            <input
                                key={index}
                                type="string"
                                min={1}
                                required
                                value={panel.setupKw}
                                onChange={(e) =>
                                    handleChange(
                                        index,
                                        "setupKw",
                                        e.target.value,
                                    )
                                }
                                className="w-full px-4 py-3 border border-yellow-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none bg-white"
                            />
                        </div>

                        <label className="text-sm font-medium text-black">
                            Select Panel
                        </label>
                        <select
                            value={panel.panelId}
                            required
                            onChange={(e) =>
                                handleChange(index, "panelId", e.target.value)
                            }
                            className="w-full px-4 py-2 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none bg-white mt-1"
                        >
                            <option value="">Select Panel</option>
                            {panelData?.map((p) => (
                                <option key={p._id} value={p._id}>
                                    {p.panelType}
                                </option>
                            ))}
                        </select>

                        {panel?.panelId && (
                            <>
                                <label className="text-sm font-medium text-black mt-4 block">
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
                                    className="w-full px-4 py-2 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none bg-white mt-1"
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
                                <label className="text-sm font-medium text-black mt-4 block">
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
                                    className="w-full px-4 py-2 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none bg-white mt-1"
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
                                <label className="text-sm font-medium text-black mt-4 block">
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
                                    className="w-full px-4 py-2 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none bg-white mt-1"
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
                                <label className="text-sm font-medium text-black mt-4 block">
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
                                    className="w-full px-4 py-3 border border-yellow-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none bg-white"
                                />
                                {/* adding subcidy  */}

                                <label className="text-sm font-medium text-black mt-4 block">
                                    Subsidy Amount
                                </label>
                                <input
                                    key={index}
                                    type="number"
                                    min={1}
                                    required
                                    value={panel.subsidyAmount}
                                    onChange={(e) =>
                                        handleChange(
                                            index,
                                            "subsidyAmount",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-4 py-3 border border-yellow-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none bg-white"
                                />

                                <div>
                                    <label className="block text-sm mt-4 font-medium text-black">
                                        Rate/Watt{" "}
                                        <i className="fa-solid fa-rupee-sign text-yellow-600"></i>
                                    </label>
                                    <div className="relative">
                                        <input
                                            key={index}
                                            type="number"
                                            name="rate"
                                            value={panel.rate}
                                            min={1}
                                            onChange={(e) =>
                                                handleChange(
                                                    index,
                                                    "rate",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-4 py-3 border border-yellow-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none bg-white"
                                            placeholder="Enter Panel Price"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <label className="block text-sm font-medium text-black mb-2">
                                            Price Panel
                                        </label>
                                        <input
                                            key={index}
                                            name="totalPrice"
                                            value={panel?.totalPrice}
                                            readOnly
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 cursor-not-allowed"
                                            placeholder="0"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-black mb-2">
                                            GST Amount
                                        </label>
                                        <input
                                            key={index}
                                            name="gstAmount"
                                            value={panel?.gstAmount}
                                            readOnly
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 cursor-not-allowed"
                                            placeholder="0"
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

export default GaloSalesPanelSelector;
