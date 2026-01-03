
import PdfComp from './PdfComp'
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { ArrowLeft, Download } from 'lucide-react';

const pages = [
    '/j1.png',
    '/j2.png',
    '/j3.png',
    '/j4.png',
    '/j5.png',
    '/j6.png',
    '/j7.png',
    '/j8.png',
    '/j9.png',
    '/j10.png',
];

// const pages = [
//     'https://gautamsolar.us/proposal_images/j1.jpg',
//     'https://gautamsolar.us/proposal_images/j2.jpg',
//     'https://gautamsolar.us/proposal_images/j3.jpg',
//     'https://gautamsolar.us/proposal_images/j4.jpg',
//     'https://gautamsolar.us/proposal_images/j5.jpg',
//     'https://gautamsolar.us/proposal_images/j6.jpg',
//     'https://gautamsolar.us/proposal_images/j7.jpg',
//     'https://gautamsolar.us/proposal_images/j8.jpg',
//     'https://gautamsolar.us/proposal_images/j9.jpg',
//     'https://gautamsolar.us/proposal_images/j10.jpg',
// ];




const MainPage = ({ printP }) => {
    const { state } = useLocation();
    const { user } = useAuth()
    const proposalDatas = state

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

    const proposalsData = {
        rate: proposalDatas?.proposalsData[0]?.rate,
        orderCapacity: proposalDatas?.proposalsData[0]?.orderCapacity,
        termsAndConditions: proposalDatas?.proposalsData[0]?.termsAndConditions,
        proposalDate: proposalDatas?.proposalsData[0]?.proposalDate,
        price: proposalDatas?.proposalsData[0]?.price,
        finalPrice: proposalDatas?.proposalsData[0]?.finalPrice,
        gstAmt: proposalDatas?.proposalsData[0]?.gstAmt,
        material: proposalDatas?.proposalsData[0]?.material,
        tax: proposalDatas?.proposalsData[0]?.tax
    }


    return (

        <>
            <div className="flex flex-col gap-6 bg-gray-200 ">
                <button
                    onClick={() => window.history.back()}
                    className=" fixed bottom-6 left-18 z-50 flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200
    print:hidden
  "
                >
                    <ArrowLeft/> Go Back
                </button>
                <button
                    onClick={() => window.print()}
                    className="
    fixed bottom-6 right-6 z-50
    flex items-center gap-2
    bg-red-600 hover:bg-red-700
    text-white font-medium
    px-5 py-3 rounded-full
    shadow-lg hover:shadow-xl
    transition-all duration-200
    print:hidden
  "
                >
                    <Download className="w-5 h-5" />
                    Download
                </button>

                <PdfComp bg={pages[0]}>
                    <div className="absolute text-red-500 scale-150 top-[17mm] left-[22mm]   max-w-35 max-h-18 flex items-center justify-center">
                        <img loading='lazy' src={data?.companyLogo} alt="" className='h-auto object-contain' />
                    </div>

                    <div className="absolute top-[5mm] right-[3mm]  text-end">
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

                    <div className="absolute text-black top-[189mm] right-[95mm]  min-w-96   ">
                        <span className='capitalize inline-block font-semibold'>
                            {customerData.name}
                        </span>
                        <br />
                        <span className='text-[12px] font-semibold'>
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
                        <span className='inline-block text-sm font-semibold'>
                            For
                            {' '}
                            <span className='text-red-800'>
                                {`${proposalsData?.orderCapacity / 1000} kW`}
                            </span>
                            {' '}
                            Solar Power Plant
                        </span>
                    </div>
                </PdfComp>

                <PdfComp bg={pages[1]}>
                    <div className="absolute text-red-500 scale-150 top-[10mm] right-[20mm]  max-w-27 max-h-18  flex items-center justify-center">
                        <img loading='lazy' src={data?.companyLogo} alt="" className=' object-contain w-full h-full' />
                    </div>
                </PdfComp>

                <PdfComp bg={pages[2]}>
                    <div className="absolute text-red-500 scale-150 top-[10mm] right-[20mm]  max-w-27 max-h-18 flex items-center justify-center">
                        <img loading='lazy' src={data?.companyLogo} alt="" className=' h-full  object-contain' />
                    </div>
                </PdfComp>

                <PdfComp bg={pages[3]}>
                    <div className="absolute text-red-500 scale-150 top-[10mm] right-[20mm]  max-w-27 max-h-18 flex items-center justify-center">
                        <img loading='lazy' src={data?.companyLogo} alt="" className='h-full  object-contain' />
                    </div>
                </PdfComp>

                <PdfComp bg={pages[4]}>
                    <div className="absolute text-red-500 scale-150 top-[10mm] right-[20mm]  max-w-27 max-h-18 flex items-center justify-center">
                        <img loading='lazy' src={data?.companyLogo} alt="" className='h-full  object-contain' />
                    </div>
                </PdfComp>

                <PdfComp bg={pages[5]}>
                    <div className="absolute text-red-500 scale-150 top-[10mm] right-[20mm]  max-w-27 max-h-18 flex items-center justify-center ">
                        <img loading='lazy' src={data?.companyLogo} alt="" className='h-full  object-contain' />
                    </div>
                </PdfComp>

                <PdfComp bg={pages[6]}>
                    <div className="absolute text-red-500 scale-150 top-[10mm] right-[20mm]  max-w-27 max-h-18 flex items-center justify-center">
                        <img loading='lazy' src={data?.companyLogo} alt="" className='h-full  object-contain' />
                    </div>
                </PdfComp>

                <PdfComp bg={pages[7]}>
                    <div className="absolute text-red-500 scale-150 top-[10mm] right-[20mm]  max-w-27 max-h-18 flex items-center justify-center">
                        <img loading='lazy' src={data?.companyLogo} alt="" className='h-full  object-contain' />
                    </div>

                    <div className='absolute top-[75mm] px-4'>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-black">
                                <thead>
                                    <tr className=" bg-red-800 text-white text-left">
                                        <th className="p-3 border border-black">Component</th>
                                        <th className="p-3 border border-black">Specifications</th>
                                        <th className="p-3 border border-black">Qty / Units</th>
                                    </tr>
                                </thead>

                                <tbody className="text-sm">

                                    <tr className='bg-white'>
                                        <td className="p-3 font-semibold border border-black">
                                            ALMM & BIS Approved Gautam Solar&apos;s PV Modules
                                        </td>
                                        <td className="p-3 border border-black">
                                            Fully compliant with Indian regulations, these systems are certified for quality, safety, and performance, ensuring reliable and dependable operation for long-term project deployment.
                                        </td>
                                        <td className="p-3 border border-black">{`${proposalsData?.orderCapacity / 1000}`} kW</td>
                                    </tr>

                                    {proposalsData?.material?.length > 1 && proposalsData?.material.map((item, idx) => (

                                        <tr key={item?.mId} className={`${idx % 2 == 0 ? 'bg-red-50' : 'bg-white'}`}>
                                            <td className="p-3 font-semibold border border-black">
                                                {item?.materialData?.name}
                                            </td>
                                            <td className="p-3 border border-black">
                                                {item?.materialData?.specification}
                                            </td>
                                            <td className="p-3 border border-black">{`${item?.quantity}`} {`${item?.materialData?.unit}`}</td>
                                        </tr>

                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </PdfComp>

                <PdfComp bg={pages[8]}>
                    <div className="absolute  scale-150 top-[12mm] right-[20mm]">
                        {/* <img loading='lazy' src={data?.companyLogo} alt="" className='w-20 h-20 object-contain' /> */}
                    </div>

                    <div className="max-w-4xl absolute top-[30mm] mx-auto p-6 space-y-6 text-sm">

                        {/* TABLE */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300 text-left">
                                <thead className="bg-red-800 text-white">
                                    <tr>
                                        <th className="border border-gray-300 p-2 w-16">S.No</th>
                                        <th className="border border-gray-300 p-2">ITEM</th>
                                        <th className="border border-gray-300 p-2 w-32">Unit Price</th>
                                        <th className="border border-gray-300 p-2 w-32">Total Price
                                            (Rs)
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 p-2 text-center">1</td>
                                        <td className="border border-gray-300 p-2 font-semibold capitalize">
                                            Supply, Installation and Commissioning of
                                            <span className='text-red-800'>
                                                {` ${proposalsData?.orderCapacity / 1000}`} kW
                                            </span> {' '}
                                            Solar Power Plant at ({`${customerData?.address} `})

                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            ₹ {`${proposalsData?.rate}`}/watts
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            ₹{`${proposalsData?.price?.toLocaleString()}`}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="3" className="border border-gray-300 p-2 font-semibold text-right">
                                            Tax( {`${proposalsData?.tax}%`})
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            ₹{`${proposalsData?.gstAmt?.toLocaleString()}`}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="3" className="border border-gray-300 p-2 font-bold text-right">
                                            Total Amount
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            ₹{`${proposalsData?.finalPrice?.toLocaleString()}`}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* PAYMENT TERMS */}
                        <div className='pt-10 border-t-1'>
                            <div
                                className=" max-w-none space-y-3"
                                dangerouslySetInnerHTML={{ __html: proposalsData?.termsAndConditions }}
                            ></div>
                        </div>

                    </div>
                </PdfComp>

                <PdfComp bg={pages[9]}>
                    <div className="absolute text-red-500 scale-150 top-[17mm] left-[22mm]   max-w-35 max-h-18 flex items-center justify-center">
                        <img loading='lazy' src={data?.companyLogo} alt="" className='h-auto object-contain' />
                    </div>

                    <div className="absolute top-[5mm] right-[3mm]  text-end">
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

            </div>

        </>

    )
}

export default MainPage