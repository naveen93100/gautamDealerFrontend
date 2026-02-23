// import { ArrowLeft, File, FileSpreadsheet } from 'lucide-react';
// import { useState } from 'react';
// import toast from 'react-hot-toast';
// import { useLocation, useNavigate } from 'react-router-dom'
// import { apiCall } from '../services/api';


// const DealerList = () => {
//     const { state: { data } } = useLocation();
//     const navigate = useNavigate();


//     const [page, setPage] = useState(0);
//     const LIMIT = 9;
//     const start = page * LIMIT;
//     const end = start + LIMIT;

//     const d = data.slice(start, end);

//     const handleDownloadExcel = async () => {
//         try {

//             let res = await apiCall('GET', '/adminPanel/excel-download', null, { responseType: 'blob' });

//             const blob = new Blob([res.data], {
//                 type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//             });

//             const url = window.URL.createObjectURL(blob);
//             const link = document.createElement("a");

//             link.href = url;
//             link.download = "dealer.xlsx";
//             document.body.appendChild(link);

//             link.click();

//             document.body.removeChild(link);
//             window.URL.revokeObjectURL(url);

//         } catch (er) {
//             console.log(er);
//             toast.error('Something went wrong While downloading Excel');

//         }
//     }

//     return (
//         <div className="min-h-screen bg-gray-100 rounded-2xl p-6 relative">

//             {/* Header */}
//             <button onClick={() => {
//                 navigate(-1)
//             }} className='bg-sky-200 rounded-2xl p-1 cursor-pointer'>
//                 <ArrowLeft />
//             </button>

//             <div className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
//                 <h1 className="text-3xl font-bold text-gray-800">
//                     Dealer List
//                 </h1>
//             </div>

//             {/* Dealer Grid */}
//             <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-screen overflow-y-auto hide-scrollbar w-full p-3">
//                 {d?.map((dealer) => (
//                     <div
//                         key={dealer._id}
//                         className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 p-6 border border-gray-100"
//                     >
//                         <div className="flex items-center justify-between mb-4">
//                             <h2 className="text-md capitalize  font-semibold text-gray-800">
//                                 {dealer.firstName}
//                             </h2>
//                             <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">

//                             </span>
//                         </div>

//                         <div className="space-y-2 text-sm text-gray-600">
//                             <p className='break-all overflow-hidden'>
//                                 <span className="font-medium text-sm text-gray-700">CompanyName:</span>{" "}
//                                 {dealer.companyName}
//                             </p>
//                             <p className='break-all overflow-hidden'>
//                                 <span className="font-medium text-sm text-gray-700">Email:</span>{" "}
//                                 {dealer.email}
//                             </p>
//                             <p className='break-all overflow-hidden'>
//                                 <span className="font-medium text-sm text-gray-700">Phone:</span>{" "}
//                                 {dealer.contactNumber}
//                             </p>
//                         </div>
//                     </div>
//                 ))}

//             </div>
//             {/* pagination */}
//             <div className="flex items-center justify-center gap-4 mt-6">
//                 <button
//                     disabled={start === 0}
//                     onClick={() => setPage(prev => prev - 1)}
//                     className="
//       px-4 py-2
//       rounded-lg
//       border border-gray-300
//       bg-white
//       text-gray-700
//       font-medium
//       shadow-sm
//       transition
//       hover:bg-gray-100
//       active:scale-95
//       disabled:opacity-40
//       disabled:cursor-not-allowed
//     "
//                 >
//                     Prev
//                 </button>

