
import React, { useEffect, useState } from "react";
import { apiCall } from "../../services/api";

const AdminModalProposalDetails = ({ salesId, clientId, onClose }) => {
    const [proposals, setProposals] = useState([]);
    const [selectedProposal, setSelectedProposal] = useState(null);
    const [loading, setLoading] = useState(false);

    const getDetails = async () => {
        try {
            setLoading(true);
            const response = await apiCall(
                "GET",
                `/adminPanel/sales-client-proposals/${salesId}/${clientId}`,
            );
            setProposals(response?.data?.data || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (salesId && clientId) getDetails();
    }, [salesId, clientId]);

    const panel = selectedProposal?.selectedPanels || [];

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={(e) => e.target === e.currentTarget && onClose?.()}
        >
            <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 mx-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-4 ">
                    {selectedProposal ? (
                        <button
                            onClick={() => setSelectedProposal(null)}
                            className="flex items-center cursor-pointer gap-1 text-red-800 hover:text-red-600 font-medium text-sm"
                        >
                            ← Back to Proposals
                        </button>
                    ) : (
                        <span className="text-gray-700 font-semibold text-lg">
                            All Proposals
                        </span>
                    )}
                    <button
                        onClick={onClose}
                        className="text-[#a20000] cursor-pointer  hover:text-gray-600 text-xl font-bold"
                    >
                        ✕
                    </button>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex justify-center h-40 items-center text-gray-500">
                        Loading...
                    </div>
                )}

                {/* No Data */}
                {!loading && proposals.length === 0 && (
                    <div className="flex justify-center h-40 items-center text-gray-500">
                        🚫 No proposals available
                    </div>
                )}

                {/* ─── PROPOSAL LIST VIEW ─── */}
                {!loading && proposals.length > 0 && !selectedProposal && (
                    <div className="space-y-3">
                        {proposals.map((proposal, index) => {
                            const panelCount =
                                proposal?.selectedPanels?.length || 0;
                            return (
                                <div
                                    key={proposal._id}
                                    onClick={() =>
                                        setSelectedProposal(proposal)
                                    }
                                    className="border border-gray-200 rounded-lg p-4 hover:border-red-800 hover:bg-red-50 cursor-pointer transition-all group"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-gray-800 group-hover:text-red-900">
                                                Proposal {index + 1}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-0.5">
                                                {panelCount} panel
                                                {panelCount !== 1
                                                    ? "s"
                                                    : ""}{" "}
                                                &nbsp;|&nbsp; GST:{" "}
                                                {proposal.gst}% &nbsp;|&nbsp;
                                                Total: ₹
                                                {proposal.finalPrice?.toLocaleString?.() ??
                                                    proposal.finalPrice}
                                            </p>
                                        </div>
                                        <span className="text-red-800 text-lg group-hover:translate-x-1 transition-transform">
                                            →
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* ─── PROPOSAL DETAIL VIEW ─── */}
                {!loading && selectedProposal && (
                    <>
                        {/* Title */}
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="bg-red-800 text-white text-xl font-bold px-10 py-3 rounded-lg">
                                    Price of Solar Panel
                                </div>
                                <div className="absolute left-1/2 -translate-x-1/2 -bottom-2.5 w-0 h-0 border-l-12 border-r-12 border-t-10 border-l-transparent border-r-transparent border-t-red-800" />
                            </div>
                        </div>

                        {/* Table 1 — Panel Info */}
                        <table className="w-full border-collapse text-sm mb-6">
                            <thead>
                                <tr className="bg-[#a20000] text-white">
                                    <th className="border border-[#ffffff] px-4 py-2.5 text-left">
                                        S.No
                                    </th>
                                    <th className="border border-[#ffffff] px-4 py-2.5 text-left">
                                        Panel Watt
                                    </th>
                                    <th className="border border-[#ffffff] px-4 py-2.5 text-left">
                                        Panel Type
                                    </th>
                                    <th className="border border-[#ffffff] px-4 py-2.5 text-left">
                                        Technology
                                    </th>
                                    <th className="border border-[#ffffff] px-4 py-2.5 text-left">
                                        Constructive Type
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {panel.length > 0 ? (
                                    panel.map((item, index) => (
                                        <tr key={index} className="bg-white">
                                            <td className="border border-gray-300 px-4 py-2.5 text-center">
                                                {index + 1}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2.5 text-center">
                                                {item?.wattId?.watt} Wp
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2.5 text-center">
                                                {item?.panelId?.panelType}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2.5 text-center">
                                                {
                                                    item?.technologyId
                                                        ?.technologyPanel
                                                }
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2.5 text-center">
                                                {
                                                    item?.constructiveId
                                                        ?.constructiveType
                                                }
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center py-4 text-gray-500"
                                        >
                                            No panel data
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Table 2 — Pricing */}
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-[#a20000] text-white">
                                    <th className="border border-[#ffffff] px-4 py-2.5 text-center w-12">
                                        S.No
                                    </th>
                                    <th className="border border-[#ffffff] px-4 py-2.5 text-center">
                                        Item Description
                                    </th>
                                    <th className="border border-[#ffffff] px-4 py-2.5 text-center">
                                        ₹ Rate/Watt
                                    </th>
                                    <th className="border border-[#ffffff] px-4 py-2.5 text-center">
                                        Quantity
                                    </th>
                                    <th className="border border-[#ffffff] px-4 py-2.5 text-center">
                                        ₹ Amount
                                    </th>
                                    <th className="border border-[#ffffff] px-4 py-2.5 text-center">
                                        ₹ GST {selectedProposal.gst}%
                                    </th>
                                    <th className="border border-[#ffffff] px-4 py-2.5 text-center">
                                        ₹ Amount + GST
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {panel.length > 0 ? (
                                    panel.map((item, index) => {
                                        const panelLabel = `${item?.wattId?.watt || "-"}Wp Gautam Solar, ${item?.panelId?.panelType || "-"}, ${item?.technologyId?.technologyPanel || "-"}, ${item?.constructiveId?.constructiveType || "-"}`;
                                        const amount = item?.totalPrice || 0;
                                        const gst = item?.gstAmount || 0;
                                        const amountWithGST = amount + gst;
                                        return (
                                            <tr
                                                key={index}
                                                className="bg-white"
                                            >
                                                <td className="border px-4 py-2 text-center">
                                                    {index + 1}
                                                </td>
                                                <td className="border px-4 py-2 text-center">
                                                    {panelLabel}
                                                </td>
                                                <td className="border px-4 py-2 text-center">
                                                    {item?.rate}
                                                </td>
                                                <td className="border px-4 py-2 text-center">
                                                    {item?.quantity}
                                                </td>
                                                <td className="border px-4 py-2 text-center">
                                                    {item?.totalPrice}
                                                </td>
                                                <td className="border px-4 py-2 text-center">
                                                    {item?.gstAmount}
                                                </td>
                                                <td className="border px-4 py-2 text-center">
                                                    {amountWithGST}
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="text-center py-4 text-gray-500"
                                        >
                                            No panel data available
                                        </td>
                                    </tr>
                                )}

                                {panel.length > 0 && (
                                    <tr className="bg-gray-50">
                                        <td
                                            colSpan={5}
                                            className="border px-4 py-2"
                                        />
                                        <td className="border px-4 py-2 text-right font-semibold">
                                            ₹ Total Amount
                                        </td>
                                        <td className="border px-4 py-2 text-center font-bold ">
                                            {selectedProposal?.finalPrice}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Terms & Conditions */}
                        <div className="flex justify-center mt-6">
                            <div className="relative">
                                <div className="bg-[#a20000] text-white text-xl font-bold px-10 py-3 rounded-lg">
                                    Terms & Conditions
                                </div>
                                <div className="absolute left-1/2 -translate-x-1/2 -bottom-2.5 w-0 h-0 border-l-12 border-r-12 border-t-10 border-l-transparent border-r-transparent border-t-[#a20000]" />
                            </div>
                        </div>

                        <div className="max-h-80 overflow-y-auto border p-3 rounded mt-5">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html:
                                        selectedProposal?.termsAndConditions ||
                                        "",
                                }}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminModalProposalDetails;
