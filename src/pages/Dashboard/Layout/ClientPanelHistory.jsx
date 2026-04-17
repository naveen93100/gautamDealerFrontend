import React, { useCallback, useEffect, useState } from "react";
import {
    Plus,
    Download,
    Calendar,
    DollarSign,
    Zap,
    TrendingUp,
    Sun,
    Loader2Icon,
    MapPin,
    Mail,
    Phone,
    IndianRupee,
    Edit,
    User,
    FileText,
    CalendarDays,
    Trash2,
    Pencil,
    ChevronDown,
    PanelsTopLeft,
} from "lucide-react";
import { data, useLocation, useNavigate } from "react-router-dom";
import CreateProposalModal from "../../../components/Ui/CreateProposalModal";
import toast from 'react-hot-toast';
import { apiCall } from "../../../services/api";
import { useAuth } from "../../../Context/AuthContext";
import MainPage from "../../../components/common/MainPage";
import CreatePannelPropsal from "../../../components/Ui/createPannelPropsal";
const ClientPanelHistory = () => {
    const [proposals, setProposals] = useState([]);
    const location = useLocation();
    const { clientId: customerId } = location.state;
    const { user, token } = useAuth();

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [select, setSelect] = useState(null);
    const [printP, setPrintP] = useState(false);
    const [proposalsImages, setProposalsImages] = useState([]);
    const [proposalData, setProposalData] = useState(null);
    const [createPanelProp, setCreatePanelProp] = useState(false);
    const [createEmpPanel, setCreateEmpPanel] = useState(false);
    const navigate = useNavigate();

    const bgColor = "#a20000";
    const [filter, setFilter] = useState("all");

    const allProposals = [
        ...(proposals?.proposalsData || []).map((p) => ({
            ...p,
            type: "powerplant",
        })),
        ...(proposals?.panelData || []).map((p) => ({
            ...p,
            type: "solarpanel",
        })),
    ];

    const filtered =
        filter === "all"
            ? allProposals
            : allProposals.filter((p) => p.type === filter);

    const fetchProposal = useCallback(async () => {
        try {
            let res = await apiCall(
                "GET",
                `/api/dealer/get-proposal?dealerId=${user?.id}&customerId=${customerId}`,
            );

            if (res?.data?.success) {
                setProposalsImages(res?.data?.images);
                setProposals(res?.data?.data);
            }
        } catch (er) {
            console.log("Somthing is worng", er);
        }
    }, [user?.id]);

    useEffect(() => {
        if (user?.id) {
            fetchProposal();
        }
    }, [user?.id]);

    const customFunc = (proposal) => {
        setProposalData(proposal);

        const originalTitle = document.title;
        document.title = `${proposal?.name}_Proposal`;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                window.print();
                setTimeout(() => {
                    document.title = originalTitle;
                }, 500);
            });
        });
    };

    // const hangedeleteProposal = async (item) => {
    //     const payload = {
    //         type: item?.type,
    //         proposalId: item._id,
    //     };

    //     const res = await apiCall(
    //         "DELETE",
    //         `/api/dealer/delete-proposal`,
    //         payload,
    //     );

    //     console.log("showing the response for deleteing the proposal", res?.data)

    //     try {
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const hangedeleteProposal = async (item) => {
  const payload = {
    type: item?.type,
    proposalId: item?._id,
  };

  const toastId = toast.loading("Deleting proposal...");

  try {
    const res = await apiCall(
      "DELETE",
      "/api/dealer/delete-proposal",
      payload
    );

    if (res?.data?.success) {
      toast.success("Proposal deleted successfully ✅", {
        id: toastId,
      });
    } else {
      toast.error("Failed to delete proposal ❌", {
        id: toastId,
      });
    }

  } catch (error) {
    console.log(error);

    toast.error("Something went wrong ❌", {
      id: toastId,
    });
  }
};

  

    return (
        <>
            <div
                className={`fixed top-0 left-0 w-full z-50 dont-print bg-linear-to-r bg-[${bgColor}] text-white shadow-xl border-b border-red-400`}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
                    {/* Left Side */}
                    <div>
                        <h1 className="text-2xl font-bold tracking-wide">
                            Client Panel Proposal
                        </h1>
                        <p className="text-sm text-red-100 mt-1">
                            Proposal Summary & Details
                        </p>
                    </div>

                    {/* Right Side */}
                    <div className="bg-white/10 backdrop-blur-md px-5 py-2 rounded-xl border border-white/20">
                        <p className="text-sm text-red-100">Client Name</p>
                        <p className="text-lg font-semibold capitalize">
                            {proposals?.name || "N/A"}
                        </p>
                    </div>
                </div>
            </div>

            <div className=" mt-20 dont-print min-h-screen bg-linear-to-br from-red-50 via-orange-50 to-white">
                <div className="max-w-7.2xl  mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8 border border-gray-300 shadow-gray-400">
                        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
                            {/* Left Side Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                                <button
                                    onClick={() => {
                                        setSelect(null);
                                        setCreatePanelProp(true);
                                    }}
                                    className={`flex items-center justify-center gap-2 px-5 py-3 bg-[${bgColor}] text-white rounded-xl hover:bg-red-700 transition shadow-md w-full sm:w-auto`}
                                >
                                    <Plus className="w-5 h-5" />
                                    Create Panel Proposal
                                </button>

                                <button
                                    onClick={() => {
                                        setSelect(null);
                                        setShowCreateModal(true);
                                    }}
                                    className={`flex items-center justify-center gap-2 px-5 py-3 bg-[${bgColor}] text-white rounded-xl hover:bg-red-700 transition shadow-md w-full sm:w-auto`}
                                >
                                    <Plus className="w-5 h-5" />
                                    Create Power Plant Proposal
                                </button>
                            </div>

                            {/* Right Side Dropdown */}
                            <div className="w-full lg:w-80">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Select Proposal Type
                                </label>

                                <div className="relative">
                                    <select
                                        value={filter}
                                        onChange={(e) =>
                                            setFilter(e.target.value)
                                        }
                                        className="w-full appearance-none px-4 py-3 pr-10 rounded-xl border border-gray-300 bg-white text-gray-800 text-sm font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer"
                                    >
                                        <option value="all">
                                            All Proposals
                                        </option>
                                        <option value="powerplant">
                                            Power Plant Proposal
                                        </option>
                                        <option value="solarpanel">
                                            Panel Proposal
                                        </option>
                                    </select>

                                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
                                        <ChevronDown className="w-4 h-4 text-gray-500" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                            {/* Power Plant Count - hide when panel filter selected */}
                            {filter !== "solarpanel" && (
                                <div
                                    className={`relative overflow-hidden bg-linear-to-r bg-[${bgColor}] rounded-2xl shadow-lg px-6 py-5 text-white`}
                                >
                                    <div className="absolute right-4 top-4 opacity-20">
                                        <Zap className="w-9 h-9" />
                                    </div>

                                    <p className="text-sm font-medium text-red-100">
                                        Power Plant Proposals
                                    </p>

                                    <h2 className="text-xl font-bold mt-3">
                                        {" "}
                                        {/* {proposals?.proposalsData?.length || 0} */}
                                        {filter === "panel"
                                            ? 0
                                            : proposals?.proposalsData
                                                  ?.length || 0}
                                    </h2>

                                    <p className="text-xs mt-2 text-red-100">
                                        Total Created Proposals
                                    </p>
                                </div>
                            )}

                            {/* Panel Count - hide when powerplant filter selected */}
                            {filter !== "powerplant" && (
                                <div
                                    className={`relative overflow-hidden bg-linear-to-br bg-[${bgColor}] rounded-2xl shadow-lg px-6 py-5 text-white`}
                                >
                                    <div className="absolute right-4 top-4 opacity-20">
                                        <PanelsTopLeft className="w-9 h-9" />
                                    </div>

                                    <p className="text-sm font-medium text-red-100">
                                        Panel Proposals
                                    </p>

                                    <h2 className="text-3xl font-bold mt-3">
                                        {" "}
                                        {/* {proposals?.panelData?.length || 0} */}
                                        {filter === "powerplant"
                                            ? 0
                                            : proposals?.panelData?.length || 0}
                                    </h2>

                                    <p className="text-xs mt-2 text-red-100">
                                        Total Created Proposals
                                    </p>
                                </div>
                            )}
                        </div>

                        {filtered.map((item, index) => (
                            <div
                                key={index}
                                className="border-2 border-gray-300 my-3 rounded-xl p-4 sm:p-6 shadow-lg hover:border-red-300 transition-all shadow-red-200"
                            >
                                <div className="flex flex-col gap-4 border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-lg transition bg-white">
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                        {/* Left Side */}
                                        <div className="space-y-2">
                                            <h6 className="flex items-center gap-2 text-md font-bold text-gray-500">
                                                <FileText className="w-5 h-5 text-red-600" />
                                                Proposal Type:{" "}
                                                <span className="text-gray-700 text-sm">
                                                    {item.type === "powerplant"
                                                        ? "Power Plant Proposal"
                                                        : "Panel Proposal"}
                                                </span>
                                            </h6>
                                            <p className="flex items-center gap-2 text-sm text-gray-500">
                                                <CalendarDays className="w-4 h-4 text-gray-400" />
                                                Date:{" "}
                                                {new Date(
                                                    item?.createdAt,
                                                ).toLocaleString()}
                                            </p>
                                        </div>

                                        {/* Right Side Buttons */}
                                        <div className="flex flex-wrap gap-3">
                                            <button
                                                onClick={() =>
                                                    hangedeleteProposal(item)
                                                }
                                                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500 text-red-600 hover:bg-red-50 transition text-sm font-medium"
                                            >
                                                <Trash2 className="w-4 h-4" />{" "}
                                                Delete
                                            </button>
                                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-500 text-amber-600 hover:bg-amber-50 transition text-sm font-medium">
                                                <Pencil className="w-4 h-4" />{" "}
                                                Edit
                                            </button>
                                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 transition text-sm font-medium">
                                                <Download className="w-4 h-4" />{" "}
                                                Download
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {showCreateModal && (
                    <CreateProposalModal
                        setClose={setShowCreateModal}
                        proposalData={fetchProposal}
                        data={select}
                        setData={setSelect}
                        customerId={customerId}
                    />
                )}

                {createPanelProp && (
                    <CreatePannelPropsal
                        onClose={setCreatePanelProp}
                        proposalData={fetchProposal}
                        data={select}
                        setData={setSelect}
                        customerId={customerId}
                    />
                )}
            </div>

            {proposalData && (
                <div id="PrintData" className="print-this hidden print:block">
                    <MainPage
                        proposalsImages={proposalsImages}
                        proposalDatas={proposalData}
                        printP={printP}
                    />
                </div>
            )}
        </>
    );
};

export default ClientPanelHistory;