//                 <button
//                     disabled={end >= data.length}
//                     onClick={() => setPage(prev => prev + 1)}
//                     className="
//                     px-4 py-2
//                     rounded-lg
//                     bg-blue-600
//                     text-white
//                     font-medium
//                     shadow-sm
//                     transition
//                     hover:bg-blue-700
//                     active:scale-95
//                     disabled:bg-blue-300
//                     disabled:cursor-not-allowed
//                     "
//                 >
//                     Next
//                 </button>
//             </div>
//             <button onClick={handleDownloadExcel} className='flex cursor-pointer hover:scale-90 transition-all ease-linear items-center bg-linear-to-l absolute top-10 right-10 from-emerald-400 to-emerald-500 text-white rounded-2xl p-2 text-xs font-semibold'>
//                 <FileSpreadsheet />
//                 Download Excel
//             </button>
//         </div>
//     );
// };

// export default DealerList;

import { ArrowLeft, File, FileSpreadsheet } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom'
import { apiCall } from '../services/api';


const DealerList = () => {
    const { state: { data } } = useLocation();
    const navigate = useNavigate();


    const [page, setPage] = useState(0);
    const LIMIT = 9;
    const start = page * LIMIT;
    const end = start + LIMIT;

    const d = data.slice(start, end);

    const handleDownloadExcel = async () => {
        try {

            let res = await apiCall('GET', '/adminPanel/excel-download', null, { responseType: 'blob' });

            const blob = new Blob([res.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = "dealer.xlsx";
            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

        } catch (er) {
            console.log(er);
            toast.error('Something went wrong While downloading Excel');

        }
    }

    return (
        <div className="min-h-screen bg-gray-100 rounded-2xl p-6 relative">

            {/* Header */}
            <button onClick={() => {
                navigate(-1)
            }} className='bg-sky-200 rounded-2xl p-1 cursor-pointer'>
                <ArrowLeft />
            </button>

            <div className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">
                    Dealer List
                </h1>
            </div>

            {/* Dealer Grid */}
            <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-screen overflow-y-auto hide-scrollbar w-full p-3">
                {d?.map((dealer) => (
                    <div
                        key={dealer._id}
                        className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 p-6 border border-gray-100"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-md capitalize  font-semibold text-gray-800">
                                {dealer.firstName}
                            </h2>
                            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">

                            </span>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                            <p className='break-all overflow-hidden'>
                                <span className="font-medium text-sm text-gray-700">CompanyName:</span>{" "}
                                {dealer.companyName}
                            </p>
                            <p className='break-all overflow-hidden'>
                                <span className="font-medium text-sm text-gray-700">Email:</span>{" "}
                                {dealer.email}
                            </p>
                            <p className='break-all overflow-hidden'>
                                <span className="font-medium text-sm text-gray-700">Phone:</span>{" "}
                                {dealer.contactNumber}
                            </p>
                        </div>
                    </div>
                ))}

            </div>
            {/* pagination */}
            <div className="flex items-center justify-center gap-4 mt-6">
                <button
                    disabled={start === 0}
                    onClick={() => setPage(prev => prev - 1)}
                    className="
      px-4 py-2
      rounded-lg
      border border-gray-300
      bg-white
      text-gray-700
      font-medium
      shadow-sm
      transition
      hover:bg-gray-100
      active:scale-95
      disabled:opacity-40
      disabled:cursor-not-allowed
    "
                >
                    Prev
                </button>

                <button
                    disabled={end >= data.length}
                    onClick={() => setPage(prev => prev + 1)}
                    className="
                    px-4 py-2
                    rounded-lg
                    bg-blue-600
                    text-white
                    font-medium
                    shadow-sm
                    transition
                    hover:bg-blue-700
                    active:scale-95
                    disabled:bg-blue-300
                    disabled:cursor-not-allowed
                    "
                >
                    Next
                </button>
            </div>
            <button onClick={handleDownloadExcel} className='flex cursor-pointer hover:scale-90 transition-all ease-linear items-center bg-linear-to-l absolute top-10 right-10 from-emerald-400 to-emerald-500 text-white rounded-2xl p-2 text-xs font-semibold'>
                <FileSpreadsheet />
                Download Excel
            </button>
        </div>
    );
};

export default DealerList;