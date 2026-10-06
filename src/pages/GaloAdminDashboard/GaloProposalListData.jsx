// import React, { useEffect, useMemo, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//     MoveLeft,
//     Phone,
//     Building2,
//     Mail,
//     MapPin,
//     Calendar,
//     FileText,
//     ChevronRight,
// } from "lucide-react";
// import { apiCall } from "../../services/api";

// const formatDate = (dateStr) => {
//     if (!dateStr) return "-";
//     return new Date(dateStr).toLocaleDateString("en-IN", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//     });
// };

// const GaloProposalListData = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { salesId, name, userId } = location.state || {};

//     const [clients, setClients] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [search, setSearch] = useState("");

//     const getAllCreatedProposals = async () => {
//         try {
//             setLoading(true);
//             setError("");

//             const response = await apiCall(
//                 "get",
//                 `/api/galoAdmin/galoSales-client/${salesId}`,
//             );

//             const list = response?.data?.data ?? response?.data ?? [];
//             setClients(Array.isArray(list) ? list : []);
//         } catch (err) {
//             console.log(
//                 "Error while fetching the proposal data",
//                 err?.response?.data?.message,
//             );
//             setError(err?.response?.data?.message || "Failed to load data");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (salesId) {
//             getAllCreatedProposals();
//         }
//     }, [salesId]);

//     const rows = useMemo(
//         () =>
//             clients.map((client) => ({
//                 id: client._id,
//                 customerName:
//                     client.fullName || client.companyName || "Unnamed Client",
//                 customerPhone: client.phone || "-",
//                 companyName: client.companyName || "",
//                 gstin: client.gstin || "",
//                 email: client.email || "",
//                 address: client.address || "",
//                 createdDate: formatDate(client.createdAt),
//                 raw: client,
//             })),
//         [clients],
//     );

//     const filteredRows = useMemo(() => {
//         const q = search.trim().toLowerCase();
//         if (!q) return rows;
//         return rows.filter(
//             (item) =>
//                 item.customerName.toLowerCase().includes(q) ||
//                 item.customerPhone.includes(q) ||
//                 item.companyName.toLowerCase().includes(q) ||
//                 item.gstin.toLowerCase().includes(q) ||
//                 item.email.toLowerCase().includes(q),
//         );
//     }, [rows, search]);

//     const handleCardClick = (item) => {
//         // TODO: replace with the actual details route
//         // navigate(`/galo-sales/client/${item.id}`, { state: { client: item.raw, salesId } });
//         console.log("Card clicked", item.raw);
//     };

//     return (
//         <div className="w-full p-4 sm:p-6 mx-auto">
//             <div className="bg-white border-2 border-yellow-400 rounded-2xl shadow-md shadow-yellow-300/40 p-6">
//                 {/* Page Header */}
//                 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//                     <div className="flex items-center gap-4">
//                         <button onClick={() => navigate(-1)}>
//                             <MoveLeft
//                                 size={20}
//                                 className="text-gray-800 hover:text-gray-800 transition"
//                             />
//                         </button>
//                         <div>
//                             <h1 className="text-2xl font-bold text-black">
//                                 Created Proposals
//                             </h1>
//                             <p className="text-sm text-gray-500 mt-1">
//                                 View and manage all created proposals
//                             </p>
//                         </div>
//                     </div>

//                     {/* Sales Person Info */}
//                     <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
//                         <p className="text-xs text-gray-500">Sales Person</p>
//                         <p className="font-semibold text-black">
//                             {name || "All Sales Persons"}
//                         </p>
//                         {userId && (
//                             <p className="text-xs text-gray-500">
//                                 ID: {userId}
//                             </p>
//                         )}
//                     </div>
//                 </div>

//                 {/* Search */}
//                 <div className="flex flex-col md:flex-row gap-3 mb-5">
//                     <input
//                         type="text"
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         placeholder="Search customer / phone / company / GSTIN..."
//                         className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-yellow-400"
//                     />
//                 </div>

//                 {/* States */}
//                 {loading && (
//                     <div className="py-10 text-center text-sm text-gray-500">
//                         Loading...
//                     </div>
//                 )}

//                 {!loading && error && (
//                     <div className="py-10 text-center text-sm text-red-500">
//                         {error}
//                     </div>
//                 )}

