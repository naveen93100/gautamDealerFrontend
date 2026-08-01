// import { useEffect, useState } from "react";
// import {
//     FiSearch,
//     FiUserPlus,
//     FiEdit2,
//     FiPhone,
//     FiMail,
//     FiBriefcase,
//     FiHash,
//     FiArrowRight,
// } from "react-icons/fi";
// import { useAuth } from "../../Context/AuthContext";
// import CreateGaloSalesClient from "./CreateGaloSalesClient";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const getInitial = (name = "") => name.charAt(0).toUpperCase();

// const AVATAR_COLORS = [
//     "bg-[#FDC700] text-[#1a1a1a]",
//     "bg-[#1a1a1a] text-[#FDC700]",
//     "bg-[#B38F00] text-white",
// ];

// const ClientCard = ({ client, index, onEdit, onView }) => (
//     <div className="bg-white border border-[#E8DDA0] rounded-2xl p-5 flex flex-col">
//         <div className="flex items-start justify-between mb-4">
//             <div className="flex items-center gap-3">
//                 <div
//                     className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}
//                 >
//                     {getInitial(client.fullName)}
//                 </div>
//                 <div>
//                     <p className="font-bold text-[#1a1a1a] leading-tight">
//                         {client.fullName}
//                     </p>
//                     <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider bg-[#FFFCF0] text-[#B38F00] border border-[#E8DDA0] px-2 py-0.5 rounded-full">
//                         Client
//                     </span>
//                 </div>
//             </div>
//             <button
//                 onClick={() => onEdit(client)}
//                 className="flex items-center gap-1 text-xs font-semibold text-[#B38F00] border border-[#E8DDA0] px-3 py-1.5 rounded-lg hover:bg-[#FFFCF0] transition-colors cursor-pointer"
//             >
//                 <FiEdit2 size={12} />
//                 Edit
//             </button>
//         </div>

//         <div className="space-y-2 text-sm text-gray-600 flex-1">
//             {client.email && (
//                 <div className="flex items-center gap-2">
//                     <FiMail className="text-[#B38F00] shrink-0" size={14} />
//                     <span className="truncate">{client.email}</span>
//                 </div>
//             )}
//             {client.phone && (
//                 <div className="flex items-center gap-2">
//                     <FiPhone className="text-[#B38F00] shrink-0" size={14} />
//                     <span>{client.phone}</span>
//                 </div>
//             )}
//             {client.company && (
//                 <div className="flex items-center gap-2">
//                     <FiBriefcase
//                         className="text-[#B38F00] shrink-0"
//                         size={14}
//                     />
//                     <span className="truncate">{client.company}</span>
//                 </div>
//             )}
//             {client.gstin && (
//                 <div className="flex items-center gap-2">
//                     <FiHash className="text-[#B38F00] shrink-0" size={14} />
//                     <span>{client.gstin}</span>
//                 </div>
//             )}
//         </div>

//         <button
//             onClick={() => onView(client)}
//             className="mt-4 self-end flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-[#1a1a1a] transition-colors cursor-pointer"
//         >
//             View
//             <FiArrowRight size={12} />
//         </button>
//     </div>
// );

