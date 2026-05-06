import { ArrowLeft, Download, IndianRupee } from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PdfComp from "../../components/common/PdfComp";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const SalesProposalView = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

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
        // date : state.clientId?.createdAt
    };

    // const wattImages = state?.selectedPanels?.flatMap(p => p?.wattId?.imgWatt || []) || [];

    const pages = [
        "/salesPanel/001.png",
        "/salesPanel/002.png",
        "/salesPanel/003.png",
        "/salesPanel/004.png",
        "/salesPanel/005.png",
        "/salesPanel/006.png",
        // ...wattImages,
        "/salesPanel/007.png",
    ];

    const applyContrastToRegion = (canvas, rect, contrast = 50) => {
        const ctx = canvas.getContext("2d");

        const imageData = ctx.getImageData(
            rect.x,
            rect.y,
            rect.width,
            rect.height,
        );

        const data = imageData.data;
        const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

        for (let i = 0; i < data.length; i += 4) {
            data[i] = factor * (data[i] - 128) + 128;
            data[i + 1] = factor * (data[i + 1] - 128) + 128;
            data[i + 2] = factor * (data[i + 2] - 128) + 128;
        }

        ctx.putImageData(imageData, rect.x, rect.y);
    };

    // const handleDownload = async () => {
    //   try {
    //     setLoading(true)
    //     const elements = document.querySelectorAll(".pdf-page");
    //     const pdf = new jsPDF("p", "mm", "a4");

    //     for (let i = 0; i < elements.length; i++) {
    //       const el = elements[i];

    //       const canvas = await html2canvas(el, {
    //         scale: 2,
    //         useCORS: true,
    //         backgroundColor: "#ffffff",
    //         logging: false,
    //       });

    //       const logo = el.querySelector(".logo-img");

    //       if (logo) {
    //         const canvasRect = el.getBoundingClientRect();
    //         const logoRect = logo.getBoundingClientRect();

    //         const scaleX = canvas.width / canvasRect.width;
    //         const scaleY = canvas.height / canvasRect.height;

    //         const rect = {
    //           x: (logoRect.left - canvasRect.left) * scaleX,
    //           y: (logoRect.top - canvasRect.top) * scaleY,
    //           width: logoRect.width * scaleX,
    //           height: logoRect.height * scaleY,
    //         };

    //         applyContrastToRegion(canvas, rect, 50);
    //       }

    //       const imgData = canvas.toDataURL("image/jpeg", 1.0);

    //       if (i !== 0) pdf.addPage();
    //       pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
    //     }

    //     pdf.save("proposal.pdf");
    //   } catch (er) {
    //     console.log(er)
    //   }
    //   finally {
    //     setLoading(false)
    //   }
    // };

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
            // adding the dynaymic name
            const clientName = customerData?.companyName?.trim()
                ? customerData.companyName.replace(/\s+/g, "_")
                : "client";

            pdf.save(`${clientName}_proposal.pdf`);
            // pdf.save("proposal.pdf");
            // pdf.save(`${clientName}_proposal.pdf`);

            //    const clientName =
            //     customerData?.name?.trim()
            //         ? customerData.name.replace(/\s+/g, "_")
            //         : customerData?.companyName?.trim()
            //         ? customerData.companyName.replace(/\s+/g, "_")
            //         : "client";

            // pdf.save(`${clientName}_proposal.pdf`);
        } catch (er) {
            console.log(er);
        } finally {
            setLoading(false);
        }
    };

    const cell = {
        border: "1px solid #D1D5DB",
        padding: "8px",
        textAlign: "center",
    };

    const th = {
        border: "1px solid #9CA3AF",
        padding: "12px",
    };

    {
        /* COMMON TD STYLE */
    }
    const td = {
        border: "1px solid #d1d5db",
        padding: "6px",
        textAlign: "center",
    };

    const [imgStyle, setImgStyle] = useState({
        width: "160px",
        height: "auto",
    });

    const handleImageLoad = (e) => {
        const img = e.target;
        const w = img.naturalWidth;
        const h = img.naturalHeight;

        // Compare with your "second image" size
        if (w >= 292 && h >= 283) {
            setImgStyle({
                width: "150px", // reduced width
                height: "auto",
                filter: "contrast(1.2)",
            });
        } else {
            setImgStyle({
                width: "200px",
                height: "auto",
                filter: "contrast(1.2)",
            });
        }
    };

    return (
        <div className="flex min-h-screen flex-col gap-6 bg-gray-200 ">
            <button
                onClick={() => navigate(-1)}
                className=" fixed bottom-6 left-18 z-50 flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 print:hidden  "
            >
                <ArrowLeft /> Go Back
            </button>
            <button
                onClick={handleDownload}
                disabled={loading}
                className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full text-white
        ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600"}
    `}
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

            <PdfComp bg={pages[0]}>
                {/* <div className="absolute top-[15mm] left-[6mm] text-start">
          <div style={{ color: "#000000" }}>
            <span className="inline-block text-lg capitalize">
              {data.name}
            </span>
            <br />
            <span className="inline-block text-lg capitalize">
              {data.phone}
            </span>
            <br />
            <span className="inline-block text-lg capitalize max-w-96">
              {data.email}
            </span>
          </div>
        </div> */}

                <div className="absolute top-[189mm] right-[90mm] min-w-96 font-medium space-y-0.5">
                    <span className="text-xs font-semibold block capitalize">
                        {customerData.name}
                    </span>
                    <span className="text-xs font-semibold block">
                        {customerData.address}
                    </span>
                    <span className="text-xs font-semibold block">
                        {customerData.phone}
                    </span>
                    <span className="text-xs font-semibold block">
                        {customerData.email}
                    </span>
                    <span className="text-xs font-semibold block">
                        {customerData.gstin}
                    </span>
                    <span className="text-xs font-semibold block">
                        {customerData.companyName}
                    </span>

                    <span className="text-xs font-semibold block">
                        {new Date(customerData.createdAt).toLocaleString()}
                    </span>
                </div>
            </PdfComp>

            {/* Empty pages (logo section) */}
            {[1, 2, 3].map((pageIdx) => (
                <PdfComp key={pageIdx} bg={pages[pageIdx]}>
                    <div className="absolute top-[5mm] right-[20mm] w-[120px] h-[60px] flex items-center justify-center overflow-hidden">
                        {/* Logo here if needed */}
                    </div>
                </PdfComp>
            ))}

            {/* TABLE PAGE */}
            <PdfComp bg={pages[4]}>
                <div className="absolute top-[75mm] px-4 w-full">
                    <div className="overflow-x-auto">
                        {/* PANEL TABLE */}
                        <table
                            style={{
                                width: "90%",
                                margin: "auto",
                                border: "1px solid #9ca3af",
                                borderCollapse: "collapse",
                            }}
                        >
                            <thead>
                                <tr
                                    style={{
                                        backgroundColor: "#991b1b",
                                        color: "#ffffff",
                                        fontSize: "12px",
                                        textAlign: "left",
                                    }}
                                >
                                    {[
                                        "S.No",
                                        "Panel Watt",
                                        "Panel Type",
                                        "Technology",
                                        "Constructive Type",
                                    ].map((h, i) => (
                                        <th
                                            key={i}
                                            style={{
                                                padding: "8px",
                                                border: "1px solid #9ca3af",
                                            }}
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody style={{ fontSize: "14px" }}>
                                {state?.selectedPanels?.map((panel, idx) => (
                                    <tr key={idx}>
                                        <td style={td}>{idx + 1}</td>
                                        <td style={td}>
                                            {panel?.wattId?.watt} wp
                                        </td>
                                        <td style={td}>
                                            {panel?.panelId?.panelType}
                                        </td>
                                        <td style={td}>
                                            {
                                                panel?.technologyId
                                                    ?.technologyPanel
                                            }
                                        </td>
                                        <td style={td}>
                                            {
                                                panel?.constructiveId
                                                    ?.constructiveType
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* PRICING TABLE */}
                        <table
                            style={{
                                width: "90%",
                                margin: "40px auto 0",
                                border: "1px solid #9ca3af",
                                borderCollapse: "collapse",
                            }}
                        >
                            <thead>
                                <tr
                                    style={{
                                        backgroundColor: "#991b1b",
                                        color: "#ffffff",
                                        fontSize: "12px",
                                    }}
                                >
                                    {[
                                        "S.No",
                                        "Item Description",
                                        "₹ Rate/Watt",
                                        "Quantity",
                                        "₹ Amount",
                                        `₹ GST ${state?.gst}%`,
                                        "₹ Amount + GST",
                                    ].map((h, i) => (
                                        <th
                                            key={i}
                                            style={{
                                                padding: "8px",
                                                border: "1px solid #9ca3af",
                                            }}
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody style={{ fontSize: "12px" }}>
                                {state?.selectedPanels?.map((panel, idx) => (
                                    <tr key={idx}>
                                        <td style={td}>{idx + 1}</td>
                                        <td style={td}>
                                            {`${panel?.wattId?.watt}Wp Gautam Solar, ${panel?.panelId?.panelType}, ${panel?.technologyId?.technologyPanel}, ${panel?.constructiveId?.constructiveType}`}
                                        </td>
                                        <td style={td}>
                                            {panel?.rate.toLocaleString()}
                                        </td>
                                        <td style={td}>
                                            {panel?.quantity.toLocaleString()}
                                        </td>
                                        <td style={td}>
                                            {panel?.totalPrice.toLocaleString()}
                                        </td>
                                        <td style={td}>
                                            {panel?.gstAmount.toLocaleString()}
                                        </td>
                                        <td style={td}>
                                            {(
                                                panel?.totalPrice +
                                                panel?.gstAmount
                                            ).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                            <tbody>
                                <tr
                                    style={{
                                        backgroundColor: "#f3f4f6",
                                        fontWeight: "600",
                                    }}
                                >
                                    <td
                                        colSpan={6}
                                        style={{ ...td, textAlign: "right" }}
                                    >
                                        ₹ Total Amount
                                    </td>
                                    <td
                                        style={{
                                            ...td,
                                            color: "#dc2626",
                                            textAlign: "right",
                                        }}
                                    >
                                        {state?.finalPrice.toLocaleString(
                                            "en-IN",
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* SALES PERSON HEADER */}
                <div className="absolute bottom-[15mm] left-[10mm] w-[90%]">
                    <div
                        style={{
                            border: "1px solid #9ca3af",
                            padding: "10px",
                            borderRadius: "4px",
                            backgroundColor: "#f9fafb",
                        }}
                    >
                        <h3
                            style={{
                                margin: 0,
                                marginBottom: "6px",
                                fontSize: "14px",
                                color: "#991b1b",
                            }}
                        >
                            Sales Person Details
                        </h3>

                        <div style={{ fontSize: "12px", lineHeight: "1.6" }}>
                            <div>
                                <strong>Name : </strong> {data?.name}
                            </div>
                            <div>
                                <strong>Phone : </strong> {data?.phone}
                            </div>
                            {/* <div>
                                <strong>Email : </strong> {data?.email}
                            </div> */}
                        </div>
                    </div>
                </div>
            </PdfComp>

            {/* TERMS */}
            <PdfComp bg={pages[5]}>
                <div
                    style={{
                        paddingTop: "40px",
                        paddingLeft: "30px",
                        paddingRight: "30px",
                    }}
                >
                    <div
                        style={{ marginTop: "260px" }}
                        dangerouslySetInnerHTML={{
                            __html: state?.termsAndConditions,
                        }}
                    />
                </div>
            </PdfComp>

            {/* {state?.selectedPanels
        ?.flatMap((panel) => panel?.wattId?.imgWatt || [])
        ?.map((_, index) => {
          const pageIndex = 6 + index;
          if (!pages[pageIndex]) return null;

          return (
            <PdfComp key={index} bg={pages[pageIndex]}>
            </PdfComp>
          );
        })} */}

            {/* LAST PAGE */}
            <PdfComp bg={pages[pages.length - 1]}></PdfComp>
        </div>
    );
};

export default SalesProposalView;