//                 {!loading && !error && filteredRows.length === 0 && (
//                     <div className="py-10 text-center text-sm text-gray-500">
//                         No data found
//                     </div>
//                 )}

//                 {/* Cards */}
//                 {!loading && !error && filteredRows.length > 0 && (
//                     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//                         {filteredRows.map((item) => (
//                             <div
//                                 key={item.id}
//                                 role="button"
//                                 tabIndex={0}
//                                 onClick={() => handleCardClick(item)}
//                                 onKeyDown={(e) => {
//                                     if (e.key === "Enter" || e.key === " ") {
//                                         e.preventDefault();
//                                         handleCardClick(item);
//                                     }
//                                 }}
//                                 className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-yellow-400 transition flex flex-col cursor-pointer focus:outline-none focus:border-yellow-400"
//                             >
//                                 {/* Card Header */}
//                                 <div className="flex items-start gap-3 mb-3">
//                                     <div className="w-10 h-10 shrink-0 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center font-bold">
//                                         {item.customerName
//                                             .charAt(0)
//                                             .toUpperCase()}
//                                     </div>
//                                     <div className="min-w-0 flex-1">
//                                         <p className="font-semibold text-black truncate">
//                                             {item.customerName}
//                                         </p>
//                                         <p className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
//                                             <Phone size={12} />
//                                             {item.customerPhone}
//                                         </p>
//                                     </div>
//                                     <ChevronRight
//                                         size={18}
//                                         className="text-gray-400 shrink-0 mt-2"
//                                     />
//                                 </div>

//                                 {/* Card Details */}
//                                 <div className="space-y-2 text-sm text-gray-700 flex-1">
//                                     {item.companyName && (
//                                         <p className="flex items-center gap-2">
//                                             <Building2
//                                                 size={14}
//                                                 className="text-gray-400 shrink-0"
//                                             />
//                                             <span className="truncate">
//                                                 {item.companyName}
//                                             </span>
//                                         </p>
//                                     )}

//                                     {item.gstin && (
//                                         <p className="flex items-center gap-2">
//                                             <FileText
//                                                 size={14}
//                                                 className="text-gray-400 shrink-0"
//                                             />
//                                             <span className="truncate">
//                                                 {item.gstin}
//                                             </span>
//                                         </p>
//                                     )}

//                                     {item.email && (
//                                         <p className="flex items-center gap-2">
//                                             <Mail
//                                                 size={14}
//                                                 className="text-gray-400 shrink-0"
//                                             />
//                                             <span className="truncate">
//                                                 {item.email}
//                                             </span>
//                                         </p>
//                                     )}

//                                     {item.address && (
//                                         <p className="flex items-center gap-2">
//                                             <MapPin
//                                                 size={14}
//                                                 className="text-gray-400 shrink-0"
//                                             />
//                                             <span className="truncate">
//                                                 {item.address}
//                                             </span>
//                                         </p>
//                                     )}
//                                 </div>

//                                 {/* Card Footer */}
//                                 <div className="mt-4 pt-3 border-t border-gray-100">
//                                     <p className="flex items-center gap-1 text-xs text-gray-500">
//                                         <Calendar size={12} />
//                                         {item.createdDate}
//                                     </p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default GaloProposalListData;

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    MoveLeft,
    Phone,
    Building2,
    Mail,
    MapPin,
    Calendar,
    FileText,
    ChevronRight,
    ChevronLeft,
    Search,
} from "lucide-react";
import { apiCall } from "../../services/api";

const PAGE_LIMIT = 9;

// Full class names are written out so Tailwind can detect them
const COLOR_PALETTE = [
    {
        card: "bg-red-50 border-red-200 hover:border-red-400",
        avatar: "bg-red-200 text-red-800",
    },
    {
        card: "bg-orange-50 border-orange-200 hover:border-orange-400",
        avatar: "bg-orange-200 text-orange-800",
    },
    {
        card: "bg-amber-50 border-amber-200 hover:border-amber-400",
        avatar: "bg-amber-200 text-amber-800",
    },
    {
        card: "bg-green-50 border-green-200 hover:border-green-400",
        avatar: "bg-green-200 text-green-800",
    },
    {
        card: "bg-teal-50 border-teal-200 hover:border-teal-400",
        avatar: "bg-teal-200 text-teal-800",
    },
    {
        card: "bg-blue-50 border-blue-200 hover:border-blue-400",
        avatar: "bg-blue-200 text-blue-800",
    },
    {
        card: "bg-purple-50 border-purple-200 hover:border-purple-400",
        avatar: "bg-purple-200 text-purple-800",
    },
    {
        card: "bg-pink-50 border-pink-200 hover:border-pink-400",
        avatar: "bg-pink-200 text-pink-800",
    },
];

