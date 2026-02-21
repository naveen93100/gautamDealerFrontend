import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'


const DealerList = () => {
    const { state: { data } } = useLocation();
    const navigate = useNavigate();


    const [page, setPage] = useState(0);
    const LIMIT = 9;
    const start = page * LIMIT;
    const end = start + LIMIT;

    const d = data.slice(start, end);

    return (
        <div className="min-h-screen bg-gray-100 rounded-2xl p-6">

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
                            <p>
                                <span className="font-medium text-sm text-gray-700">CompanyName:</span>{" "}
                                {dealer.companyName}
                            </p>
                            <p>
                                <span className="font-medium text-sm text-gray-700">Email:</span>{" "}
                                {dealer.email}
                            </p>
                            <p>
                                <span className="font-medium text-sm text-gray-700">Phone:</span>{" "}
                                {dealer.contactNumber}
                            </p>
                        </div>


                    </div>
                ))}

            </div>
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
                    disabled={end >= d.length}
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
        </div>
    );
};

export default DealerList;