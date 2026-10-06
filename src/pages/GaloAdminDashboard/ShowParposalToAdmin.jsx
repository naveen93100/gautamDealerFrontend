// import React, { useEffect, useMemo, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//     MoveLeft,
//     Phone,
//     Calendar,
//     Zap,
//     IndianRupee,
//     Building2,
//     Mail,
//     MapPin,
//     FileText,
// } from "lucide-react";
// import { apiCall } from "../../services/api";

// const ShowParposalToAdmin = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { salesId, clientId } = location.state || {};
//     console.log("Location state:", location.state);

//     useEffect(() => {
//         getprposaldetails();
//     }, [salesId, clientId]);

//     const getprposaldetails = async () => {
//         try {
//             const res = await apiCall(
//                 "get",
//                 `/api/galoAdmin/sales-client-proposals/${salesId}/${clientId}`,
//             );

//             console.log("Proposal details:", res.data);
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     return (
//         <div>
//             <p>Show Proposal to Admin Page</p>
//         </div>
//     );
// };

// export default ShowParposalToAdmin;

import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    MoveLeft,
    Phone,
    Calendar,
    Zap,
    ChevronRight,
    ArrowLeft,
} from "lucide-react";
import { apiCall } from "../../services/api";

const PROPOSAL_TABS = ["All", "Panel", "Both"];

const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const formatPrice = (value) => {
    if (value === undefined || value === null || value === "") return "-";
    return `₹${Number(value).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
    })}`;
};

const formatNumber = (value) => {
    if (value === undefined || value === null || value === "") return "-";
    return Number(value).toLocaleString("en-IN", { maximumFractionDigits: 2 });
};

const getItemDescription = (item) =>
    [
        item.wattId?.watt != null ? `${item.wattId.watt}Wp` : null,
        item.panelId?.panelType,
        item.technologyId?.technologyPanel,
        item.constructiveId?.constructiveType,
        item.inverterId?.inverterCapacity
            ? `Inverter ${item.inverterId.inverterCapacity} KW`
            : null,
    ]
        .filter(Boolean)
        .join(", ") || "-";

const SectionTitle = ({ children }) => (
    <div className="flex justify-center my-5">
        <span className="px-6 py-2 rounded-lg bg-yellow-400 text-black text-sm sm:text-base font-bold shadow-sm">
            {children}
        </span>
    </div>
);

