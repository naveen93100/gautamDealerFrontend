// import { ArrowLeft, Download } from "lucide-react";
// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import GaloPdfComp from "../../components/common/GaloPdfComp";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const GaloSalesProposalView = () => {
//     const { state } = useLocation();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);

//     const data = {
//         email: state?.salesId?.email,
//         name: state?.salesId?.name,
//         phone: state?.salesId?.phone,
//     };

//     const customerData = {
//         name: state?.clientId?.fullName,
//         email: state?.clientId?.email,
//         companyName: state?.clientId?.companyName,
//         gstin: state?.clientId?.gstin,
//         phone: state?.clientId?.phone,
//         address: state?.clientId?.address,
//         createdAt: state?.createdAt,
//     };

//     console.log("Showing the sales perspon", data, "Showing the Sales Parposal Data", customerData)

//     const pages = [
//         "galo1.jpg",
//         "galo2.jpg",
//         "galo3.jpg",
//         "galo4.jpg",
//         "galo5.jpg",
//     ];

//     // console.log("showing the page", pages);

//     const handleDownload = async () => {
//         try {
//             setLoading(true);
//             const elements = document.querySelectorAll(".pdf-page");
//             const pdf = new jsPDF({
//                 orientation: "p",
//                 unit: "mm",
//                 format: "a4",
//                 compress: true,
//             });

//             for (let i = 0; i < elements.length; i++) {
//                 const el = elements[i];
//                 const canvas = await html2canvas(el, {
//                     scale: 1.6,
//                     useCORS: true,
//                     backgroundColor: "#ffffff",
//                     logging: false,
//                 });
//                 const imgData = canvas.toDataURL("image/jpeg", 0.9);
//                 if (i !== 0) pdf.addPage();
//                 pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
//             }

//             const clientName = customerData?.companyName?.trim()
//                 ? customerData.companyName.replace(/\s+/g, "_")
//                 : "client";

//             pdf.save(`${clientName}_proposal.pdf`);
//         } catch (er) {
//             console.log(er);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const td = {
//         border: "1px solid #d1d5db",
//         padding: "6px",
//         textAlign: "center",
//     };

//     return (
//         <div className="flex min-h-screen flex-col gap-6  bg-gray-100">
//             {/* --- Back Button --- */}
//             <button
//                 onClick={() => navigate(-1)}
//                 className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-black text-white font-medium px-5 py-3 rounded-full shadow-lg hover:bg-gray-800 transition-all print:hidden"
//             >
//                 <ArrowLeft /> Go Back
//             </button>

//             {/* --- Download Button --- */}
//             <button
//                 onClick={handleDownload}
//                 disabled={loading}
//                 className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full text-white transition ${
//                     loading
//                         ? "bg-gray-400 cursor-not-allowed"
//                         : "bg-black hover:bg-gray-800 border-2 border-yellow-400"
//                 }`}
//             >
//                 {loading ? (
//                     <>
//                         <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
//                         Generating...
//                     </>
//                 ) : (
//                     <>
//                         <Download className="w-5 h-5" />
//                         Download
//                     </>
//                 )}
//             </button>

//             {/* --- Page 1: Customer details overlay --- */}
//             <GaloPdfComp bg={pages[0]}>
//                 <div className="absolute top-[189mm] right-[90mm] min-w-96 font-medium space-y-0.5">
//                     <span className="text-xs font-semibold block capitalize">
//                         {customerData.name}
//                     </span>
//                     <span className="text-xs w-96 font-semibold block">
//                         {customerData.address}
//                     </span>
//                     <span className="text-xs font-semibold block">
//                         {customerData.phone}
//                     </span>
//                     <span className="text-xs font-semibold block">
//                         {customerData.email}
//                     </span>
//                     <span className="text-xs font-semibold block">
//                         {customerData.gstin}
//                     </span>
//                     <span className="text-xs font-semibold block">
//                         {customerData.companyName}
//                     </span>
//                     <span className="text-xs font-semibold block">
//                         {new Date(customerData.createdAt).toLocaleString()}
//                     </span>
//                 </div>
//             </GaloPdfComp>

