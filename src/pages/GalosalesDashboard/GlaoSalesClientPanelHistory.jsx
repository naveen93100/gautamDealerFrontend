import React, { useState } from "react";
import {
    ArrowLeft,
    FileText,
    Download,
    Pencil,
    Trash2,
    PanelsTopLeft,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import CreateGaloSalesPanelProposal from "./CreateGaloSalesPanelProposal";
import { apiCall } from "../../services/api";
import toast from "react-hot-toast";
import {
    useDeleteGaloSalesClientProposal,
    useGetGaloSalesClientProposal,
} from "../../hooks/useGaloSalesMethods";

const GaloSalesClientPanelHistory = () => {
    const [createSalesPanelProp, setCreateSalesPanelProp] = useState(false);
    const [selectSalesProposal, setSelectSalesProposal] = useState(null);
    const location = useLocation();
    const clientId = location.state?.clientId;

    console.log("Client ID:", clientId);

    const [showdeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDeleteProposalId, setSelectedDeleteProposalId] =
        useState(null);

    const navigate = useNavigate();

    // API hooks
    const { data: proposals, isLoading } =
        useGetGaloSalesClientProposal(clientId);
    const { mutate: deleteProposal } =
        useDeleteGaloSalesClientProposal(clientId);
    console.log(proposals);

    // Format date nicely
    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // Handlers
    const handleDeleteProposal = () => {
        let propId = selectedDeleteProposalId;
        deleteProposal(propId, {
            onSuccess: (d) => {
                toast.success(d?.message || "Proposal deleted");
                setShowDeleteModal(false);
                setSelectedDeleteProposalId(null);
            },
            onError: (e) => {
                toast.error(e || "Delete failed");
            },
        });
    };

    console.log("this is proposal:",proposals)

    return (
        <div className="min-h-screen bg-gray-50 pb-10">
            <div className="max-w-7xl mx-auto px-6 mt-6">
                <div className="bg-white rounded-3xl shadow-md border border-yellow-300/50 p-6 md:p-8">
                    {/* Buttons row */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition shadow-sm border border-yellow-400"
                        >
                            <ArrowLeft size={18} />
                            Go Back
                        </button>

                        <button
                            onClick={() => {
                                setSelectSalesProposal(null);
                                setCreateSalesPanelProp(true);
                            }}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition shadow-sm border border-yellow-400"
                        >
                            <PanelsTopLeft size={18} />
                            Create Panel Proposal
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 flex items-center gap-4">
                            <div className="bg-yellow-400 p-3 rounded-xl text-black">
                                <FileText size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    Total Proposals
                                </p>
                                <p className="text-2xl font-bold text-black">
                                    {proposals?.length || 0}
                                </p>
                            </div>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex items-center gap-4">
                            <div className="bg-black p-3 rounded-xl text-white">
                                <PanelsTopLeft size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    Active Proposals
                                </p>
                                <p className="text-2xl font-bold text-black">
                                    {proposals?.filter(
                                        (p) => p.isActive !== false,
                                    ).length || 0}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Proposal Table */}
                    {isLoading ? (
                        <div className="text-center py-12 text-gray-500">
                            Loading proposals...
                        </div>
                    ) : proposals?.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-yellow-300 rounded-2xl bg-gray-50/50">
                            <PanelsTopLeft
                                className="text-yellow-400 mb-3"
                                size={40}
                            />
                            <p className="text-gray-600 font-medium">
                                No proposals yet
                            </p>
                            <p className="text-sm text-gray-400">
                                Click{" "}
                                <span className="text-yellow-600 font-semibold">
                                    Create Panel Proposal
                                </span>{" "}
                                to add one.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto rounded-2xl border border-gray-200">
                            <table className="w-full text-sm border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b-2 border-yellow-300">
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                            Proposal
                                        </th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                            Created
                                        </th>
                                        <th className="px-5 py-3 text-right text-xs font-semibold text-black uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {proposals?.map((item) => (
                                        <tr
                                            key={item._id}
                                            className="hover:bg-yellow-50/40 transition-colors"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-yellow-50 border border-yellow-200 flex items-center justify-center text-yellow-700">
                                                        <FileText size={16} />
                                                    </div>
                                                    <span className="font-medium text-gray-800">
                                                        Panel Proposal
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                                                {formatDate(item.createdAt)}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={() => {
                                                            setSelectSalesProposal(
                                                                item,
                                                            );
                                                            setCreateSalesPanelProp(
                                                                true,
                                                            );
                                                        }}
                                                        className="p-2 rounded-lg text-gray-500 hover:text-yellow-700 hover:bg-yellow-100 transition"
                                                        title="Edit"
                                                    >
                                                        <Pencil size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            console.log(
                                                                "Selected Proposal:",
                                                                item,
                                                            );
                                                            navigate(
                                                                "/galo-parposal-view",
                                                                { state: item },
                                                            );
                                                        }}
                                                        className="p-2 rounded-lg text-gray-500 hover:text-green-700 hover:bg-green-100 transition"
                                                        title="Download"
                                                    >
                                                        <Download size={16} />
                                                    </button>
                                                    <div className="w-px h-6 bg-gray-200 mx-1" />
                                                    <button
                                                        onClick={() => {
                                                            setSelectedDeleteProposalId(
                                                                item._id,
                                                            );
                                                            setShowDeleteModal(
                                                                true,
                                                            );
                                                        }}
                                                        className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-100 transition"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* ===== DELETE MODAL ===== */}
                {showdeleteModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl border border-yellow-300">
                            <h2 className="text-lg font-semibold text-black">
                                Delete Proposal
                            </h2>
                            <p className="text-sm text-gray-500 mt-2">
                                Are you sure you want to delete this proposal?
                                This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteProposal}
                                    className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ===== CREATE / EDIT MODAL ===== */}
                {createSalesPanelProp && (
                    <CreateGaloSalesPanelProposal
                        onClose={() => {
                            setCreateSalesPanelProp(false);
                            setSelectSalesProposal(null);
                        }}
                        data={selectSalesProposal}
                        setData={setSelectSalesProposal}
                        clientId={clientId}
                    />
                )}
            </div>
        </div>
    );
};

export default GaloSalesClientPanelHistory;
