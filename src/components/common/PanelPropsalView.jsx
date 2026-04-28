import { ArrowLeft, Download, IndianRupee } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import PdfComp from "./PdfComp";
import { useAuth } from "../../Context/AuthContext";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useState } from "react";

const PanelPropsalView = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const proposalDatas = location?.state;
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const data = {
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        gstin: user?.gstin,
        companyName: user?.companyName,
        contactNumber: user?.contactNumber,
        companyLogo: user?.profileImg,
        address: user?.address,
    };

    const customerData = {
        name: proposalDatas?.name,
        email: proposalDatas?.email,
        phone: proposalDatas?.phone,
        address: proposalDatas?.address,
    };

    const panelProposal = proposalDatas;

    const wattImages =
        panelProposal?.selectedPanels?.flatMap((p) => p?.watt?.imgWatt || []) ||
        [];

    const pages = [
        "/panelimg/p1.jpeg",
        "/panelimg/p2.jpeg",
        "/panelimg/p3.jpeg",
        "/panelimg/p4.jpeg",
        "/panelimg/p5.jpeg",
        "/panelimg/p6.jpeg",
        // ...wattImages,
        "/panelimg/p7.jpeg",
    ];

    const panelData = {
        gst: panelProposal?.gst,
        finalPrice: panelProposal?.finalPrice,
        termsAndConditions: panelProposal?.termsAndConditions,
    };

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

    const handleDownload = async () => {
        try {
            setLoading(true);
            const elements = document.querySelectorAll(".pdf-page");
            const pdf = new jsPDF("p", "mm", "a4");

            for (let i = 0; i < elements.length; i++) {
                const el = elements[i];

                const canvas = await html2canvas(el, {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: "#ffffff",
                    logging: false,
                });

                const logo = el.querySelector(".logo-img");

                if (logo) {
                    const canvasRect = el.getBoundingClientRect();
                    const logoRect = logo.getBoundingClientRect();

                    const scaleX = canvas.width / canvasRect.width;
                    const scaleY = canvas.height / canvasRect.height;

                    const rect = {
                        x: (logoRect.left - canvasRect.left) * scaleX,
                        y: (logoRect.top - canvasRect.top) * scaleY,
                        width: logoRect.width * scaleX,
                        height: logoRect.height * scaleY,
                    };

                    applyContrastToRegion(canvas, rect, 50);
                }

                const imgData = canvas.toDataURL("image/jpeg", 1.0);

                if (i !== 0) pdf.addPage();
                pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
            }

            pdf.save("proposal.pdf");
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
                width: "170px",
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

    const showDealerContactFooter=()=>{
        //  return(
        //     <div
        //             className="absolute bottom-[0mm] right-[0mm]"
        //             style={{
        //                 width: '30%',
        //                 height: '40px',
        //                 backgroundColor: '#a20000',
        //                 display: 'flex',
        //                 flexDirection: 'column',
        //                 justifyContent: 'center',
        //                 padding: '4px 8px',
        //                 opacity: 0.8,
        //                 color:'white',
        //                 padding:"30px 10px",
        //                 borderRadius:'10px'
        //             }}>
        //             <span>{data.email}</span>
        //             <span>{data.contactNumber}</span>
        //         </div>
        //  )
    }

    return (
        <div className="flex min-h-screen flex-col gap-6 bg-gray-200">
            <button
                onClick={() => navigate(-1)}
                className="fixed bottom-6 left-18 z-50 flex items-center gap-2 bg-gray-600 text-white px-5 py-3 rounded-full"
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
                <div className="absolute top-[7mm]  left-[4mm] w-[90mm] h-40 flex items-center justify-center ">
                    {data?.companyLogo ? (
                        <img
                            className="logo-img"
                            src={data.companyLogo}
                            onLoad={handleImageLoad}
                            style={imgStyle}
                        />
                    ) : (
                        <h1>{data?.companyName}</h1>
                    )}
                </div>

                <div className="absolute top-[8mm] right-[6mm] text-end" style={{ color: 'white' }}>
                    <div>
                        <span>{data.companyName}</span>
                        <br />
                        <span>{data.email}</span>
                        <br />
                        <span>{data.contactNumber}</span>
                        <br />
                        <span>{data.gstin}</span>
                        <br />
                        <span className="text-xs">{data.address}</span>
                    </div>
                </div>

                <div className="absolute top-[187mm] left-[17mm]" >
                    <span style={{ textTransform: 'capitalize' }}>{customerData.name}</span><br />
                    <span style={{ textTransform: 'capitalize', fontSize: '14px', width: "400px", display: 'inline-block', wordWrap: "break-word" }}>{customerData.address}</span><br />
                    <span style={{ textTransform: 'capitalize' }}>{customerData.phone}</span><br />
                    <span>{customerData.email}</span>
                </div>

               {showDealerContactFooter()}
            </PdfComp>

            <PdfComp bg={pages[1]}>
                <div className="absolute top-[2mm] right-[11mm] flex items-center justify-center w-52 h-30">
                    {data?.companyLogo ? (
                        <img
                            src={data?.companyLogo}
                            className="logo-img"
                            style={{
                                width: "120px",
                                height: "auto",
                                filter: "contrast(1.2)",
                            }}
                        />
                    ) : (
                        <h1>{data?.companyName}</h1>
                    )}
                </div>
                {showDealerContactFooter()}
            </PdfComp>

            <PdfComp bg={pages[2]}>
                <div className="absolute top-[2mm] right-[11mm] flex items-center justify-center w-52 h-30">
                    {data?.companyLogo ? (
                        <img
                            src={data?.companyLogo}
                            className="logo-img"
                            style={{
                                width: "120px",
                                height: "auto",
                                filter: "contrast(1.2)",
                            }}
                        />
                    ) : (
                        <h1>{data?.companyName}</h1>
                    )}
                </div>
                {showDealerContactFooter()}

            </PdfComp>

            <PdfComp bg={pages[3]}>
                <div className="absolute top-[2mm] right-[11mm] flex items-center justify-center w-52 h-30">
                    {data?.companyLogo ? (
                        <img
                            src={data?.companyLogo}
                            className="logo-img"
                            style={{
                                width: "120px",
                                height: "auto",
                                filter: "contrast(1.2)",
                            }}
                        />
                    ) : (
                        <h1>{data?.companyName}</h1>
                    )}
                </div>
                {showDealerContactFooter()}

            </PdfComp>

            <PdfComp bg={pages[4]}>
                <div className="absolute top-[2mm] right-[11mm] flex items-center justify-center w-52 h-30">
                    {data?.companyLogo ? (
                        <img
                            src={data?.companyLogo}
                            className="logo-img"
                            style={{
                                width: "120px",
                                height: "auto",
                                filter: "contrast(1.2)",
                            }}
                        />
                    ) : (
                        <h1>{data?.companyName}</h1>
                    )}
                </div>

                <div className="absolute top-[75mm] px-4 w-full">
                    <div className="overflow-x-auto">
                        {/* TABLE 1 */}
                        <table
                            className="mx-auto w-[90%]"
                            style={{ border: "1px solid #9CA3AF" }}
                        >
                            <thead>
                                <tr
                                    style={{
                                        backgroundColor: "#991B1B", // red-800
                                        color: "#FFFFFF",
                                        fontSize: "12px",
                                        textAlign: "left",
                                    }}
                                >
                                    <th
                                        style={{
                                            padding: "12px",
                                            border: "1px solid #9CA3AF",
                                        }}
                                    >
                                        S.No
                                    </th>
                                    <th
                                        style={{
                                            padding: "12px",
                                            border: "1px solid #9CA3AF",
                                        }}
                                    >
                                        Panel Watt
                                    </th>
                                    <th
                                        style={{
                                            padding: "12px",
                                            border: "1px solid #9CA3AF",
                                        }}
                                    >
                                        Panel Type
                                    </th>
                                    <th
                                        style={{
                                            padding: "12px",
                                            border: "1px solid #9CA3AF",
                                        }}
                                    >
                                        Technology
                                    </th>
                                    <th
                                        style={{
                                            padding: "12px",
                                            border: "1px solid #9CA3AF",
                                        }}
                                    >
                                        Constructive Type
                                    </th>
                                </tr>
                            </thead>

                            <tbody style={{ fontSize: "14px" }}>
                                {panelProposal?.selectedPanels?.map(
                                    (panel, idx) => (
                                        <tr key={idx}>
                                            <td style={cell}>{idx + 1}</td>
                                            <td style={cell}>
                                                {panel?.watt?.watt} wp
                                            </td>
                                            <td style={cell}>
                                                {panel?.panelType?.panelType}
                                            </td>
                                            <td style={cell}>
                                                {
                                                    panel?.technology
                                                        ?.technologyPanel
                                                }
                                            </td>
                                            <td style={cell}>
                                                {
                                                    panel?.constructive
                                                        ?.constructiveType
                                                }
                                            </td>
                                        </tr>
                                    ),
                                )}
                            </tbody>
                        </table>

                        {/* TABLE 2 */}
                        <table
                            className="mx-auto w-[90%] mt-10"
                            style={{ border: "1px solid #9CA3AF" }}
                        >
                            <thead>
                                <tr
                                    style={{
                                        backgroundColor: "#991B1B",
                                        color: "#FFFFFF",
                                        fontSize: "12px",
                                        textAlign: "left",
                                    }}
                                >
                                    <th style={th}>S.No</th>
                                    <th style={th}>Item Description</th>
                                    <th style={th}>₹ Rate/Watt</th>
                                    <th style={th}>Quantity</th>
                                    <th style={th}>₹ Amount</th>
                                    <th style={th}>₹ GST {panelData?.gst}%</th>
                                    <th style={th}>₹ Amount + GST</th>
                                </tr>
                            </thead>

                            <tbody style={{ fontSize: "14px" }}>
                                {panelProposal?.selectedPanels?.map(
                                    (panel, idx) => (
                                        <tr key={idx}>
                                            <td style={cell}>{idx + 1}</td>
                                            <td style={cell}>
                                                {`${panel?.watt?.watt}Wp Gautam Solar, ${panel?.panelType?.panelType}, ${panel?.technology?.technologyPanel}, ${panel?.constructive?.constructiveType}`}
                                            </td>
                                            <td style={cell}>
                                                {panel?.rate.toLocaleString()}
                                            </td>
                                            <td style={cell}>
                                                {panel?.quantity.toLocaleString()}
                                            </td>
                                            <td style={cell}>
                                                {panel?.totalPrice.toLocaleString()}
                                            </td>
                                            <td style={cell}>
                                                {panel?.gstAmount.toLocaleString()}
                                            </td>
                                            <td style={cell}>
                                                {(
                                                    panel?.totalPrice +
                                                    panel?.gstAmount
                                                ).toLocaleString()}
                                            </td>
                                        </tr>
                                    ),
                                )}

                                <tr
                                    style={{
                                        backgroundColor: "#F3F4F6",
                                        fontWeight: "600",
                                    }}
                                >
                                    <td
                                        colSpan={6}
                                        style={{ ...cell, textAlign: "right" }}
                                    >
                                        Total Amount
                                    </td>
                                    <td
                                        style={{
                                            ...cell,
                                            color: "#DC2626",
                                            textAlign: "right",
                                        }}
                                    >
                                        {panelProposal?.finalPrice.toLocaleString(
                                            "en-IN",
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {showDealerContactFooter()}
                 
            </PdfComp >

            <PdfComp bg={pages[5]}>
                <div className="absolute top-[2mm] right-[11mm] flex items-center justify-center w-52 h-30">
                    {data?.companyLogo ?
                        <img src={data?.companyLogo}
                            className='logo-img'


                            style={{ width: "120px", height: 'auto', filter: 'contrast(1.2)' }}
                        />
                        :
                        <h1>{data?.companyName}</h1>
                    }
                </div>

                <div className='pt-10 '>
                    <div
                        className=" pdf-content max-w-none space-y-3 ml-5 mt-52"
                        dangerouslySetInnerHTML={{ __html: panelData?.termsAndConditions }}
                    >
                    </div>
                </div>
                {showDealerContactFooter()}

            </PdfComp>

            {/* {
    panelProposal?.selectedPanels?.flatMap(panel => panel?.watt?.imgWatt || [])?.map((item, index) => {
        const pageIndex = 6 + index;
        if (!pages[pageIndex]) return null;
        return (
            <PdfComp key={index} bg={pages[pageIndex]}>
                <div className="absolute top-[40mm] left-[20mm] w-[170mm]"></div>
                <div className="absolute top-[40mm] left-[20mm] w-[170mm]"></div>
            </PdfComp>
        );
    })
} */}

            <PdfComp bg={pages[pages.length - 1]} >
                <div className="absolute top-[7mm]  left-[4mm] w-[90mm] h-40 flex items-center justify-center">
                    {data?.companyLogo ? (
                        <img
                            className='logo-img'
                            src={data.companyLogo}
                            onLoad={handleImageLoad}
                            style={imgStyle}
                        />
                    ) : (
                        <h1>{data?.companyName}</h1>
                    )}
                </div>

                <div className="absolute top-[8mm] right-[6mm] text-end" style={{ color: 'white' }}>
                    <div>
                        <span>{data.companyName}</span><br />
                        <span>{data.email}</span><br />
                        <span>{data.contactNumber}</span><br />
                        <span>{data.gstin}</span><br />
                        <span className='text-xs'>{data.address}</span>
                    </div>
                </div>

            </PdfComp>

        </div >
    )
}

export default PanelPropsalView;
