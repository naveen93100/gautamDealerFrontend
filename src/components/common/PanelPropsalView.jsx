import { ArrowLeft, Download, IndianRupee } from 'lucide-react';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PdfComp from './PdfComp';
import { useAuth } from '../../Context/AuthContext';

const PanelPropsalView = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const proposalDatas = location?.state?.data;
    // console.log("Proposal data   : ", proposalDatas)
    const { user } = useAuth()



    const data = {
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        gstin: user?.gstin,
        companyName: user?.companyName,
        contactNumber: user?.contactNumber,
        companyLogo: user?.profileImg,
        address: user?.address,
    }

    const customerData = {
        name: proposalDatas?.name,
        email: proposalDatas?.email,
        phone: proposalDatas?.phone,
        address: proposalDatas?.address,
    }

    const panelProposal = proposalDatas?.panelData[0];
    // console.log("panelProposal : ", panelProposal)

    const wattImages = panelProposal?.selectedPanels?.flatMap(p => p?.watt?.imgWatt || []) || [];

    // console.log("wattIamge : ", wattImages);

    const pages = [
        "/panelimg/p1.jpg.jpeg",
        "/panelimg/p2.jpg.jpeg",
        "/panelimg/p3.jpg.jpeg",
        "/panelimg/p4.jpg.jpeg",
        "/panelimg/p5.jpg.jpeg",
        "/panelimg/p6.jpg.jpeg",
        "/panelimg/p7.jpg.jpeg",
        "/panelimg/p8.jpg.jpeg",
        "/panelimg/table.jpg.jpeg",
        "/panelimg/table.jpg.jpeg",
        ...wattImages,
        "/panelimg/p9.jpg.jpeg",

    ]

    // console.log("pages : ", pages);
    // const START_PAGE = pages.length - panelProposal.selectedPanels.length;

    const panelData = {
        gst: panelProposal?.gst,
        finalPrice: panelProposal?.finalPrice,
        termsAndConditions: panelProposal?.termsAndConditions
    }


    // console.log("data : ,", data)
    return (
        <div className="flex min-h-screen flex-col gap-6 bg-gray-200 ">
            <div className=''>
                <button
                    onClick={() => navigate(-1)}
                    className=" fixed bottom-6 left-18 z-50 flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 print:hidden  "
                >
                    <ArrowLeft /> Go Back
                </button>
                <button
                    onClick={() => window.print()}
                    className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 print:hidden"
                >
                    <Download className="w-5 h-5" />
                    Download
                </button>
            </div>

            <PdfComp bg={pages[0]}>
                <div className="absolute scale-150 top-[8mm] left-[22mm]  w-40 h-25  overflow-hidden flex items-center justify-center">
                    {data?.companyLogo ?
                        <img loading='lazy' src={data?.companyLogo} alt="img" className=' w-2/3 object-cover ' />
                        :
                        <h1 className='uppercase'>{data?.companyName}</h1>

                    }
                </div>

                <div className="absolute top-[5mm] right-[6mm]  text-end">
                    <div className='text-white'>

                        <span className='capitalize inline-block text-lg'>
                            {data.companyName}
                        </span>

                        <br />
                        <span className=' inline-block text-md'>
                            {data.email}
                        </span>
                        <br />
                        <span className='capitalize inline-block text-md'>
                            {data.contactNumber}
                        </span>
                        <br />
                        <span className='capitalize inline-block text-md'>
                            {data.gstin}
                        </span>
                        <br />
                        <span className='capitalize max-w-96  inline-block text-xs'>
                            {data.address}
                        </span>
                        <br />

                    </div>
                </div>

                <div className="absolute text-black  top-[189mm] right-[90mm] min-w-96  font-medium ">
                    <span className='capitalize inline-block font-semibold'>
                        {customerData.name}
                    </span>
                    <br />
                    <span className='text-[14px] font-semibold'>
                        {customerData.address}
                    </span>
                    <br />
                    <span className='text-sm font-semibold'>
                        {customerData.phone}
                    </span>
                    <br />
                    <span className='text-sm font-semibold'>
                        {customerData.email}
                    </span>
                    <br />
                    {/* <span className='inline-block text-sm font-semibold'>
                        For
                        {' '}
                        <span className='text-red-800'>
                             {`${proposalsData?.orderCapacity / 1000} kW`} 
                        </span>
                         {' '}
                        Solar Power Plant
                    </span> */}
                </div>
            </PdfComp>

            <PdfComp bg={pages[1]}>
                <div className="absolute text-red-500 scale-150 top-[5mm] right-[20mm] overflow-hidden max-w-30  h-18  flex items-center justify-center">
                    {/* <img loading='lazy' src={data?.companyLogo} alt="" className=' object-cover w-22' /> */}
                    {data?.companyLogo ?
                        <img loading='lazy' src={data?.companyLogo} alt="" className=' object-cover w-22' />
                        :
                        <h1 className='uppercase'>{data?.companyName}</h1>
                    }
                </div>
            </PdfComp>

            <PdfComp bg={pages[2]}>
                <div className="absolute text-red-500 scale-150 top-[5mm] right-[20mm] overflow-hidden max-w-30  h-18  flex items-center justify-center">
                    {data?.companyLogo ?
                        <img loading='lazy' src={data?.companyLogo} alt="" className=' object-cover w-22' />
                        :
                        <h1 className='uppercase'>{data?.companyName}</h1>
                    }
                </div>
            </PdfComp>

            <PdfComp bg={pages[3]}>
                <div className="absolute text-red-500 scale-150 top-[5mm] right-[20mm] overflow-hidden max-w-30  h-18  flex items-center justify-center">
                    {data?.companyLogo ?
                        <img loading='lazy' src={data?.companyLogo} alt="" className='object-cover w-22' />
                        :
                        <h1 className='uppercase'>{data?.companyName}</h1>
                    }
                </div>
            </PdfComp>

            <PdfComp bg={pages[4]}>
                {/* <div className="absolute text-red-500 scale-150 top-[5mm] right-[20mm] overflow-hidden max-w-30  h-18  flex items-center justify-center">
                    {data?.companyLogo ?
                        <img loading='lazy' src={data?.companyLogo} alt="" className='object-cover w-22' />
                        :
                        <h1 className='uppercase'>{data?.companyName}</h1>
                    }
                </div> */}
            </PdfComp>

            <PdfComp bg={pages[5]}>
                <div className="absolute text-red-500 scale-150 top-[5mm] right-[20mm] overflow-hidden max-w-30  h-18  flex items-center justify-center ">
                    {data?.companyLogo ?
                        <img loading='lazy' src={data?.companyLogo} alt="" className='object-cover w-22' />
                        :
                        <h1 className='uppercase'>{data?.companyName}</h1>
                    }
                </div>
            </PdfComp>

            <PdfComp bg={pages[6]}>
                <div className="absolute text-red-500 scale-150 top-[5mm] right-[20mm] overflow-hidden max-w-30  h-18  flex items-center justify-center">
                    {data?.companyLogo ?
                        <img loading='lazy' src={data?.companyLogo} alt="" className='object-cover w-22' />
                        :
                        <h1 className='uppercase'>{data?.companyName}</h1>
                    }
                </div>
            </PdfComp>
            <PdfComp bg={pages[7]}>
                <div className="absolute text-red-500 scale-150 top-[5mm] right-[20mm] overflow-hidden max-w-30  h-18  flex items-center justify-center">
                    {data?.companyLogo ?
                        <img loading='lazy' src={data?.companyLogo} alt="" className='object-cover w-22' />
                        :
                        <h1 className='uppercase'>{data?.companyName}</h1>
                    }
                </div>
            </PdfComp>
            <PdfComp bg={pages[8]}>
                <div className="absolute text-red-500 scale-150 top-[5mm] right-[20mm] overflow-hidden max-w-30  h-18  flex items-center justify-center">
                    {data?.companyLogo ?
                        <img loading='lazy' src={data?.companyLogo} alt="" className='object-cover w-22' />
                        :
                        <h1 className='uppercase'>{data?.companyName}</h1>
                    }
                </div>
                <div className='absolute top-[75mm] px-4 w-full'>
                    <div className=" overflow-x-auto ">
                        <table className="mx-auto w-[90%] border border-black">
                            <thead>
                                <tr className=" bg-red-800 text-white text-xs text-left">
                                    <th className="p-3  text-xs border border-black">S.No</th>
                                    <th className="p-3 border border-black">Panel Type</th>
                                    <th className="p-3 border border-black">Technology</th>
                                    <th className="p-3 border border-black">Constructive Type</th>
                                    <th className="p-3 border border-black">Panel Watt </th>

                                </tr>
                            </thead>

                            <tbody className="text-sm">

                                {
                                    panelProposal?.selectedPanels?.map((panel, idx) => (
                                        // console.log("panel : ", panel),
                                        <tr>
                                            <td className="border border-gray-300 p-2 text-center">{idx + 1}</td>
                                            <td className="border border-gray-300 p-2 text-center">{panel?.panelType?.panelType}</td>
                                            <td className="border border-gray-300 p-2 text-center">{panel?.technology?.technologyPanel}</td>
                                            <td className="border border-gray-300 p-2 text-center">{panel?.constructive?.constructiveType}</td>
                                            <td className="border border-gray-300 p-2 text-center">{panel?.watt?.watt}</td>

                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <table className="mx-auto w-[90%] border mt-10">
                            <thead>
                                <tr className=" bg-red-800 text-white text-xs text-left">
                                    <th className="p-3  text-xs border border-black">S.No</th>
                                    <th className="p-3  text-xs border border-black">Item Description</th>
                                    <th className="p-3 border border-black">Rate Per Watt </th>
                                    <th className="p-3 border border-black">Quantity</th>
                                    <th className="p-3 border border-black"> <span className='flex flex-row'><IndianRupee className='' /> Amount </span> </th>
                                    <th className="p-3 border border-black"> <span className='flex flex-row'><IndianRupee className='' /> GST {panelData?.gst}% </span></th>
                                    <th className="p-3 border border-black"> <span className='flex flex-row'><IndianRupee className='' /> Amount + Gst</span></th>
                                </tr>
                            </thead>

                            <tbody className="text-sm">
                                {
                                    panelProposal?.selectedPanels?.map((panel, idx) => (
                                        // console.log("panel : ", panel),
                                        <tr>
                                            <td className="border border-gray-300 p-2 text-center">{idx + 1}</td>
                                            <td className="border border-gray-300 p-2 text-center">{`${panel?.watt?.watt} ,${panel?.panelType?.panelType},${panel?.technology?.technologyPanel},${panel?.constructive?.constructiveType}`}</td>
                                            <td className="border border-gray-300 p-2 text-center">{panel?.rate.toLocaleString()}</td>
                                            <td className="border border-gray-300 p-2 text-center">{panel?.quantity.toLocaleString()}</td>
                                            <td className="border border-gray-300 p-2 text-center"> {panel?.totalPrice.toLocaleString()}</td>
                                            <td className="border border-gray-300 p-2 text-center"> {panel?.gstAmount.toLocaleString()}</td>
                                            <td className="border border-gray-300 p-2 text-center"> {(panel?.totalPrice + panel?.gstAmount).toLocaleString()}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>


                            <tr className="bg-gray-100 font-semibold">
                                <td colSpan={6} className="border border-gray-300 p-2 text-right">
                                    <i class="fa-solid fa-indian-rupee-sign"></i> Total Amount
                                </td>
                                <td className='border border-gray-300 p-2 text-red-600 text-right'> {(panelProposal?.finalPrice).toLocaleString("en-IN")}</td>
                            </tr>

                        </table>
                    </div>
                </div >
            </PdfComp >

            <PdfComp bg={pages[9]}>
                <div className="absolute text-red-500 scale-150 top-[5mm] right-[20mm] overflow-hidden max-w-30  h-18  flex items-center justify-center">
                    {data?.companyLogo ?
                        <img loading='lazy' src={data?.companyLogo} alt="" className='object-cover w-22' />
                        :
                        <h1 className='uppercase'>{data?.companyName}</h1>
                    }
                </div>
                <div className='pt-10 '>
                    <div
                        className=" max-w-none space-y-3 ml-5 mt-52"
                        dangerouslySetInnerHTML={{ __html: panelData?.termsAndConditions }}
                    >
                    </div>
                </div>

            </PdfComp>

            {
                panelProposal?.selectedPanels?.flatMap(panel => panel?.watt?.imgWatt || [])?.map((item, index) => {
                    const pageIndex = 10 + index;

                    if (!pages[pageIndex]) return null;

                    return (
                        <PdfComp key={index} bg={pages[pageIndex]}>
                            <div className="absolute top-[40mm] left-[20mm] w-[170mm]">
                                {/* <img
                                        src={item}
                                        className="w-full object-contain"
                                    /> */}
                            </div>
                        </PdfComp>
                    );
                })
            }

            <PdfComp bg={pages[pages.length - 1]}>
                <div className="absolute text-red-500 scale-150 top-[8mm] left-[22mm]  w-40 h-25  overflow-hidden flex items-center justify-center">
                    {/* <img loading='lazy' src={data?.companyLogo} alt="" className='w-2/3 object-cover ' /> */}
                    {data?.companyLogo ?
                        <img loading='lazy' src={data?.companyLogo} alt="" className=' w-2/3 object-cover ' />
                        :
                        <h1 className='uppercase'>{data?.companyName}</h1>
                    }
                </div>

                <div className="absolute top-[5mm] right-[7mm]  text-end">
                    <div className='text-white'>

                        <span className='capitalize inline-block text-lg'>
                            {data.companyName}
                        </span>

                        <br />
                        <span className=' inline-block text-md'>
                            {data.email}
                        </span>
                        <br />
                        <span className='capitalize inline-block text-md'>
                            {data.contactNumber}
                        </span>
                        <br />
                        <span className='capitalize inline-block text-md'>
                            {data.gstin}
                        </span>
                        <br />
                        <span className='capitalize max-w-96  inline-block text-xs'>
                            {data.address}
                        </span>
                        <br />

                    </div>
                </div>
            </PdfComp>

        </div >
    )
}



export default PanelPropsalView