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

    console.log("Location state:", state);
    const data = {
        email: state?.salesId?.email,
        name: state?.salesId?.name,
        phone: state?.salesId?.phone,
    };

    const customerData = {
        name: state?.clientId?.fullName,
        email: state?.clientId?.email,
        companyName: state?.clientId?.companyName,
        gstin: state?.clientId?.gstin,
        phone: state?.clientId?.phone,
        address: state?.clientId?.address,
        createdAt: state?.createdAt,
    };

    const pages = [
        "galo1.jpeg",
        "galo2.jpeg",
        "galo3.jpeg",
        "galo4.jpeg",
        "galo5.jpeg",
        "galo6.jpeg",
    ];

    const handleDownload = async () => {
        try {
            setLoading(true);
            const elements = document.querySelectorAll(".pdf-page");
            const pdf = new jsPDF({
                orientation: "p",
                unit: "mm",
                format: "a4",
                compress: true,
            });

            for (let i = 0; i < elements.length; i++) {
                const el = elements[i];
                const canvas = await html2canvas(el, {
                    scale: 1.6,
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
                : "client";

            pdf.save(`${clientName}_proposal.pdf`);
        } catch (er) {
            console.log(er);
        } finally {
            setLoading(false);
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
            <button
                onClick={handleDownload}
                disabled={loading}
                className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full text-white transition ${loading
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
            </button>

            <GaloPdfComp bg={pages[0]}>
                <div className="absolute top-[228mm] left-[90mm] w-100 text-center">
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

                            <h2 className="text-2xl font-bold italic text-black">
                                {panel?.technologyId?.technologyPanel} {panel?.panelId?.panelType} with {panel?.constructiveId?.constructiveType}
                            </h2>
                        </div>
                    ))}
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
                            {state?.setupKw}kW
                        </h1>
                    </div>
                </div>

                <div className="w-full mt-6 absolute top-[130mm] left-[1mm] px-5">
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
                                    {state?.setupKw}kW
                                    Grid-Connected
                                    <br />
                                    Solar Power Plant with
                                    <br />
                                    {
                                        state?.selectedPanels?.[0]?.panelId
                                            ?.panelType
                                    }{" "}

                                    {state?.selectedPanels[0]?.inverterId?state?.selectedPanels[0]?.inverterId?.inverterCapacity+'KW Inverter':''} 
                                </td>

                                <td className="border border-black py-4">
                                    1 Complete Set
                                </td>

                                <td className="border border-black py-4 text-2xl font-bold">
                                   { `₹ ${state?.selectedPanels[0].totalPrice}`}
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

                                <td className="border border-black py-3 text-xl font-bold">
                                    ₹ {state?.selectedPanels[0].totalPrice+state?.selectedPanels[0].gstAmount}
                                </td>
                            </tr>

                            <tr>
                                <td
                                    colSpan={3}
                                    className="border border-black py-3 text-center"
                                >
                                    Subsidy
                                </td>

                                <td className="border border-black py-3">
                                    ₹ {state?.selectedPanels[0].subsidyAmount}
                                </td>
                            </tr>

                            <tr>
                                <td
                                    colSpan={3}
                                    className="border border-black py-4 text-2xl font-bold"
                                >
                                    Net Effective Price
                                </td>

                                <td className="border border-black py-4 text-2xl">
                                   ₹ {state?.finalPrice}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </GaloPdfComp>

            <GaloPdfComp bg={pages[5]}></GaloPdfComp>
        </div>
    );
};

export default GaloSalesProposalView;
