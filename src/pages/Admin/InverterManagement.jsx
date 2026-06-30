import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { apiCall } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

const InverterManagement = () => {
    const [phaseName, setPhaseName] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [phases, setPhases] = useState([]);
    const navigate = useNavigate();
    const [showKilowattModal, setShowKilowattModal] = useState(false);
    const [selectedPhase, setSelectedPhase] = useState(null);
    const [kw, setkw] = useState("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    console.log("showing the all data", phases);

    const handleAddKilowatt = (item) => {
        setSelectedPhase(item);
        setShowKilowattModal(true);
    };

    const fetchInverterPhase = async () => {
        try {
            let res = await apiCall("GET", "adminPanel/get-inverter");
            if (res?.data?.success) {
                setPhases(res?.data?.inverter);
            }
        } catch (er) {
            console.log(er);
        }
    };

    const handleApiAddkilowat = async () => {
        try {
            const body = { capacity: Number(kw) };
            const res = await apiCall(
                "POST",
                `/adminPanel/add-kw/${selectedPhase._id}`,
                body,
            );
            if (res?.data?.success) {
                toast.success("Kilowatt added successfully");
                setShowKilowattModal(false);
                setkw("");
                fetchInverterPhase();
            }
        } catch (err) {
            toast.error("Something went wrong");
        }
    };

    const handleSubmit = async () => {
        try {
            if (!phaseName.trim()) {
                toast.dismiss();
                toast.error("Phase is required");
                return;
            }
            let res = await apiCall("POST", "/adminPanel/add-inverter", {
                phase: phaseName,
            });
            if (res?.data?.success) {
                setPhases((prev) => [...prev, res?.data?.inverter]);
            }
            setPhaseName("");
            setIsModalOpen(false);
        } catch (er) {
            console.log(er);
        }
    };

    const toggleStatus = async (phase) => {
        try {
            const res = await apiCall(
                "PATCH",
                `/adminPanel/inverter-status-change/${phase._id}`,
                {
                    status: phase.status === "active" ? "inactive" : "active",
                },
            );
            console.log(res.data);

            if (res?.data?.success) {
                toast.success(
                    phase.status === "active"
                        ? "Phase Deactivated Successfully"
                        : "Phase Activated Successfully",
                );
                fetchInverterPhase();
            }
        } catch (err) {
            console.log(err?.response?.data);
            toast.error("Something went wrong");
        }
    };

    const handleDelete = async (phase, it) => {
        try {
            const res = await apiCall(
                "DELETE",
                `/adminPanel/remove-inverter-kw/${phase._id}`,
                { kw: it },
            );

            if (res?.data?.message === "Kw Removed.") {
                toast.success("kW removed successfully");
                fetchInverterPhase();
            }
        } catch (err) {
            console.log(err.response?.data);
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    };

    useEffect(() => {
        fetchInverterPhase();
    }, []);

    const handleEdit = async () => {
        try {
            if (!phaseName.trim()) {
                toast.error("Phase name is required");
                return;
            }
            console.log(selectedPhase);

            const res = await apiCall(
                "PATCH",
                `/adminPanel/edit-inverter/${selectedPhase._id}`,
                { phase: phaseName },
            );

            if (res?.data?.success) {
                toast.success("Phase updated successfully");
                setIsEditModalOpen(false);
                setPhaseName("");
                setSelectedPhase(null);
                fetchInverterPhase();
            } else {
                toast.error(res?.data?.message || "Update failed");
            }
        } catch (error) {
            console.error(error);
            toast.error(
                error?.response?.data?.message || "Something went wrong",
            );
        }
    };
    return (
        <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
            <div className="border border-red-200 rounded-2xl p-4 sm:p-6 bg-gray-200 shadow-sm">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-red-300 rounded-xl p-4 mb-6 bg-white">
                    <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">
                        Inverter Phase Management
                    </h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 w-fit"
                    >
                        <Plus size={18} />
                        Add Phase
                    </button>
                </div>

                {/* ✅ KEY FIX: items-start so cards don't stretch to match tallest */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                    {phases.length > 0 ? (
                        phases.map((phase) => (
                            <div
                                key={phase._id}
                                className="bg-red-50 border border-red-300 rounded-2xl p-5 shadow-md hover:shadow-lg transition relative"
                            >
                                <h2 className="text-xl capitalize font-semibold text-gray-800 pr-20">
                                    {phase.phase}
                                </h2>
                                <p className="text-gray-500 mt-1">Inverter</p>

                                {/* ✅ KW badges: wrap naturally, no fixed height */}
                                {phase.capacities?.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {phase.capacities.map((it, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-1 px-2 py-1 rounded-md bg-white border border-gray-200 shadow-sm"
                                            >
                                                <span className="text-green-700 font-medium text-sm">
                                                    {it} kW
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(phase, it)
                                                    }
                                                    className="p-0.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* ✅ Action buttons: wrap on small cards */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddKilowatt(phase);
                                        }}
                                        className="px-3 py-1.5 text-sm border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition"
                                    >
                                        + Add kW
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedPhase(phase);
                                            setPhaseName(phase.phase);
                                            setIsEditModalOpen(true);
                                        }}
                                        className="px-3 py-1.5 text-sm border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                                    >
                                        Edit
                                    </button>
                                    {/* <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleStatus(phase);
                                        }}
                                        className={`px-3 py-1.5 text-sm rounded-lg border transition ${
                                            phase.status
                                                ? "border-red-500 text-red-600 hover:bg-red-50"
                                                : "border-green-500 text-green-600 hover:bg-green-50"
                                        }`}
                                    >
                                        {phase.status
                                            ? "Deactivate"
                                            : "Activate"}
                                    </button> */}

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleStatus(phase);
                                        }}
                                        className={`px-3 py-1.5 text-sm rounded-lg border transition ${
                                            phase.status === "active"
                                                ? "border-red-500 text-red-600 hover:bg-red-50"
                                                : "border-green-500 text-green-600 hover:bg-green-50"
                                        }`}
                                    >
                                        {phase.status === "active"
                                            ? "Inactivate"
                                            : "Activate"}
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full">
                            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center">
                                <h3 className="text-lg font-semibold text-gray-700">
                                    No Phases Found
                                </h3>
                                <p className="text-gray-500 mt-2">
                                    Add your first inverter phase to get
                                    started.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Phase Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-xl font-semibold">
                                Add Inverter Phase
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 text-xl hover:text-red-600"
                            >
                                ✕
                            </button>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Phase Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter phase name"
                                value={phaseName}
                                onChange={(e) => setPhaseName(e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="border px-4 py-2 rounded-lg hover:border-amber-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="border hover:border-green-500 text-black px-4 py-2 rounded-lg"
                            >
                                Save Phase
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Kilowatt Modal */}
            {showKilowattModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl w-full max-w-sm p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Add Kilowatt
                        </h2>
                        <p className="mb-4 text-gray-600">
                            Phase:{" "}
                            <span className="font-semibold">
                                {selectedPhase?.phase}
                            </span>
                        </p>
                        <input
                            type="number"
                            value={kw}
                            onChange={(e) => setkw(e.target.value)}
                            placeholder="Enter kilowatt (e.g. 3)"
                            className="w-full border rounded-lg p-2 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowKilowattModal(false)}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleApiAddkilowat}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Phase Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Edit Phase
                        </h2>
                        <input
                            type="text"
                            value={phaseName}
                            onChange={(e) => setPhaseName(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex justify-end gap-3 mt-5">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEdit}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InverterManagement;
