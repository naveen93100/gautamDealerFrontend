import React, { useCallback, useEffect, useState } from 'react';
import { Plus, Download, Calendar, DollarSign, Zap, TrendingUp, Sun, Loader2Icon, MapPin, Mail, Phone, IndianRupee, Edit, User } from 'lucide-react';
import Profile from './Profile';
import CreateProposalModal from '../../components/Ui/CreateProposalModal';
import { apiCall } from '../../services/api';
import { useAuth } from '../../Context/AuthContext';

import MainPage from '../../components/common/MainPage';

import "./index.css";

const SolarDealerDashboard = () => {

  const [proposals, setProposals] = useState([]);

  const { user, token } = useAuth()

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(false)
  const [select, setSelect] = useState(null);
  const [printP, setPrintP] = useState(false)

  const [proposalData, setProposalData] = useState(null);


  const fetchProposal = useCallback(async () => {
    try {
      let res = await apiCall('GET', `/api/dealer/get-proposal/${user?.id}`);
      if (res?.data?.success) {
        setProposals(res?.data?.customersProposal);
      }

    } catch (er) {
      console.log(er);
    }
  }, [user?.id])

  useEffect(() => {
    fetchProposal();
  }, [fetchProposal]);

  const customFunc = (proposal) => {

    setProposalData(proposal)

    const originalTitle = document.title;
    document.title = `${proposal?.name}_Proposal`;


    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.print();
        setTimeout(() => {
          document.title = originalTitle;
        }, 500);
      })
    });
  }

  return (
    <>
      <div className="dont-print min-h-screen bg-linear-to-br from-red-50 via-orange-50 to-white">
        {/* Header */}


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {/* Profile Section */}
          <Profile />

          {/* Proposals Section */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8 border border-gray-300 shadow-gray-400">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 ">
              <h3 className="text-xl sm:text-2xl flex items-center justify-center gap-2 font-bold text-gray-800">Solar Proposals

              </h3>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors w-full sm:w-auto shadow-md "
              >
                <Plus className="w-5 h-5" />
                Create Proposal
              </button>
            </div>

            <div className="grid gap-4">
              {proposals.length > 0 && proposals.map((proposal) => (
                <div
                  key={proposal?._id}
                  className="border-2 border-gray-300  rounded-xl p-4 sm:p-6 shadow-lg hover:border-red-300 transition-all shadow-red-200"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                        <User className="w-5 h-5 text-red-600 flex shrink-0" />
                        <h4 className="text-base sm:text-lg font-semibold text-gray-800 capitalize">
                          {proposal?.name}
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Zap className="w-4 h-4 text-red-600 flex shrink-0" />
                          <span className="font-medium">System:</span>
                          <span>{proposal?.proposalsData[0]?.orderCapacity} watts</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 text-red-600 flex shrink-0" />
                          <span className="font-medium">Date:</span>
                          <span>{new Date(proposal?.proposalsData[0]?.proposalDate).toDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <IndianRupee className="w-4 h-4 text-red-600 flex shrink-0" />
                          <span className="font-medium">Total Price:</span>
                          <span>{proposal?.proposalsData[0]?.finalPrice}</span>
                        </div>
                        <div className="flex  items-center gap-2 text-sm text-gray-600 ">
                          <MapPin className="w-4 h-4 text-red-600 flex shrink-0" />
                          <span className="font-medium">Address:</span>
                          <span>{proposal?.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4 text-red-600 flex shrink-0" />
                          <span className="font-medium">Email:</span>
                          <span>{proposal?.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-red-600 flex shrink-0" />
                          <span className="font-medium">Contact Number:</span>
                          <span>{proposal?.phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* edit  */}
                    <button
                      onClick={(e) => {
                        setSelect(proposal)
                        setShowCreateModal(true);
                      }
                      }
                      className={`flex items-center justify-center gap-2 px-4 py-2 text-red-600 border border-red-600 hover:bg-red-50 rounded-lg transition-colors w-full sm:w-auto sm:self-end ${loading ? "cursor-not-allowed text-red-300" : ""}`}
                    >
                      <span className='flex items-center gap-2'>
                        <Edit className="w-4 h-4" />
                        Edit Proposal
                      </span>
                    </button>
                    {/* download */}
                    <button
                      onClick={() => customFunc(proposal)
                        //   (e) => {
                        //   // setSelect(proposal?.proposalsData[0])
                        //   // navigate('/ui');
                        //   // handleDownload(e, proposal?.proposalsData[0]?._id, proposal?.name)
                        //   setProposalData(proposal)
                        //   setPrintP(true);
                        //   setTimeout(
                        //     ()=>window.print(),
                        //   1000);

                        //   // setTimeout(() => {
                        //   //   handlePrint();
                        //   // }, 1000);

                        //   // handleDownload(e, proposal)
                        // }
                      }
                      className={`flex items-center justify-center gap-2 px-4 py-2 text-red-600 border border-red-600 hover:bg-red-50 rounded-lg transition-colors w-full sm:w-auto sm:self-end ${loading ? "cursor-not-allowed text-red-300" : ""}`}
                    >
                      {loading
                        && select?._id === proposal?.proposalsData[0]?._id
                        ?
                        <Loader2Icon className='animate-spin' />
                        :
                        <span className='flex items-center gap-2'>
                          <Download className="w-4 h-4" />
                          Download Proposal
                        </span>
                      }
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
          <CreateProposalModal setClose={setShowCreateModal} proposalData={fetchProposal} data={select} setData={setSelect} />
        )}

      </div>
      {proposalData &&
        <div id='PrintData' className='print-this'>
          <MainPage proposalDatas={proposalData} printP={printP} />
        </div>
      }
    </>
  );
};

export default SolarDealerDashboard;