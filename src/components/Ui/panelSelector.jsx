import React from "react";

const PanelSelector = ({
    selectPanel,
    setSelectPanel,
    panelData,
    technologyData,
    constructiveData,
    panelWatt,
    setActiveIndex,
}) => {

    const panel = selectPanel;

    const addPanel = () => {
        setSelectPanel(prev => [
            ...prev,
            {
                panelId: "",
                technologyId: "",
                constructiveId: "",
                wattId: "",
                quantity: 1
            }
        ]);

        setActiveIndex(selectPanel.length);
    };

    const handleChange = (index, key, value) => {
        setActiveIndex(index);

        setSelectPanel(prev => {
            const copy = [...prev];
            copy[index] = { ...copy[index], [key]: value };
            return copy;
        });
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
                <>
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="ml-2 text-base font-semibold text-red-600">
                            Panel {index + 1}
                        </h4>
                    </div>


                    <section key={index} className="border  rounded-2xl p-4  mb-4">

                        <label className="text-sm font-medium text-gray-600">Select Panel</label>
                        <select
                            value={panel.panelId}
                            required
                            onChange={e => handleChange(index, "panelId", e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                        >
                            <option value="">Select Panel</option>
                            {panelData?.map(panel => (
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
                                    onChange={e => handleChange(index, "technologyId", e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg"
                                >
                                    <option value="">Select Technology</option>

                                    {technologyData?.map(tech => (
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
                                    required
                                    value={panel.constructiveId}
                                    onChange={e => handleChange(index, "constructiveId", e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg"
                                >
                                    <option value="">Select Constructive</option>

                                    {constructiveData?.map(cons => (
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
                                    required
                                    value={panel.wattId}
                                    onChange={e => handleChange(index, "wattId", e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg"
                                >
                                    <option value="">Select Watt</option>

                                    {panelWatt?.map(w => (
                                        <option key={w._id} value={w._id}>
                                            {w.watt} Watt
                                        </option>
                                    ))}
                                </select>
                            </>
                        )}

                        {
                            panel?.wattId && (
                                <>
                                    <label className="text-sm font-medium text-gray-600 mt-4 block">
                                        Quantity
                                    </label>
                                    <input type="number"
                                        min={1}
                                        required
                                        value={panel.quantity}
                                        onChange={e => handleChange(index, "quantity", e.target.value)}
                                        className="w-full pl-5 pr-4 py-3 border rounded-xl " />
                                </>
                            )
                        }
                    </section>

                </>
            ))}

        </section>
    );
};

export default PanelSelector;