//             {/* --- Pages 2–4: empty (logo placeholders) --- */}
//             {[1, 2, 3].map((pageIdx) => (
//                 <GaloPdfComp key={pageIdx} bg={pages[pageIdx]}>
//                     <div className="absolute top-[5mm] right-[20mm] w-[120px] h-[60px] flex items-center justify-center overflow-hidden" />
//                 </GaloPdfComp>
//             ))}

//             {/* --- Page 5: Tables (Panel + Pricing) with Galo colours --- */}
//             <GaloPdfComp bg={pages[4]}>
//                 <div className="absolute top-[75mm] px-4 w-full">
//                     <div className="overflow-x-auto">
//                         {/* PANEL TABLE */}
//                         <table
//                             style={{
//                                 width: "90%",
//                                 margin: "auto",
//                                 border: "1px solid #9ca3af",
//                                 borderCollapse: "collapse",
//                             }}
//                         >
//                             <thead>
//                                 <tr
//                                     style={{
//                                         backgroundColor: "#000000", // black header
//                                         color: "#eab308", // yellow text
//                                         fontSize: "12px",
//                                         textAlign: "left",
//                                     }}
//                                 >
//                                     {[
//                                         "S.No",
//                                         "Panel Watt",
//                                         "Panel Type",
//                                         "Technology",
//                                         "Constructive Type",
//                                     ].map((h, i) => (
//                                         <th
//                                             key={i}
//                                             style={{
//                                                 padding: "8px",
//                                                 border: "1px solid #9ca3af",
//                                             }}
//                                         >
//                                             {h}
//                                         </th>
//                                     ))}
//                                 </tr>
//                             </thead>

//                             <tbody style={{ fontSize: "14px" }}>
//                                 {state?.selectedPanels?.map((panel, idx) => (
//                                     <tr key={idx}>
//                                         <td style={td}>{idx + 1}</td>
//                                         <td style={td}>
//                                             {panel?.wattId?.watt} wp
//                                         </td>
//                                         <td style={td}>
//                                             {panel?.panelId?.panelType}
//                                         </td>
//                                         <td style={td}>
//                                             {
//                                                 panel?.technologyId
//                                                     ?.technologyPanel
//                                             }
//                                         </td>
//                                         <td style={td}>
//                                             {
//                                                 panel?.constructiveId
//                                                     ?.constructiveType
//                                             }
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>

//                         {/* PRICING TABLE */}
//                         <table
//                             style={{
//                                 width: "90%",
//                                 margin: "40px auto 0",
//                                 border: "1px solid #9ca3af",
//                                 borderCollapse: "collapse",
//                             }}
//                         >
//                             <thead>
//                                 <tr
//                                     style={{
//                                         backgroundColor: "#000000",
//                                         color: "#eab308",
//                                         fontSize: "12px",
//                                     }}
//                                 >
//                                     {[
//                                         "S.No",
//                                         "Item Description",
//                                         "₹ Rate/Watt",
//                                         "Quantity",
//                                         "₹ Amount",
//                                         `₹ GST ${state?.gst}%`,
//                                         "₹ Amount + GST",
//                                     ].map((h, i) => (
//                                         <th
//                                             key={i}
//                                             style={{
//                                                 padding: "8px",
//                                                 border: "1px solid #9ca3af",
//                                             }}
//                                         >
//                                             {h}
//                                         </th>
//                                     ))}
//                                 </tr>
//                             </thead>

//                             <tbody style={{ fontSize: "12px" }}>
//                                 {state?.selectedPanels?.map((panel, idx) => (
//                                     <tr key={idx}>
//                                         <td style={td}>{idx + 1}</td>
//                                         <td style={td}>
//                                             {`${panel?.wattId?.watt}Wp Gautam Solar, ${panel?.panelId?.panelType}, ${panel?.technologyId?.technologyPanel}, ${panel?.constructiveId?.constructiveType}`}
//                                         </td>
//                                         <td style={td}>
//                                             {panel?.rate.toLocaleString()}
//                                         </td>
//                                         <td style={td}>
//                                             {panel?.quantity.toLocaleString()}
//                                         </td>
//                                         <td style={td}>
//                                             {panel?.totalPrice.toLocaleString()}
//                                         </td>
//                                         <td style={td}>
//                                             {panel?.gstAmount.toLocaleString()}
//                                         </td>
//                                         <td style={td}>
//                                             {(
//                                                 panel?.totalPrice +
//                                                 panel?.gstAmount
//                                             ).toLocaleString()}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>