const ShowParposalToAdmin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { salesId, clientId, clientName, clientPhone } = location.state || {};

    const [client, setClient] = useState(null);
    const [proposals, setProposals] = useState([]);
    const [counts, setCounts] = useState({ total: 0, panel: 0, both: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("All");
    const [selectedProposal, setSelectedProposal] = useState(null);

    useEffect(() => {
        if (!salesId || !clientId) return;

        let ignore = false;

        const getProposalDetails = async () => {
            try {
                setLoading(true);
                setError("");

                const res = await apiCall(
                    "get",
                    `/api/galoAdmin/sales-client-proposals/${salesId}/${clientId}`,
                );

                if (ignore) return;

                const list = res?.data?.data ?? [];
                setClient(res?.data?.client ?? null);
                setProposals(Array.isArray(list) ? list : []);
                setCounts(
                    res?.data?.counts ?? {
                        total: list.length,
                        panel: 0,
                        both: 0,
                    },
                );
            } catch (err) {
                if (ignore) return;
                console.log(
                    "Error while fetching proposals",
                    err?.response?.data?.message,
                );
                setError(
                    err?.response?.data?.message || "Failed to load proposals",
                );
            } finally {
                if (!ignore) setLoading(false);
            }
        };

        getProposalDetails();

        return () => {
            ignore = true;
        };
    }, [salesId, clientId]);

    // Scroll to top when switching between list and detail
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [selectedProposal]);

    const visibleProposals = useMemo(() => {
        if (activeTab === "All") return proposals;
        return proposals.filter((p) => p.proposalType === activeTab);
    }, [proposals, activeTab]);

    const getTabCount = (tab) => {
        if (tab === "Panel") return counts.panel;
        if (tab === "Both") return counts.both;
        return counts.total;
    };

    // Oldest proposal = Proposal 1 (API returns newest first)
    const getProposalNo = (proposal) =>
        proposals.length - proposals.findIndex((p) => p._id === proposal._id);

    const displayName =
        client?.fullName || client?.companyName || clientName || "Client";
    const displayPhone = client?.phone || clientPhone || "-";

    if (!salesId || !clientId) {
        return (
            <div className="w-full p-6 text-center text-sm text-red-500">
                Missing client details. Please go back and select a client.
            </div>
        );
    }

    const selectedPanels = selectedProposal?.selectedPanels ?? [];
    const hasInverter = selectedPanels.some((p) => p.inverterId);
    const totalSubsidy = selectedPanels.reduce(
        (sum, p) => sum + (Number(p.subsidyAmount) || 0),
        0,
    );

    return (
        <div className="w-full p-4 sm:p-6 mx-auto">
            <div className="bg-white border-2 border-yellow-400 rounded-2xl shadow-md shadow-yellow-300/40 p-4 sm:p-6">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)}>
                            <MoveLeft
                                size={20}
                                className="text-gray-800 transition"
                            />
                        </button>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-black">
                                {selectedProposal
                                    ? `Proposal ${getProposalNo(selectedProposal)}`
                                    : "Client Proposals"}
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                {selectedProposal
                                    ? "Proposal details"
                                    : "Click a proposal to view details"}
                            </p>
                        </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                        <p className="font-semibold text-black">
                            {displayName}
                        </p>
                        <p className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                            <Phone size={12} />
                            {displayPhone}
                        </p>
                    </div>
                </div>

                {/* States */}
                {loading && (
                    <div className="py-10 text-center text-sm text-gray-500">
                        Loading proposals...
                    </div>
                )}

                {!loading && error && (
                    <div className="py-10 text-center text-sm text-red-500">
                        {error}
                    </div>
                )}

                {/* ============ LIST VIEW ============ */}
                {!loading && !error && !selectedProposal && (
                    <>
                        {/* Tabs */}
                        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
                            {PROPOSAL_TABS.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                                        activeTab === tab
                                            ? "bg-yellow-400 border-yellow-400 text-black"
                                            : "border-gray-300 text-gray-700 hover:bg-yellow-50"
                                    }`}
                                >
                                    {tab} ({getTabCount(tab)})
                                </button>
                            ))}
                        </div>

                        {visibleProposals.length === 0 && (
                            <div className="py-10 text-center text-sm text-gray-500">
                                No proposals found
                            </div>
                        )}

                        <div className="space-y-3">
                            {visibleProposals.map((proposal) => (
                                <div
                                    key={proposal._id}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() =>
                                        setSelectedProposal(proposal)
                                    }
                                    onKeyDown={(e) => {
                                        if (
                                            e.key === "Enter" ||
                                            e.key === " "
                                        ) {
                                            e.preventDefault();
                                            setSelectedProposal(proposal);
                                        }
                                    }}
                                    className="flex items-center justify-between gap-3 border border-gray-200 rounded-xl px-4 py-4 hover:border-yellow-400 hover:bg-yellow-50/50 hover:shadow-sm transition cursor-pointer focus:outline-none focus:border-yellow-400"
                                >
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <p className="font-semibold text-black">
                                                Proposal{" "}
                                                {getProposalNo(proposal)}
                                            </p>
                                            <span
                                                className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                                                    proposal.proposalType ===
                                                    "Both"
                                                        ? "bg-purple-100 text-purple-700"
                                                        : "bg-blue-100 text-blue-700"
                                                }`}
                                            >
                                                {proposal.proposalType ===
                                                "Both"
                                                    ? "Panel & Inverter"
                                                    : proposal.proposalType ||
                                                      "-"}
                                            </span>
                                        </div>

                                        <p className="text-sm text-gray-600 mt-1 break-words">
                                            {proposal.selectedPanels?.length ??
                                                0}{" "}
                                            panel
                                            {(proposal.selectedPanels?.length ??
                                                0) !== 1 && "s"}{" "}
                                            | GST: {proposal.gst ?? 0}% | Total:{" "}
                                            {formatPrice(proposal.finalPrice)}
                                        </p>

                                        <p className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                                            <Calendar size={12} />
                                            {formatDate(proposal.createdAt)}
                                        </p>
                                    </div>

                                    <ChevronRight
                                        size={20}
                                        className="text-yellow-600 shrink-0"
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* ============ DETAIL VIEW ============ */}
                {!loading && !error && selectedProposal && (
                    <div>
                        <button
                            onClick={() => setSelectedProposal(null)}
                            className="flex items-center gap-1.5 text-sm font-medium text-yellow-700 hover:text-yellow-900 transition mb-2"
                        >
                            <ArrowLeft size={16} />
                            Back to Proposals
                        </button>

                        {/* Summary strip */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-3">
                            <div>
                                <p className="text-xs text-gray-500">Type</p>
                                <p className="text-sm font-semibold text-black">
                                    {selectedProposal.proposalType === "Both"
                                        ? "Panel & Inverter"
                                        : selectedProposal.proposalType || "-"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Date</p>
                                <p className="text-sm font-semibold text-black">
                                    {formatDate(selectedProposal.createdAt)}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Setup</p>
                                <p className="flex items-center gap-1 text-sm font-semibold text-black">
                                    <Zap
                                        size={14}
                                        className="text-yellow-500"
                                    />
                                    {selectedProposal.setupKw != null
                                        ? `${selectedProposal.setupKw} KW`
                                        : "-"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">GST</p>
                                <p className="text-sm font-semibold text-black">
                                    {selectedProposal.gst ?? 0}%
                                </p>
                            </div>
                        </div>

                        {/* Panel specs table */}
                        <SectionTitle>Price of Solar Panel</SectionTitle>

                        <div className="overflow-x-auto border border-gray-200 rounded-lg">
                            <table className="w-full min-w-[560px] text-sm text-center border-collapse">
                                <thead>
                                    <tr className="bg-yellow-400 text-black">
                                        <th className="py-3 px-3 font-semibold">
                                            S.No
                                        </th>
                                        <th className="py-3 px-3 font-semibold">
                                            Panel Watt
                                        </th>
                                        <th className="py-3 px-3 font-semibold">
                                            Panel Type
                                        </th>
                                        <th className="py-3 px-3 font-semibold">
                                            Technology
                                        </th>
                                        <th className="py-3 px-3 font-semibold">
                                            Constructive Type
                                        </th>
                                        {hasInverter && (
                                            <th className="py-3 px-3 font-semibold">
                                                Inverter
                                            </th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedPanels.map((item, idx) => (
                                        <tr
                                            key={item._id || idx}
                                            className="border-t border-gray-200 text-gray-700"
                                        >
                                            <td className="py-3 px-3">
                                                {idx + 1}
                                            </td>
                                            <td className="py-3 px-3">
                                                {item.wattId?.watt != null
                                                    ? `${item.wattId.watt} Wp`
                                                    : "-"}
                                            </td>
                                            <td className="py-3 px-3">
                                                {item.panelId?.panelType || "-"}
                                            </td>
                                            <td className="py-3 px-3">
                                                {item.technologyId
                                                    ?.technologyPanel || "-"}
                                            </td>
                                            <td className="py-3 px-3">
                                                {item.constructiveId
                                                    ?.constructiveType || "-"}
                                            </td>
                                            {hasInverter && (
                                                <td className="py-3 px-3">
                                                    {item.inverterId
                                                        ?.inverterCapacity
                                                        ? `${item.inverterId.inverterCapacity} KW`
                                                        : "-"}
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pricing table */}
                        <div className="overflow-x-auto border border-gray-200 rounded-lg mt-5">
                            <table className="w-full min-w-[720px] text-sm text-center border-collapse">
                                <thead>
                                    <tr className="bg-yellow-400 text-black">
                                        <th className="py-3 px-3 font-semibold">
                                            S.No
                                        </th>
                                        <th className="py-3 px-3 font-semibold">
                                            Item Description
                                        </th>
                                        <th className="py-3 px-3 font-semibold">
                                            ₹ Rate
                                        </th>
                                        <th className="py-3 px-3 font-semibold">
                                            Quantity
                                        </th>
                                        <th className="py-3 px-3 font-semibold">
                                            ₹ Amount
                                        </th>
                                        <th className="py-3 px-3 font-semibold">
                                            ₹ GST {selectedProposal.gst ?? 0}%
                                        </th>
                                        <th className="py-3 px-3 font-semibold">
                                            ₹ Amount + GST
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedPanels.map((item, idx) => (
                                        <tr
                                            key={item._id || idx}
                                            className="border-t border-gray-200 text-gray-700"
                                        >
                                            <td className="py-3 px-3">
                                                {idx + 1}
                                            </td>
                                            <td className="py-3 px-3 text-left">
                                                {getItemDescription(item)}
                                            </td>
                                            <td className="py-3 px-3">
                                                {formatNumber(item.rate)}
                                            </td>
                                            <td className="py-3 px-3">
                                                {item.quantity ?? "-"}
                                            </td>
                                            <td className="py-3 px-3">
                                                {formatNumber(item.totalPrice)}
                                            </td>
                                            <td className="py-3 px-3">
                                                {formatNumber(item.gstAmount)}
                                            </td>
                                            <td className="py-3 px-3 font-semibold text-black">
                                                {formatNumber(
                                                    (Number(item.totalPrice) ||
                                                        0) +
                                                        (Number(
                                                            item.gstAmount,
                                                        ) || 0),
                                                )}
                                            </td>
                                        </tr>
                                    ))}

                                    {totalSubsidy > 0 && (
                                        <tr className="border-t border-gray-200 bg-gray-50 text-gray-700">
                                            <td
                                                colSpan={6}
                                                className="py-3 px-3 text-right"
                                            >
                                                Subsidy
                                            </td>
                                            <td className="py-3 px-3 font-semibold">
                                                {formatNumber(totalSubsidy)}
                                            </td>
                                        </tr>
                                    )}

                                    <tr className="border-t-2 border-yellow-300 bg-yellow-50">
                                        <td
                                            colSpan={6}
                                            className="py-3 px-3 text-right font-semibold text-black"
                                        >
                                            ₹ Total Amount
                                        </td>
                                        <td className="py-3 px-3 font-bold text-black">
                                            {formatNumber(
                                                selectedProposal.finalPrice,
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShowParposalToAdmin;
