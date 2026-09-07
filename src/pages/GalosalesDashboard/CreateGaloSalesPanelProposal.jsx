import {
    IndianRupee,
    Mail,
    MessageCircle,
    Phone,
    Sun,
    User,
    X,
} from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { apiCall } from "../../services/api";
import GaloSalesPanelSelector from "./GaloSalesPanelSelector";
import JoditEditor from "jodit-react";
import { useAuth } from "../../Context/AuthContext";
import {
    useCreateGaloSalesClientProposal,
    useUpdateGaloSalesClientProposal,
} from "../../hooks/useGaloSalesMethods";

const CreateGaloSalesPanelProposal = ({
    onClose,
    data = null,
    setData,
    clientId,
}) => {
    const { loginType, user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [panelData, setPanelData] = useState();
    const [technologyData, setTechnologyData] = useState();
    const [constructiveData, setConstructiveData] = useState();
    const [panelWatt, setPanelWatt] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [createPanelData, setCreatePanelData] = useState({
        customerName: "",
        gst: 8.9,
    });

    const [inverters, setInverters] = useState([]);

    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const salesId = userData?._id;

    const [selectPanel, setSelectPanel] = useState([
        {
            panelId: "",
            technologyId: "",
            constructiveId: "",
            wattId: "",
            inverterId: "",
            // quantity: 1,
            // rate: 1,
            totalPrice: 0,
            gstAmount: 0,
            setupKw: 0,
        },
    ]);

    const joditConfig = useMemo(
        () => ({
            readonly: false,
            height: 400,
            resize: true,
            uploader: {
                insertImageAsBase64URI: true,
            },
            toolbarAdaptive: false,
            buttons:
                "bold,italic,underline,|,ul,ol,|,table,link,image,|,align,left,center,right,justify,|,brush,eraser,|,paragraph,fontsize,|,undo,redo",
            allowHTML: true,
            useClasses: true,
        }),
        [],
    );

    const [company, setCompany] = useState("GSPL");

    const bankDetails = {
        GSPL: {
            beneficiary: "Gautam Solar Pvt. Ltd.",
            bank: "Axis Bank Ltd.",
            account: "925030038328269",
            ifsc: "UTIB0001609",
            branch: "Okhla Phase-1, New Delhi - 110020",
        },
        GSIPL: {
            beneficiary: "Gautam Solar Industries Private Limited",
            bank: "ICICI Bank Limited",
            account: "071605004868",
            ifsc: "ICIC0000716",
            branch: "Okhla Phase-1, New Delhi - 110020",
        },
    };

    const bank = bankDetails[company];

const [Body, setBody] = useState(`
<div style="
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #111;
">

  <div style="margin: 0; padding: 0;">

    <div style="display: flex; margin-bottom: 28px;">
      <span style="min-width: 24px; font-weight: bold;">1.</span>
      <span>
        <strong>Design Changes:</strong>
        Quote is based on a standard plant design; deviations may include additional costs.
      </span>
    </div>

    <div style="display: flex; margin-bottom: 28px;">
      <span style="min-width: 24px; font-weight: bold;">2.</span>
      <span>
        <strong>Validity & Cancellation:</strong>
        Quote valid for 15 days; order cancellation will result in a 30% deduction from the token money.
      </span>
    </div>

    <div style="display: flex; margin-bottom: 28px;">
      <span style="min-width: 24px; font-weight: bold;">3.</span>
      <span>
        <strong>Data Monitoring:</strong>
        Included in the price; internet connectivity must be provided by the customer.
      </span>
    </div>

    <div style="display: flex;">
      <span style="min-width: 24px; font-weight: bold;">4.</span>
      <span>
        <strong>Data Synchronization:</strong>
        Synchronization with a DG set is chargeable at actual costs.
      </span>
    </div>

  </div>

</div>
`);
    const handleClose = () => {
        setCreatePanelData({ gst: 8.9 });
        setSelectPanel([
            {
                panelId: "",
                technologyId: "",
                constructiveId: "",
                wattId: "",
                inverterId: "",
                // quantity: 1,
                // rate: 1,
                subsidyAmount: 0,
                totalPrice: 0,
                gstAmount: 0,
                setupKw: 0,
            },
        ]);
        onClose(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (e.target.value >= 0) {
            setCreatePanelData((prev) => ({ ...prev, [name]: value }));
        }
    };

    useEffect(() => {
        if (!data) return;
        setSelectPanel(
            data?.selectedPanels.map((item) => ({
                constructiveId: item?.constructiveId?._id,
                panelId: item?.panelId?._id,
                // quantity: item?.quantity,
                // rate: item?.rate,
                inverterId: item?.inverterId,
                subsidyAmount: item?.subsidyAmount,
                gstAmount: item?.gstAmount,
                technologyId: item?.technologyId?._id,
                totalPrice: item?.totalPrice,
                wattId: item?.wattId?._id,
                setupKw: data?.setupKw,
            })),
        );
        setCreatePanelData((p) => ({ ...p, gst: data?.gst }));
        setPanelData(data?.selectedPanels);
    }, [data]);

    useEffect(() => {
        const fetchPanel = async () => {
            toast.dismiss();
            try {
                const apiData = await apiCall(
                    "get",
                    "/api/galoAdmin/panel",
                    {},
                    {
                        params: { isActive: true },
                    },
                );
                setPanelData(apiData?.data?.data);
            } catch (error) {
                toast.error(error?.response?.data?.message || error?.message);
            }
        };
        fetchPanel();
    }, []);

    useEffect(() => {
        if (!selectPanel[activeIndex]?.panelId) return;
        apiCall(
            "get",
            "/api/galoAdmin/technology",
            {},
            {
                params: {
                    panelId: selectPanel[activeIndex].panelId,
                    isActive: true,
                },
            },
        ).then((res) => setTechnologyData(res?.data?.data));
    }, [selectPanel[activeIndex]?.panelId]);

    useEffect(() => {
        if (!selectPanel[activeIndex]?.technologyId) return;
        apiCall(
            "get",
            "/api/galoAdmin/constructive",
            {},
            {
                params: {
                    technologyId: selectPanel[activeIndex].technologyId,
                    isActive: true,
                },
            },
        ).then((res) => setConstructiveData(res?.data?.data));
    }, [selectPanel[activeIndex]?.technologyId]);

    useEffect(() => {
        if (!selectPanel[activeIndex]?.constructiveId) return;
        apiCall(
            "get",
            "/api/galoAdmin/panel-watt",
            {},
            {
                params: {
                    constructiveId: selectPanel[activeIndex].constructiveId,
                    isActive: true,
                },
            },
        ).then((res) => setPanelWatt(res?.data?.data));
    }, [selectPanel[activeIndex]?.constructiveId]);

    const { mutate: createGaloSalesClientProposal } =
        useCreateGaloSalesClientProposal(clientId);
    const { mutate: updateGaloSalesClientProposal } =
        useUpdateGaloSalesClientProposal(clientId);

    const handleSubmit = async (e) => {
        toast.dismiss();
        e.preventDefault();
        try {
            let payload = {};
            let flag = true;
            console.log(selectPanel);

            if (data) {
                let { setupKw, inverterId, ...rest } = selectPanel[0];
                payload = {
                    selectedPanels: [{ ...rest, inverterId: inverterId?._id }],
                    termsAndConditions: Body,
                    ...createPanelData,
                    propId: data?._id,
                    setupKw: Number(setupKw),
                };
            } else {
                let { setupKw, ...rest } = selectPanel[0];
                payload = {
                    selectedPanels: [rest],
                    termsAndConditions: Body,
                    gst: createPanelData?.gst,
                    salesId,
                    customerId: clientId,
                    setupKw: Number(setupKw),
                };
                console.log(payload);
            }

            if (!payload?.gst) {
                return alert("Fields are required: GST.");
            }

            selectPanel.map((panel) => {
                if (
                    !panel?.panelId ||
                    !panel?.technologyId ||
                    !panel?.constructiveId ||
                    !panel?.wattId
                    // !panel?.rate
                ) {
                    flag = false;
                    return alert(
                        "Please fill in all panel details: Panel Type, Technology, Constructive Type, Panel Watt",
                    );
                }
            });

            if (!flag) {
                return;
            }

            let mutationFn = data
                ? updateGaloSalesClientProposal
                : createGaloSalesClientProposal;

            mutationFn(payload, {
                onSuccess: (d) => {
                    console.log("this is running");
                    toast.success(d?.message);
                    onClose(false);
                },
                onError: (e) => {
                    console.log(e);
                    let er = e || [];
                    toast.error(
                        <div>
                            <strong>Please fix the following:</strong>
                            <ul className="mt-1">
                                {er.map((err, i) => (
                                    <li key={i} className="capitalize text-sm">
                                        • {err.message}
                                    </li>
                                ))}
                            </ul>
                        </div>,
                    );
                },
            });
        } catch (error) {
            let er = error?.response?.data?.message || [];
            toast.error(
                <div>
                    <strong>Please fix the following:</strong>
                    <ul className="mt-1">
                        {er.map((err, i) => (
                            <li key={i} className="capitalize text-sm">
                                • {err.message}
                            </li>
                        ))}
                    </ul>
                </div>,
            );
        }
    };

    useEffect(() => {
        const fetchInverter = async () => {
            try {
                let res = await apiCall("GET", "/api/galoAdmin/inverter");
                console.log(res);
                if (res?.data?.success) {
                    setInverters(res?.data?.data);
                }
            } catch (er) {
                console.log(er);
            }
        };
        fetchInverter();
    }, []);

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full min-h-[90vh] overflow-hidden">
                {/* ===== Header – Galo Theme ===== */}
                <div className="bg-black p-4 text-white relative border-b-2 border-yellow-400">
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-2 hover:bg-yellow-400/20 rounded-full transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="w-16 bg-yellow-400 rounded-2xl flex items-center justify-center">
                            <Sun className="w-8 h-8 text-black" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">
                                {!data || data?.panelData?.length === 0
                                    ? "Create"
                                    : "Update"}{" "}
                                Solar Panel Proposal
                            </h2>
                            <p className="text-gray-300 text-sm mt-1">
                                {!data || data?.panelData?.length === 0
                                    ? "Create"
                                    : "Update"}{" "}
                                a detailed panel proposal for your customer
                            </p>
                        </div>
                    </div>
                </div>

                <form>
                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-50px)]">
                        {/* Panel Selector */}
                        <GaloSalesPanelSelector
                            selectPanel={selectPanel}
                            setSelectPanel={setSelectPanel}
                            setActiveIndex={setActiveIndex}
                            panelData={panelData}
                            technologyData={technologyData}
                            constructiveData={constructiveData}
                            panelWatt={panelWatt}
                            gst={createPanelData?.gst}
                            inverters={inverters}
                        />

                        {/* GST Section */}
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <i className="fa-solid fa-coins text-yellow-600"></i>
                                <h3 className="text-lg font-semibold">
                                    Price And GST Information
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-black">
                                        GST* (%)
                                    </label>
                                    <input
                                        type="number"
                                        name="gst"
                                        value={createPanelData?.gst}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-yellow-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
                                        placeholder="GST %"
                                        min={1}
                                        onWheel={(e) => e.target.blur()}
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === "ArrowUp" ||
                                                e.key === "ArrowDown"
                                            ) {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Terms & Conditions – Galo styled */}
                        <section className="mb-6 rounded-xl border-2 border-yellow-300 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-2">
                                    <MessageCircle className="w-5 h-5 text-black" />
                                    <h3 className="text-lg font-semibold text-black">
                                        Terms & Conditions / Message
                                    </h3>
                                </div>
                            </div>

                            {/* Company Selection – yellow accent */}
                            {/* <div className="mb-5 rounded-lg border border-yellow-200 bg-gray-50 p-4">
                                <label className="block text-sm font-semibold text-black mb-3">
                                    Select Company for Bank Details
                                </label>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label
                                        className={`flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-all duration-200 ${company === "GSPL"
                                                ? "border-yellow-400 bg-yellow-50 ring-1 ring-yellow-400"
                                                : "border-gray-300 bg-white hover:border-yellow-300"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="company"
                                            value="GSPL"
                                            checked={company === "GSPL"}
                                            onChange={(e) =>
                                                setCompany(e.target.value)
                                            }
                                            className="accent-yellow-500 h-5 w-5"
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-800">
                                                Gautam Solar Pvt. Ltd.
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Axis Bank
                                            </p>
                                        </div>
                                    </label>

                                    <label
                                        className={`flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-all duration-200 ${company === "GSIPL"
                                                ? "border-yellow-400 bg-yellow-50 ring-1 ring-yellow-400"
                                                : "border-gray-300 bg-white hover:border-yellow-300"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="company"
                                            value="GSIPL"
                                            checked={company === "GSIPL"}
                                            onChange={(e) =>
                                                setCompany(e.target.value)
                                            }
                                            className="accent-yellow-500 h-5 w-5"
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-800">
                                                Gautam Solar Industries Pvt.
                                                Ltd.
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                ICICI Bank
                                            </p>
                                        </div>
                                    </label>
                                </div>
                            </div> */}

                            {/* Editor */}
                            <JoditEditor
                                key={company}
                                config={joditConfig}
                                value={Body}
                                onBlur={(d) => setBody(d)}
                            />
                        </section>

                        {/* Buttons – Galo style */}
                        <div className="items-center justify-center bg-gray-50 flex gap-3 mt-5 p-4 rounded-xl">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="sm:flex-1 p-3 border border-yellow-300 rounded-xl text-sm cursor-pointer hover:bg-yellow-50 transition"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className={`p-3 sm:flex-1 bg-black text-white rounded-xl hover:bg-gray-800 transition ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
                            >
                                {!data || data?.panelData?.length === 0
                                    ? "Create"
                                    : "Update"}{" "}
                                Proposal
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default React.memo(CreateGaloSalesPanelProposal);