//                             <tbody>
//                                 <tr
//                                     style={{
//                                         backgroundColor: "#f3f4f6",
//                                         fontWeight: "600",
//                                     }}
//                                 >
//                                     <td
//                                         colSpan={6}
//                                         style={{ ...td, textAlign: "right" }}
//                                     >
//                                         ₹ Total Amount
//                                     </td>
//                                     <td
//                                         style={{
//                                             ...td,
//                                             color: "#eab308", // yellow total
//                                             textAlign: "right",
//                                             fontWeight: "bold",
//                                         }}
//                                     >
//                                         {state?.finalPrice.toLocaleString(
//                                             "en-IN",
//                                         )}
//                                     </td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>

//                 {/* SALES PERSON DETAILS (unchanged) */}
//                 <div className="absolute bottom-[15mm] left-[10mm] w-[90%]">
//                     <div
//                         style={{
//                             border: "1px solid #9ca3af",
//                             padding: "10px",
//                             borderRadius: "4px",
//                             backgroundColor: "#f9fafb",
//                         }}
//                     >
//                         <h3
//                             style={{
//                                 margin: 0,
//                                 marginBottom: "6px",
//                                 fontSize: "14px",
//                                 color: "#000000",
//                                 borderBottom: "2px solid #eab308",
//                                 paddingBottom: "4px",
//                             }}
//                         >
//                             Sales Person Details
//                         </h3>

//                         <div style={{ fontSize: "12px", lineHeight: "1.6" }}>
//                             <div>
//                                 <strong>Name : </strong> {data?.name}
//                             </div>
//                             <div>
//                                 <strong>Phone : </strong> {data?.phone}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </GaloPdfComp>

//             {/* --- Page 6: Terms & Conditions --- */}
//             <GaloPdfComp bg={pages[5]}>
//                 <div
//                     style={{
//                         paddingTop: "40px",
//                         paddingLeft: "30px",
//                         paddingRight: "30px",
//                     }}
//                 >
//                     <div
//                         style={{ marginTop: "260px" }}
//                         dangerouslySetInnerHTML={{
//                             __html: state?.termsAndConditions,
//                         }}
//                     />
//                 </div>
//             </GaloPdfComp>

//             {/* --- Page 7: final empty page --- */}
//             <GaloPdfComp bg={pages[pages.length - 1]} />
//         </div>
//     );
// };

// export default GaloSalesProposalView;

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
            </button>

            <GaloPdfComp bg={pages[0]}>
                <div className="absolute top-[228mm] left-[90mm] w-100 text-center">
                    {state?.selectedPanels?.map((panel, idx) => (
                        <div key={idx}>
                            <h1 className="text-2xl font-bold italic text-black">
                                {panel?.wattId?.watt}kW Grid-Connected
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
                    {state?.selectedPanels?.map((panel, idx) => (
                        <div key={idx}>
                            <h1 className="text-md font-semibold italic text-black">
                                {panel?.wattId?.watt}kW
                            </h1>
                        </div>
                    ))}
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
                                    {state?.selectedPanels?.[0]?.wattId?.watt}kW
                                    Grid-Connected
                                    <br />
                                    Solar Power Plant with
                                    <br />
                                    {
                                        state?.selectedPanels?.[0]?.panelId
                                            ?.panelType
                                    }{" "}
                                    Inverter
                                </td>

                                <td className="border border-black py-4">
                                    1 Complete Set
                                </td>

                                <td className="border border-black py-4 text-2xl font-bold">
                                    ₹2,84,665/-
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
                                    8.9%
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
                                    ₹3,10,000/-
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
                                    ₹1,08,000/-
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
                                    ₹2,02,000/-
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
