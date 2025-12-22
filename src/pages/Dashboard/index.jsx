import React, { useEffect, useState } from 'react';
import { Plus, Download, Calendar, DollarSign, Zap, TrendingUp, Sun } from 'lucide-react';
import { X, User, Mail, Phone, MapPin, Package } from 'lucide-react';
import Profile from './Profile';
import CreateProposalModal from '../../components/Ui/CreateProposalModal';
import { apiCall } from '../../services/api';
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const SolarDealerDashboard = () => {

  const [proposals, setProposals] = useState([]);

  const { user } = useAuth()

  const [showCreateModal, setShowCreateModal] = useState(false);

  // const handleDownload = async (id) => {
  //   try {
  //     const response = await apiCall("get", `/api/dealer/downloadPropsoal`, {
  //       responseType: "blob",
  //     });
  //     const url = window.URL.createObjectURL(
  //       new Blob([response.data], { type: "application/pdf" })
  //     );

  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "Solar_Proposal.pdf");
  //     document.body.appendChild(link);
  //     link.click();

  //     link.remove();
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.log("error : ", error)
  //   }
  // }

  const handleDownload = async () => {
    try {
      const response = await apiCall(
        "get",
        "/api/dealer/downloadPropsoal",
        {
          responseType: "blob",
        }
      );

      console.log(response.headers["content-type"]);
      console.log("response : ", response)

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "Solar_Proposal.pdf";
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };


  useEffect(() => {
    const fetchProposal = async () => {
      try {
        let res = await apiCall('GET', `/api/dealer/get-proposal/${user?.id}`);
        console.log(res);
        if (res?.data?.success) {
          setProposals(res?.data?.customersProposal);
        }

      } catch (er) {
        console.log(er);
      }
    }
    fetchProposal();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Profile Section */}
        <Profile />

        {/* Proposals Section */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-xl sm:text-2xl flex items-center justify-center gap-2 font-bold text-gray-800">Solar Proposals

              {/* <p className="text-2xl font-bold text-gray-800">({stats.totalProposals})</p> */}
            </h3>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors w-full sm:w-auto shadow-md"
            >
              <Plus className="w-5 h-5" />
              Create Proposal
            </button>
          </div>

          <div className="grid gap-4">
            {proposals.length > 0 && proposals.map((proposal) => (
              <div
                key={proposal?._id}
                className="border-2 border-gray-100 rounded-xl p-4 sm:p-6 hover:shadow-lg hover:border-red-200 transition-all"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                      <Sun className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <h4 className="text-base sm:text-lg font-semibold text-gray-800 capitalize">
                        {proposal?.name}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Zap className="w-4 h-4 text-red-600 flex-shrink-0" />
                        <span className="font-medium">System:</span>
                        <span>{proposal?.proposalsData[0]?.orderCapacity}kwh</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-red-600 flex-shrink-0" />
                        <span className="font-medium">Date:</span>
                        <span>{new Date(proposal?.proposalsData[0]?.proposalDate).toDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 text-red-600 flex-shrink-0" />
                        <span className="font-medium">Total Price:</span>
                        <span>{proposal?.proposalsData[0]?.finalPrice}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 text-red-600 flex-shrink-0" />
                        <span className="font-medium">Address:</span>
                        <span>{proposal?.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 text-red-600 flex-shrink-0" />
                        <span className="font-medium">Email:</span>
                        <span>{proposal?.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 text-red-600 flex-shrink-0" />
                        <span className="font-medium">Contact Number:</span>
                        <span>{proposal?.phone}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    // onClick={() => handleDownload(proposal?.proposalsData[0]?._id)}
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-red-600 border border-red-600 hover:bg-red-50 rounded-lg transition-colors w-full sm:w-auto sm:self-end"
                  >
                    <Download className="w-4 h-4" />
                    Download Proposal
                  </button>
                </div>
              </div>
            ))}

            {proposals.length == 0 &&
              <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed border-gray-300 rounded-lg p-6 m-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Proposal Created Yet</h2>
                <p className="text-gray-500 mb-4">It looks like you haven't created any proposals so far.</p>

              </div>
            }
          </div>
        </div>
      </div>

      {/* Create Proposal Modal */}
      {showCreateModal && (
        <CreateProposalModal setClose={setShowCreateModal} />
      )}



    </div>
  );
};

export default SolarDealerDashboard;