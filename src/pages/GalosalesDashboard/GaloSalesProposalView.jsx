import { ArrowLeft, Download } from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GaloPdfComp from "../../components/common/GaloPdfComp";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const GaloSalesProposalView = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    console.log("Location state:", state);
    const data = {
        email: state?.salesId?.email,
        name: state?.salesId?.name,
        phone: state?.salesId?.phone,
    };

    const customerData = {
        name: state?.customerId?.fullName,
        email: state?.customerId?.email,
        companyName: state?.customerId?.companyName,
        gstin: state?.customerId?.gstin,
        phone: state?.customerId?.phone,
        address: state?.customerId?.address,
        createdAt: state?.createdAt,
    };

    // console.log("Customer Data:", customerData);

    const pages = [
        "galo1.jpeg",
        "galo2.jpeg",
        "galo3.jpeg",
        "galo4.jpeg",
        "galo5.jpeg",
        "galo6.jpeg",
    ];

    // const handleDownload = async () => {
    //     try {
    //         setLoading(true);
    //         const elements = document.querySelectorAll(".pdf-page");
    //         const pdf = new jsPDF({
    //             orientation: "p",
    //             unit: "mm",
    //             format: "a4",
    //             compress: true,
    //         });

    //         for (let i = 0; i < elements.length; i++) {
    //             const el = elements[i];
    //             await document.fonts.ready;
    //             await new Promise((resolve) => setTimeout(resolve, 300));

    //             const canvas = await html2canvas(el, {
    //                 scale: 3,
    //                 useCORS: true,
    //                 backgroundColor: "#ffffff",
    //                 logging: false,
    //             });
    //             const imgData = canvas.toDataURL("image/jpeg", 0.9);
    //             if (i !== 0) pdf.addPage();
    //             pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
    //         }

    //         const clientName = customerData?.companyName?.trim()
    //             ? customerData.companyName.replace(/\s+/g, "_")
    //             : customerData?.name?.trim();

    //         pdf.save(`${clientName || "Proposal"}_proposal.pdf`);
    //     } catch (er) {
    //         console.log(er);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleDownload = async () => {
        try {
            setLoading(true);

            const elements = document.querySelectorAll(".pdf-page");
            setCurrentPage(0);

            const pdf = new jsPDF({
                orientation: "p",
                unit: "mm",
                format: "a4",
                compress: true,
            });

            for (let i = 0; i < elements.length; i++) {
                setCurrentPage(i + 1);

                const el = elements[i];

                await document.fonts.ready;
                await new Promise((resolve) => setTimeout(resolve, 300));

                const canvas = await html2canvas(el, {
                    scale: 3,
                    useCORS: true,
                    backgroundColor: "#ffffff",
                    logging: false,
                });

                const imgData = canvas.toDataURL("image/jpeg", 0.9);

                if (i !== 0) pdf.addPage();
                pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
            }

            const clientName = customerData?.companyName?.trim()
                ? customerData.companyName.replace(/\s+/g, "_")
                : customerData?.name?.trim();

            pdf.save(`${clientName || "Proposal"}_proposal.pdf`);
        } catch (er) {
            console.log(er);
        } finally {
            setLoading(false);
            setCurrentPage(0);
        }
    };

    const td = {
        border: "1px solid #d1d5db",
        padding: "6px",
        textAlign: "center",
    };

    return (
        <div className="flex min-h-screen flex-col gap-6  bg-gray-100">
            {/* --- Back Button --- */}
            <button
                onClick={() => navigate(-1)}
                className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-black text-white font-medium px-5 py-3 rounded-full shadow-lg hover:bg-gray-800 transition-all print:hidden"
            >
                <ArrowLeft /> Go Back
            </button>

            {/* --- Download Button --- */}
            {/* <button
                onClick={handleDownload}
                disabled={loading}
                className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full text-white transition ${
                    loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-black hover:bg-gray-800 border-2 border-yellow-400"
                }`}
            >
                {loading ? (
                    <>
                        <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                        Generating...
                    </>
                ) : (
                    <>
                        <Download className="w-5 h-5" />
                        Download
                    </>
                )}
            </button> */}

            <button
                onClick={handleDownload}
                disabled={loading}
                className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full text-white transition ${
                    loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-black hover:bg-gray-800 border-2 border-yellow-400"
                }`}
            >
                {loading ? (
                    <>
                        <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                        Generating {currentPage} /{" "}
                        {document.querySelectorAll(".pdf-page").length}
                    </>
                ) : (
                    <>
                        <Download className="w-5 h-5" />
                        Download
                    </>
                )}
            </button>

            <GaloPdfComp bg={pages[0]}>
                <div className="absolute top-[225mm] left-[90mm] w-100 text-center">
                    {state?.selectedPanels?.map((panel, idx) => (
                        <div key={idx}>
                            <h1 className="text-2xl font-bold italic text-black">
                                {state?.setupKw} KW Grid-Connected
                            </h1>

                            <h2 className="text-2xl font-bold italic text-black">
                                Solar Power Plant Proposal
                            </h2>
                        </div>
                    ))}
                </div>
            </GaloPdfComp>

            <GaloPdfComp bg={pages[1]}></GaloPdfComp>

            <GaloPdfComp bg={pages[2]}>
                <div className="absolute top-[83mm] left-[50mm] w-100 text-center">
                    {state?.selectedPanels?.map((panel, idx) => (
                        <div key={idx}>
                            <h1 className="text-2xl font-bold italic text-black">
                                {panel?.wattId?.watt}Wp
                            </h1>

                            <h2 className="text-md font-bold italic text-black">
                                {panel?.technologyId?.technologyPanel}{" "}
                                {panel?.panelId?.panelType} with{" "}
                                {panel?.constructiveId?.constructiveType}
                            </h2>
                        </div>
                    ))}
                </div>

                <div className="absolute left-[1mm] top-[257mm] w-[208mm] flex justify-between items-center px-[4mm]">
                    {/* Left Ribbon */}
                    <div className="w-[88mm] text-center flex items-center justify-center">
                        {state?.selectedPanels?.map((panel, idx) => (
                            <div key={idx}>
                                <div
                                    style={{
                                        color: "#fff",
                                        fontWeight: 700,
                                        fontSize: "16px",
                                        lineHeight: "18px",
                                    }}
                                >
                                    <div>Efficiency Greater</div>
                                    <div>
                                        than{" "}
                                        {panel?.wattId?.watt === 550
                                            ? "21.29%"
                                            : panel?.wattId?.watt === 600
                                              ? "23.23%"
                                              : ""}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Ribbon */}
                    <div className="w-[88mm] text-center flex items-center justify-center">
                        {state?.selectedPanels?.map((panel, idx) => (
                            <div key={idx}>
                                <div
                                    style={{
                                        color: "#fff",
                                        fontWeight: 700,
                                        fontStyle: "italic",
                                        fontSize: "16px",
                                        lineHeight: "18px",
                                    }}
                                >
                                    {panel?.wattId?.watt === 550 ? (
                                        <>
                                            <div>25 Years Performance</div>
                                            <div>warranty</div>
                                        </>
                                    ) : panel?.wattId?.watt === 600 ? (
                                        <>
                                            <div>30 Years Performance</div>
                                            <div>warranty</div>
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </GaloPdfComp>

            <GaloPdfComp bg={pages[3]}></GaloPdfComp>

            <GaloPdfComp bg={pages[4]}>
                <div className="absolute top-[94mm] left-[10mm] w-100 text-center">
                    <div>
                        <h1 className="text-md font-semibold italic text-black">
                            {state?.setupKw}kW
                        </h1>
                    </div>
                </div>

                <div className="absolute top-[94mm] right-[-10mm] w-100 text-center">
                    <div>
                        <h1 className="text-md font-semibold italic text-black">
                            Galo Solar{" "}
                            {state?.selectedPanels?.[0]?.wattId?.watt}Wp
                        </h1>
                    </div>
                </div>

                <div className="w-full mt-4 absolute top-[130mm] left-[1mm] px-5">
                    <table className="w-full border-2  border-black border-collapse text-center">
                        <thead>
                            <tr className="bg-[#1d1d1d] text-white">
                                <th
                                    colSpan={4}
                                    className="border border-black py-3 text-lg font-bold"
                                >
                                    Proposal Offer for{" "}
                                    {state?.selectedPanels?.[0]?.wattId?.watt}kW
                                    Grid-Connected System
                                </th>
                            </tr>

                            <tr className="bg-[#f8e7aa]">
                                <th className="border border-black py-2 w-20">
                                    S. No.
                                </th>
                                <th className="border border-black py-2">
                                    Item
                                </th>
                                <th className="border border-black py-2 w-44">
                                    Quantity
                                </th>
                                <th className="border border-black py-2 w-44">
                                    Amount
                                </th>
                            </tr>
                        </thead>

                        <tbody className="bg-[#fdf0c7]">
                            <tr>
                                <td className="border border-black py-4">1</td>

                                <td className="border border-black py-4 px-3 leading-5">
                                    {state?.setupKw}kW Grid-Connected
                                    <br />
                                    Solar Power Plant with
                                    <br />
                                    {
                                        state?.selectedPanels?.[0]?.panelId
                                            ?.panelType
                                    }{" "}
                                    {state?.selectedPanels[0]?.inverterId
                                        ? state?.selectedPanels[0]?.inverterId
                                              ?.inverterCapacity + "KW Inverter"
                                        : ""}
                                </td>

                                <td className="border border-black py-4">
                                    1 Complete Set
                                </td>

                                <td className="border border-black py-4 text-lg font-bold">
                                    {`₹ ${state?.selectedPanels[0].totalPrice.toLocaleString()}`}
                                </td>
                            </tr>

                            <tr>
                                <td
                                    colSpan={3}
                                    className="border border-black py-3 text-center"
                                >
                                    Tax (GST)
                                </td>

                                <td className="border border-black py-3">
                                    {state?.gst}%
                                </td>
                            </tr>

                            <tr>
                                <td
                                    colSpan={3}
                                    className="border border-black py-3 text-center"
                                >
                                    Total Amount
                                </td>

                                {/* <td className="border border-black py-3 text-lg font-bold">
                                    ₹{" "}
                                    {state?.selectedPanels[0].totalPrice +
                                        state?.selectedPanels[0].gstAmount}
                                </td> */}
                                <td className="border border-black py-3 text-lg font-bold">
                                    ₹{" "}
                                    {(
                                        Number(
                                            state?.selectedPanels?.[0]
                                                ?.totalPrice || 0,
                                        ) +
                                        Number(
                                            state?.selectedPanels?.[0]
                                                ?.gstAmount || 0,
                                        )
                                    ).toLocaleString("en-IN")}
                                </td>
                            </tr>

                            <tr>
                                <td
                                    colSpan={3}
                                    className="border border-black py-3 text-center"
                                >
                                    Subsidy
                                </td>

                                {/* <td className="border border-black py-3">
                                    ₹ {num.localString("en-IN")(state?.selectedPanels[0].subsidyAmount)}
                                </td> */}
                                <td className="border border-black py-3">
                                    ₹{" "}
                                    {state?.selectedPanels?.[0]?.subsidyAmount?.toLocaleString(
                                        "en-IN",
                                    )}
                                </td>
                            </tr>

                            <tr>
                                <td
                                    colSpan={3}
                                    className="border border-black py-4 text-lg font-bold"
                                >
                                    Net Effective Price
                                </td>

                                <td className="border border-black py-4 text-lg">
                                    ₹{" "}
                                    {state?.finalPrice?.toLocaleString("en-IN")}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </GaloPdfComp>

            <GaloPdfComp bg={pages[5]}>
                <div className="absolute top-[190mm] left-[10mm] w-[190mm]">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: state.termsAndConditions,
                        }}
                    />
                </div>
            </GaloPdfComp>
        </div>
    );
};

export default GaloSalesProposalView;