// const GaloDashboard = () => {
//     const { user, logout } = useAuth();
//     const [clients, setClients] = useState([]);
//     const [search, setSearch] = useState("");
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [editingClient, setEditingClient] = useState(null);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchClients = async () => {
//             setLoading(true);
//             try {
//                 const res = await axios.get(
//                     `${import.meta.env.VITE_SERVER_ADDRESS}/api/galoSales/get-galoclient/${user._id}`,
//                     { withCredentials: true },
//                 );
//                 console.log(res.data);
//                 if (res?.data?.success) setClients(res.data.sales);
//             } catch (er) {
//                 console.log("error fetching clients", er);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchClients();
//     }, [user?._id]);

//     const filteredClients = clients.filter((c) =>
//         [c.fullName, c.company, c.phone, c.email]
//             .filter(Boolean)
//             .join(" ")
//             .toLowerCase()
//             .includes(search.toLowerCase()),
//     );

//     const handleCreated = (newClient) => {
//         // TODO: replace with the client returned from the create API response
//         setClients((prev) => [
//             ...prev,
//             { id: Date.now().toString(), ...newClient },
//         ]);
//         setIsModalOpen(false);
//     };

//     const handleEdit = (client) => {
//         console.log(client)
//         setEditingClient(client);
//         setIsEditModalOpen(true);
//     };
//     const handleUpdate = (updatedClient) => {
//         // Update the clients list with the new data
//         setClients((prev) =>
//             prev.map((c) => (c._id === updatedClient._id ? updatedClient : c)),
//         );
//         setIsEditModalOpen(false);
//         setEditingClient(null);
//     };

//     const handleView = (client) => {
//         // TODO: wire up view/navigate flow
//         console.log("view", client);
//     };

//     return (
//         <div className="min-h-screen bg-[#FFFCF0]">
//             {/* Top bar */}
//             <header className="bg-[#FDC700] border-b border-[#E8B800] px-6 py-4 flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                     <div className="w-9 h-9 rounded-lg bg-white border border-black/10 flex items-center justify-center">
//                         <span className="text-lg font-extrabold text-[#1a1a1a]">
//                             G
//                         </span>
//                     </div>
//                     <div>
//                         <p className="font-extrabold text-[#1a1a1a] tracking-tight leading-tight">
//                             Welcome Sales Dashboard
//                         </p>
//                         <p className="text-[11px] text-[#1a1a1a]/60 font-semibold">
//                             Powered by Galo Solar
//                         </p>
//                     </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                     <span className="hidden sm:block text-sm font-bold text-[#1a1a1a] bg-white/40 px-3 py-1.5 rounded-lg border border-black/10">
//                         {user?.name || "Sales"}
//                     </span>
//                     <button
//                         onClick={logout}
//                         className="flex items-center gap-1.5 text-sm font-bold text-[#FDC700] bg-[#1a1a1a] px-4 py-2 rounded-lg hover:bg-[#000] transition-colors cursor-pointer"
//                     >
//                         Logout
//                     </button>
//                 </div>
//             </header>

//             {/* Content */}
//             <main className="p-6 max-w-6xl mx-auto">
//                 {/* Search + Create bar */}
//                 <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white border border-[#E8DDA0] rounded-2xl p-4 mb-6">
//                     <div className="flex-1 flex items-center gap-2 bg-[#FFFCF0] border border-[#E8DDA0] rounded-xl px-4 py-2.5">
//                         <FiSearch className="text-gray-400" />
//                         <input
//                             type="text"
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                             placeholder="Search clients..."
//                             className="w-full bg-transparent text-sm focus:outline-none"
//                         />
//                     </div>
//                     <button
//                         onClick={() => setIsModalOpen(true)}
//                         className="flex items-center justify-center gap-2 bg-[#FDC700] text-[#1a1a1a] font-bold text-sm px-5 py-2.5 rounded-xl border border-[#E8B800] hover:bg-[#f0bd00] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
//                     >
//                         <FiUserPlus />
//                         Create Sales Client
//                     </button>
//                 </div>

//                 {/* Client grid */}
//                 {loading ? (
//                     <p className="text-center text-gray-500 text-sm py-10">
//                         Loading clients...
//                     </p>
//                 ) : filteredClients.length === 0 ? (
//                     <p className="text-center text-gray-500 text-sm py-10">
//                         No clients found.
//                     </p>
//                 ) : (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//                         {filteredClients.map((client, index) => (
//                             <ClientCard
//                                 key={client._id}
//                                 client={client}
//                                 index={index}
//                                 onEdit={handleEdit}
//                                 onView={handleView}
//                             />
//                         ))}
//                     </div>
//                 )}
//             </main>

//             <CreateGaloSalesClient
//                 isOpen={isModalOpen}
//                 onClose={() => {
//                     setIsEditModalOpen(false);
//                     setEditingClient(null);
//                 }}
//                 onCreate={handleCreated}
//                 editData={editingClient}
//                 onUpdate={handleUpdate}
//             />
//         </div>
//     );
// };

// export default GaloDashboard;

import { useEffect, useState } from "react";
import {
    FiSearch,
    FiUserPlus,
    FiEdit2,
    FiPhone,
    FiMail,
    FiBriefcase,
    FiHash,
    FiArrowRight,
} from "react-icons/fi";
import { useAuth } from "../../Context/AuthContext";
import CreateGaloSalesClient from "./CreateGaloSalesClient";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const getInitial = (name = "") => name.charAt(0, 1).toUpperCase();

const getInitial = (name = "") => {
    if (!name?.trim()) return "N/A";

    return name
        .trim()
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase();
};
const AVATAR_COLORS = [
    "bg-[#FDC700] text-[#1a1a1a]",
    "bg-[#1a1a1a] text-[#FDC700]",
    "bg-[#B38F00] text-white",
];

const ClientCard = ({ client, index, onEdit, onView }) => (
    <div className="bg-white border border-[#E8DDA0] rounded-2xl p-5 flex flex-col">
        <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
                <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}
                >
                    {getInitial(client.fullName)}
                </div>
                <div>
                    <p className="font-bold text-[#1a1a1a] leading-tight">
                        {client.fullName}
                    </p>
                    <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider bg-[#FFFCF0] text-[#B38F00] border border-[#E8DDA0] px-2 py-0.5 rounded-full">
                        Client
                    </span>
                </div>
            </div>
            <button
                onClick={() => onEdit(client)}
                className="flex items-center gap-1 text-xs font-semibold text-[#B38F00] border border-[#E8DDA0] px-3 py-1.5 rounded-lg hover:bg-[#FFFCF0] transition-colors cursor-pointer"
            >
                <FiEdit2 size={12} />
                Edit
            </button>
        </div>

        <div className="space-y-2 text-sm text-gray-600 flex-1">
            {client.email && (
                <div className="flex items-center gap-2">
                    <FiMail className="text-[#B38F00] shrink-0" size={14} />
                    <span className="truncate">{client.email}</span>
                </div>
            )}
            {client.phone && (
                <div className="flex items-center gap-2">
                    <FiPhone className="text-[#B38F00] shrink-0" size={14} />
                    <span>{client.phone}</span>
                </div>
            )}
            {client.companyName && ( // <-- fixed: use companyName, not company
                <div className="flex items-center gap-2">
                    <FiBriefcase
                        className="text-[#B38F00] shrink-0"
                        size={14}
                    />
                    <span className="truncate">{client.companyName}</span>
                </div>
            )}
            {client.gstin && (
                <div className="flex items-center gap-2">
                    <FiHash className="text-[#B38F00] shrink-0" size={14} />
                    <span>{client.gstin}</span>
                </div>
            )}
        </div>

        <button
            onClick={() => onView(client)}
            className="mt-4 self-end flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-[#1a1a1a] transition-colors cursor-pointer"
        >
            View
            <FiArrowRight size={12} />
        </button>
    </div>
);

const GaloDashboard = () => {
    const { user, logout } = useAuth();
    const [clients, setClients] = useState([]);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false); // single modal state
    const [loading, setLoading] = useState(false);
    const [editingClient, setEditingClient] = useState(null); // null = create mode

    const navigate = useNavigate();

    useEffect(() => {
        const fetchClients = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_ADDRESS}/api/galoSales/get-galoclient/${user._id}`,
                    { withCredentials: true },
                );
                if (res?.data?.success) setClients(res.data.sales);
            } catch (er) {
                console.log("error fetching clients", er);
            } finally {
                setLoading(false);
            }
        };
        fetchClients();
    }, [user?._id]);

    const filteredClients = clients.filter((c) =>
        [c.fullName, c.companyName, c.phone, c.email]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase()),
    );

    // ---- Create ----
    const handleCreateClick = () => {
        setEditingClient(null); // ensure we're in create mode
        setIsModalOpen(true);
    };

    const handleCreated = (newClient) => {
        setClients((prev) => [...prev, newClient]);
        setIsModalOpen(false);
        setEditingClient(null);
    };

    // ---- Edit ----
    const handleEdit = (client) => {
        setEditingClient(client); // set the client to edit
        setIsModalOpen(true);
    };

    const handleUpdate = (updatedClient) => {
        setClients((prev) =>
            prev.map((c) => (c._id === updatedClient._id ? updatedClient : c)),
        );
        setIsModalOpen(false);
        setEditingClient(null);
    };

    // ---- View (placeholder) ----
    const handleView = (client) => {
        console.log("view", client);
        // navigate to client proposals, etc.
        navigate("/galo/galo-panel-history",{state:{clientId:client?._id}});
    };

    // ---- Modal close ----
    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingClient(null);
    };

    return (
        <div className="min-h-screen bg-[#FFFCF0]">
            {/* Content */}
            <main className="p-6 max-w-6xl mx-auto">
                {/* Search + Create bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white border border-[#E8DDA0] rounded-2xl p-4 mb-6">
                    <div className="flex-1 flex items-center gap-2 bg-[#FFFCF0] border border-[#E8DDA0] rounded-xl px-4 py-2.5">
                        <FiSearch className="text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search clients..."
                            className="w-full bg-transparent text-sm focus:outline-none"
                        />
                    </div>
                    <button
                        onClick={handleCreateClick} // <-- open create modal
                        className="flex items-center justify-center gap-2 bg-[#FDC700] text-[#1a1a1a] font-bold text-sm px-5 py-2.5 rounded-xl border border-[#E8B800] hover:bg-[#f0bd00] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
                    >
                        <FiUserPlus />
                        Create Sales Client
                    </button>
                </div>

                {/* Client grid */}
                {loading ? (
                    <p className="text-center text-gray-500 text-sm py-10">
                        Loading clients...
                    </p>
                ) : filteredClients.length === 0 ? (
                    <p className="text-center text-gray-500 text-sm py-10">
                        No clients found.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredClients.map((client, index) => (
                            <ClientCard
                                key={client._id}
                                client={client}
                                index={index}
                                onEdit={handleEdit} // opens edit modal
                                onView={handleView}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* Single modal for both create and edit */}
            <CreateGaloSalesClient
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onCreate={handleCreated}
                onUpdate={handleUpdate}
                editData={editingClient} // if null, modal uses create mode
            />
        </div>
    );
};

export default GaloDashboard;
