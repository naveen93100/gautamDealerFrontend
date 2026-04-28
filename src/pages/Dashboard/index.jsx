import React, { useCallback, useEffect, useState } from 'react';
import { Plus, Download, Calendar, DollarSign, Zap, TrendingUp, Sun, Loader2Icon, MapPin, Mail, Phone, IndianRupee, Edit, User } from 'lucide-react';
import Profile from './Profile';
import CreateProposalModal from '../../components/Ui/CreateProposalModal';
import { apiCall } from '../../services/api';
import { useAuth } from '../../Context/AuthContext';

import MainPage from '../../components/common/MainPage';

import "./index.css";
import { data, useLocation, useNavigate } from 'react-router-dom';
import CreatePannelPropsal from '../../components/Ui/createPannelPropsal';
import ClientSection from './Layout/ClientSection';

const SolarDealerDashboard = () => {

  const [proposals, setProposals] = useState([]);

  const { user, token } = useAuth()

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(false)
  const [select, setSelect] = useState(null);
  const [printP, setPrintP] = useState(false)
  const [proposalsImages, setProposalsImages] = useState([]);
  const [proposalData, setProposalData] = useState(null);

  const [createPanelProp, setCreatePanelProp] = useState(false);
  const [createEmpPanel, setCreateEmpPanel] = useState(false);
  const navigate = useNavigate();


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
     <div  className=" mt-24 dont-print min-h-screen bg-linear-to-br from-red-50 via-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
       <Profile />

       {/* create client */}

       <ClientSection/>
      </div>
     </div>
    </>
  );
};

export default SolarDealerDashboard;