// Same first letter always gives the same color
const getColorByName = (name = "") => {
    const code = name.trim().charAt(0).toUpperCase().charCodeAt(0);
    if (!code || code < 65 || code > 90) return COLOR_PALETTE[0];
    return COLOR_PALETTE[(code - 65) % COLOR_PALETTE.length];
};

const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const getPageNumbers = (page, totalPages) => {
    if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = [1];
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push("...");
    pages.push(totalPages);
    return pages;
};

const GaloProposalListData = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { salesId, name, userId } = location.state || {};

    const [clients, setClients] = useState([]);
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: PAGE_LIMIT,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [page, setPage] = useState(1);

    const requestIdRef = useRef(0);

    // console.log("proposal count", clients);

    // Debounce search and go back to page 1 on a new search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search.trim());
            setPage(1);
        }, 400);
        return () => clearTimeout(timer);
    }, [search]);

    const getAllCreatedProposals = async () => {
        const requestId = ++requestIdRef.current;
        try {
            setLoading(true);
            setError("");

            const params = new URLSearchParams({
                page: String(page),
                limit: String(PAGE_LIMIT),
            });
            if (debouncedSearch) params.append("search", debouncedSearch);

            const response = await apiCall(
                "get",
                `/api/galoAdmin/galoSales-client/${salesId}?${params.toString()}`,
            );

            // Ignore stale responses
            if (requestId !== requestIdRef.current) return;

            const list = response?.data?.data ?? [];
            setClients(Array.isArray(list) ? list : []);

            if (response?.data?.pagination) {
                setPagination(response.data.pagination);
            }
        } catch (err) {
            if (requestId !== requestIdRef.current) return;
            console.log(
                "Error while fetching the proposal data",
                err?.response?.data?.message,
            );
            setError(err?.response?.data?.message || "Failed to load data");
        } finally {
            if (requestId === requestIdRef.current) setLoading(false);
        }
    };

    useEffect(() => {
        if (salesId) {
            getAllCreatedProposals();
        }
    }, [salesId, page, debouncedSearch]);

    const rows = useMemo(
        () =>
            clients.map((client) => {
                const customerName =
                    client.fullName || client.companyName || "Unnamed Client";
                return {
                    id: client._id,
                    customerName,
                    customerPhone: client.phone || "-",
                    companyName: client.companyName || "",
                    gstin: client.gstin || "",
                    email: client.email || "",
                    address: client.address || "",
                    createdDate: formatDate(client.createdAt),
                    color: getColorByName(customerName),
                    raw: client,
                    proposalCount: client.proposalCount || 0,
                };
            }),
        [clients],
    );

    const handleCardClick = (item) => {
        navigate("/galo/admin/show-proposal", {
            state: {
                salesId,
                clientId: item.id,
                clientName: item.customerName,
                clientPhone: item.customerPhone,
            },
        });
    };

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > pagination.totalPages) return;
        setPage(newPage);
    };

    const showingFrom =
        pagination.total === 0
            ? 0
            : (pagination.page - 1) * pagination.limit + 1;
    const showingTo = Math.min(
        pagination.page * pagination.limit,
        pagination.total,
    );

    return (
        <div className="w-full p-4 sm:p-6 mx-auto">
            <div className="bg-white border-2 border-yellow-400 rounded-2xl shadow-md shadow-yellow-300/40 p-6">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)}>
                            <MoveLeft
                                size={20}
                                className="text-gray-800 hover:text-gray-800 transition"
                            />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-black">
                                Created Proposals
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                View and manage all created proposals
                            </p>
                        </div>
                    </div>

                    {/* Sales Person Info */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                        <p className="text-xs text-gray-500">Sales Person</p>
                        <p className="font-semibold text-black">
                            {name || "All Sales Persons"}
                        </p>
                        {userId && (
                            <p className="text-xs text-gray-500">
                                ID: {userId}
                            </p>
                        )}
                    </div>
                </div>

                {/* Search */}
                <div className="flex flex-col md:flex-row gap-3 mb-5">
                    <div className="relative w-full md:w-1/2">
                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search customer / phone / company / GSTIN..."
                            className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-2.5 outline-none focus:border-yellow-400"
                        />
                    </div>
                </div>

                {/* States */}
                {loading && (
                    <div className="py-10 text-center text-sm text-gray-500">
                        Loading...
                    </div>
                )}

                {!loading && error && (
                    <div className="py-10 text-center text-sm text-red-500">
                        {error}
                    </div>
                )}

                {!loading && !error && rows.length === 0 && (
                    <div className="py-10 text-center text-sm text-gray-500">
                        No data found
                    </div>
                )}

                {/* Cards */}
                {!loading && !error && rows.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {rows.map((item) => (
                            <div
                                key={item.id}
                                role="button"
                                tabIndex={0}
                                onClick={() => handleCardClick(item)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        handleCardClick(item);
                                    }
                                }}
                                className={`border rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col cursor-pointer focus:outline-none ${item.color.card}`}
                            >
                                {/* Card Header */}
                                <div className="flex items-start gap-3 mb-3">
                                    <div
                                        className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-bold ${item.color.avatar}`}
                                    >
                                        {item.customerName
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-semibold text-black truncate">
                                            {item.customerName}
                                        </p>
                                        <p className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                                            <Phone size={12} />
                                            {item.customerPhone}
                                        </p>
                                    </div>
                                    <ChevronRight
                                        size={18}
                                        className="text-gray-400 shrink-0 mt-2"
                                    />
                                </div>

                                {/* Card Details */}
                                <div className="space-y-2 text-sm text-gray-700 flex-1">
                                    {item.companyName && (
                                        <p className="flex items-center gap-2">
                                            <Building2
                                                size={14}
                                                className="text-gray-400 shrink-0"
                                            />
                                            <span className="truncate">
                                                {item.companyName}
                                            </span>
                                        </p>
                                    )}

                                    {item.gstin && (
                                        <p className="flex items-center gap-2">
                                            <FileText
                                                size={14}
                                                className="text-gray-400 shrink-0"
                                            />
                                            <span className="truncate">
                                                {item.gstin}
                                            </span>
                                        </p>
                                    )}

                                    {item.email && (
                                        <p className="flex items-center gap-2">
                                            <Mail
                                                size={14}
                                                className="text-gray-400 shrink-0"
                                            />
                                            <span className="truncate">
                                                {item.email}
                                            </span>
                                        </p>
                                    )}

                                    {item.address && (
                                        <p className="flex items-center gap-2">
                                            <MapPin
                                                size={14}
                                                className="text-gray-400 shrink-0"
                                            />
                                            <span className="truncate">
                                                {item.address}
                                            </span>
                                        </p>
                                    )}
                                </div>

                                {/* Card Footer */}
                                <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between">
                                    <p className="flex items-center gap-1 text-xs text-gray-500">
                                        <Calendar size={12} />
                                        {item.createdDate}
                                    </p>

                                    <p className="flex items-center gap-1 text-xs text-gray-500">
                                        <FileText size={12} />
                                        Proposal : <span className="font-bold text-red-700">{item.proposalCount}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {!error && pagination.total > 0 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-500">
                            Showing {showingFrom}-{showingTo} of{" "}
                            {pagination.total}
                        </p>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => handlePageChange(page - 1)}
                                disabled={!pagination.hasPrevPage || loading}
                                className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-yellow-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                            >
                                <ChevronLeft size={16} />
                            </button>

                            {getPageNumbers(page, pagination.totalPages).map(
                                (p, idx) =>
                                    p === "..." ? (
                                        <span
                                            key={`dots-${idx}`}
                                            className="px-2 text-gray-400"
                                        >
                                            ...
                                        </span>
                                    ) : (
                                        <button
                                            key={p}
                                            onClick={() => handlePageChange(p)}
                                            disabled={loading}
                                            className={`min-w-9 h-9 px-2 rounded-lg text-sm font-medium border transition ${
                                                p === page
                                                    ? "bg-yellow-400 border-yellow-400 text-black"
                                                    : "border-gray-300 text-gray-700 hover:bg-yellow-50"
                                            }`}
                                        >
                                            {p}
                                        </button>
                                    ),
                            )}

                            <button
                                onClick={() => handlePageChange(page + 1)}
                                disabled={!pagination.hasNextPage || loading}
                                className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-yellow-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GaloProposalListData;
