// import React, { useState } from "react";
// import {
//     X,
//     User,
//     Phone,
//     Mail,
//     MapPin,
//     Zap,
//     MessageCircle,
//     Plus,
//     PanelsTopLeft,
//     PanelTop,
//     Sun,
// } from "lucide-react";

// import JoditEditor from "jodit-react";
// import SalesPanelSelector from "./SalesPanelSelector";
// const CreateSalesPanelProposal = ({ onClose }) => {
//     const [selectedPanel, setSelectedPanel] = useState(null);

//     const [form, setForm] = useState({
//         customerName: "",
//         email: "",
//         phone: "",
//         address: "",
//         capacity: "",
//         gst: 8.9,
//     });
//     const [body, setBody] = useState(`
//          <h3><strong>Payment Terms</strong></h3>
//               <ul>
//               <li><strong>20% advance</strong> at the time of order confirmation.</li>
//               <li><strong>75% payment</strong> upon delivery of material at site.</li>
//               <li><strong>5% balance</strong> after completion of net metering.</li>
//               <li>Net metering licensing and documentation will be handled by our team.</li>
//               <li>Any applicable net metering charges will be charged separately.</li>
//               </ul>
  
//               <h3><strong>Mode of Payments</strong></h3>
//               <p>
//               Kindly transfer the advance amount through any of the following modes: <br>
//               <strong>Bank Transfer:</strong> [Bank Account Number] <br>
//               <strong>UPI:</strong> [UPI ID]
//               </p>
  
//               <br>
  
//               <h3 style="background-color:#a20000; color:#fff; display:inline-block;">
//               <strong>Terms and Conditions:</strong>
//               </h3>
  
//               <p><strong>A) Scope &amp; Design Basis:</strong></p>
//               <p>
//               The proposal is prepared based on a standard system/design configuration. Any changes or deviations in scope, layout, specifications, or quantities may result in additional costs.
//               </p>
  
//               <p><strong>B) Validity of Quotation:</strong></p>
//               <p>
//               This quotation is valid for <strong>7 days</strong> from the date of issue.
//               </p>
  
//               <p><strong>C) WARRANTY:</strong></p>
//               <p>
//               <strong>5 Year warranty</strong> on Solar System.
//               </p>
  
//               <p style="font-size: 14px; color: #555;">
//               <em>
//                   The above warranties cover manufacturing defects, premature material degradation, and equipment failures.
//               </em>
//               </p>
//   `);

 

//     const totalWatt = Number(form.capacity || 0) * 1000;

//     const baseAmount = totalWatt * Number(selectedPanel?.rate || 0);

//     const gstAmount = (baseAmount * Number(form.gst || 0)) / 100;

//     const grandTotal = baseAmount + gstAmount;

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const payload = {
//             ...form,
//             selectedPanel,
//             terms: body,
//             baseAmount,
//             gstAmount,
//             grandTotal,
//         };

//         console.log(payload);
//         alert("Proposal Created");
//         onClose();
//     };

//     const joditConfig = {
//         readonly: false,
//         height: 250,
//         toolbarAdaptive: false,
//     };

//     return (
//         <div className="fixed inset-0 z-999 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
//             <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden">
//                 {/* Header */}
//                 <div className="bg-[#a20000] text-white px-6 py-5 flex items-center justify-between">
//                     <div>
//                         <h2 className="text-2xl font-bold">
//                             Create Sales Proposal
//                         </h2>

//                         <p className="text-sm text-red-100">
//                             Fill customer and panel details
//                         </p>
//                     </div>

//                     <button
//                         onClick={onClose}
//                         className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
//                     >
//                         <X size={20} />
//                     </button>
//                 </div>

//                 {/* Form */}
//                 <form
//                     onSubmit={handleSubmit}
//                     className="p-6 max-h-[85vh] overflow-y-auto"
//                 >
//                     {/* Selector */}
//                     <SalesPanelSelector
//                         selectedPanel={selectedPanel}
//                         setSelectedPanel={setSelectedPanel}
//                     />

//                     {/* Terms */}
//                     <div className="mb-6">
//                         <div className="flex items-center gap-2 mb-3">
//                             <MessageCircle size={18} className="text-red-600" />
//                             <h3 className="font-semibold">
//                                 Terms & Conditions
//                             </h3>
//                         </div>

//                         <JoditEditor
//                             value={body}
//                             config={joditConfig}
//                             onBlur={(newContent) => setBody(newContent)}
//                         />
//                     </div>

//                     {/* Footer */}
//                     <div className="flex flex-col sm:flex-row gap-3">
//                         <button
//                             type="button"
//                             onClick={onClose}
//                             className="sm:flex-1 border py-3 rounded-xl"
//                         >
//                             Cancel
//                         </button>

//                         <button
//                             type="submit"
//                             className="sm:flex-1 bg-[#a20000] hover:bg-red-800 text-white py-3 rounded-xl"
//                         >
//                             Create Proposal
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };




















import { IndianRupee, Mail, MessageCircle, Phone, Sun, User, X } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast';
import { apiCall } from '../../services/api';
import SalesPanelSelector from './SalesPanelSelector';
import JoditEditor from 'jodit-react';
import { useAuth } from '../../Context/AuthContext';

const CreateSalesPanelProposal = ({ onClose, proposalData, data = {}, setData }) => {
    console.log("DATA ",data)

  const [loading, setLoading] = useState(false);
  // const { user, token } = useAuth();
  const [panelData, setPanelData] = useState();
  const [technologyData, setTechnologyData] = useState();
  const [constructiveData, setConstructiveData] = useState();
  const [panelWatt, setPanelWatt] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [createPanelData, setCreatePanelData] = useState({
    customerName: "",
    gst: 5
  })

  const dealerId = JSON.parse(localStorage.getItem("userData"))?.id;

  const [selectPanel, setSelectPanel] = useState(
    [{
      panelId: "",
      technologyId: "",
      constructiveId: "",
      wattId: "",
      quantity: 1,
      rate: 1,
      totalPrice: 0,
      gstAmount: 0
    }]
  )


  const joditConfig = useMemo(()=>({
    readonly: false,
    height: 400,
    resize: true,
    uploader: {
      insertImageAsBase64URI: true,
    },
    toolbarAdaptive: false,
    buttons: "bold,italic,underline,|,ul,ol,|,table,link,image,|,align,left,center,right,justify,|,brush,eraser,|,paragraph,fontsize,|,undo,redo",
    allowHTML: true,
    useClasses: true,
  }),[]);

  const [Body, setBody] = useState(`
      <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6;">

  <p><strong>Payment Terms:</strong></p>
  <ul>
    <li>20% at the Time of the purchase order and the remaining 80% before Dispatch.</li>
  </ul>

  <p><strong>Inco-Terms:</strong></p>
  <ul>
    <li>
      This offer is inclusive of Packaging, forwarding, freight, transportation & transit insurance,
      for PV Modules within our scope of supply on a FOR basis.
    </li>
    <li>
      If, during dispatch, due to a change of government policy, any new taxes are applicable or
      rates are changed, the same will be applied to your account.
    </li>
  </ul>

  <p><strong>Validity of Offer:</strong></p>
  <ul>
    <li>
      This offer is valid for 3 days from the date of the offer and thereafter,
      subject to our reconfirmation.
    </li>
  </ul>

  <p><strong>Delivery/Completion Period:</strong></p>
  <ul>
    <li>
      Within 10-15 days after the date of purchase, along with the advance payment.
    </li>
  </ul>

  <p><strong>Insurance:</strong></p>
  <p>
    Transit Insurance is included till the delivery point mentioned in the invoice.
  </p>

  <p><strong>Warranty:</strong></p>
  <p>
    <strong>For N-TYPE TOPCON:</strong> First 12 Years Performance Warranty on 90% Power Output.
    Next 18 Years Performance Warranty on 80% Power Output.
  </p>
  <p>
    <strong>For MONO PERC:</strong> First 10 Years Performance Warranty on 90% Power Output.
    Next 15 Years Performance Warranty on 80% Power Output.
  </p>
  <p>
    After commissioning of the plant, the “Fire & Allied Perils”, Theft & Burglary,
    lack of sun radiation insurance policy, and loss of profit shall be arranged
    by you at your own cost.
  </p>

</div>

<div style="font-family: Arial, sans-serif; font-size: 14px;">

  <h3 style="text-align: center; text-decoration: underline;">
    Bank A/C Details
  </h3>

  <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
    
    <tr>
      <td style="border: 1px solid #000; font-weight: bold; width: 30%;">
        Bank A/c Detail
      </td>
      <td style="border: 1px solid #000; width: 5%;"></td>
      <td style="border: 1px solid #000;"></td>
    </tr>

    <tr>
      <td style="border: 1px solid #000;">Beneficiary Name</td>
      <td style="border: 1px solid #000; text-align: center;">:</td>
      <td style="border: 1px solid #000;">Gautam Solar Pvt. Ltd.</td>
    </tr>

    <!-- Bank Name -->
    <tr>
      <td style="border: 1px solid #000;">Bank Name</td>
      <td style="border: 1px solid #000; text-align: center;">:</td>
      <td style="border: 1px solid #000;">Axis Bank Ltd.</td>
    </tr>

    <!-- Bank Address -->
    <tr>
      <td style="border: 1px solid #000;">Bank Address</td>
      <td style="border: 1px solid #000; text-align: center;">:</td>
      <td style="border: 1px solid #000;">
        Okhla Phase-1, New Delhi, 110020
      </td>
    </tr>

    <tr>
      <td style="border: 1px solid #000;">Bank Account No.</td>
      <td style="border: 1px solid #000; text-align: center;">:</td>
      <td style="border: 1px solid #000;">925030038328269</td>
    </tr>

    <tr>
      <td style="border: 1px solid #000;">IFS Code</td>
      <td style="border: 1px solid #000; text-align: center;">:</td>
      <td style="border: 1px solid #000;">UTIB0001609</td>
    </tr>

  </table>

</div>
`)


  const handleClose = () => {
    setCreatePanelData({
      // customerName: "",
      // email: "",
      // phone: "",
      // address: "",
      gst: 5
    })

    setSelectPanel(
      [{
        panelId: "",
        technologyId: "",
        constructiveId: "",
        wattId: "",
        quantity: 1,
        rate: 1,
        totalPrice: 0,
        gstAmount: 0

      }]
    )
    onClose(false);

  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreatePanelData((prev) => ({
      ...prev, [name]: value
    }))

  }
  


  useEffect(() => {
    const fetchPanel = async () => {
      toast.dismiss();
      try {
        const apiData = await apiCall("get", "/adminPanel/getPanel", {}, {
          params: {
            isActive: true
          }
        });
        // console.log("apiData : ", apiData)
        setPanelData(apiData?.data?.data);

      } catch (error) {
        toast.error(error?.response?.data?.message || error?.message)
      }
    }
    fetchPanel();
  }, [])

  useEffect(() => {
    if (!selectPanel[activeIndex]?.panelId) return;

    apiCall("get", "/adminPanel/getTechnology", {}, {
      params: {
        panelId: selectPanel[activeIndex].panelId,
        isActive: true
      }
    }).then(res => setTechnologyData(res?.data?.data));

  }, [selectPanel[activeIndex]?.panelId]);

  useEffect(() => {
    if (!selectPanel[activeIndex]?.technologyId) return;

    apiCall("get", "/adminPanel/getConstructive", {}, {
      params: {
        technologyId: selectPanel[activeIndex].technologyId,
        isActive: true
      }
    }).then(res => setConstructiveData(res?.data?.data));

  }, [selectPanel[activeIndex]?.technologyId]);

  useEffect(() => {
    if (!selectPanel[activeIndex]?.constructiveId) return;

    apiCall("get", "/adminPanel/getPanelWatt", {}, {
      params: {
        constructiveId: selectPanel[activeIndex].constructiveId,
        isActive: true
      }
    }).then(res => setPanelWatt(res?.data?.data));

  }, [selectPanel[activeIndex]?.constructiveId]);

  const handleSubmit = async (e) => {
    toast.dismiss();
    e.preventDefault();
    try {

      let payload;
      if (data) {
        payload = {
          selectedPanel: selectPanel, termsAndConditions: Body, ...createPanelData, propId:data?._id
        }
      }
      else {
        payload = {
          selectedPanel: selectPanel, termsAndConditions: Body, ...createPanelData, dealerId
        }
      }

      if (!payload?.gst) {
        return alert("fields are required: GST.");
      
      }

      selectPanel.map((panel) => {
        if (!panel?.panelId || !panel?.technologyId || !panel?.constructiveId || !panel?.wattId || !panel?.rate) {
          return alert("Please fill in all panel details: Panel Type, Technology, Constructive Type, Panel Watt, and Rate per Panel.");
        }
      })

      if (!data) {
        var panelPropsal = await apiCall("post", "/api/dealer/create-solarPanel-proposal", payload)
      } else {
        var panelPropsal = await apiCall("put", "/api/dealer/edit-solarPanel-proposal", payload)
      }
      toast.success(panelPropsal?.data?.message);
      setTimeout(() => {
        onClose(false);
        proposalData()
      }, 1000)

    } catch (error) {
      alert(error?.response?.data?.message || error?.message);
    }
  }


  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full min-h-[90vh] overflow-hidden">

        <div className="bg-[#d40202] p-4 text-white relative">
          <button
            onClick={() => {
              handleClose()
            }
            }
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Sun className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{!data || data?.panelData?.length === 0 ? "Create" : "Update"} Solar Panel Proposal</h2>
              <p className="text-red-100 text-sm mt-1">
                {!data || data?.panelData?.length === 0 ? "Create" : "Update"}  a detailed panel proposal for your customer
              </p>
            </div>
          </div>
        </div>

        <form>
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-50px)]">


            <SalesPanelSelector
              selectPanel={selectPanel}
              setSelectPanel={setSelectPanel}
              setActiveIndex={setActiveIndex}
              panelData={panelData}
              technologyData={technologyData}
              constructiveData={constructiveData}
              panelWatt={panelWatt}
              gst={createPanelData?.gst}
            />

            <section>
              <div className="flex items-center gap-2 mb-4">
                <i className="fa-solid fa-coins text-red-600"></i>
                <h3 className="text-lg font-semibold">Price And GST Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium mb-2">GST* (%)</label>
                  <input
                    name="gst"
                    value={createPanelData?.gst}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2"
                    placeholder="GST %"
                  />
                </div>

              </div>
            </section>

            <section className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-semibold">Terms & Conditions / Message</h3>
              </div>

              <JoditEditor
                config={joditConfig}
                value={Body}
                onBlur={(d)=>setBody(e)}
              />


            </section>

            <div className="items-center justify-center bg-gray-50 flex gap-3 mt-5">
              <button
                type="button"
                onClick={() => handleClose()}
                className="sm:flex-1 p-3 border rounded-xl text-sm cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                onClick={(e) => { handleSubmit(e) }}
                className={` p-3 sm:flex-1 bg-linear-to-r from-red-600 to-red-600 text-white rounded-xl ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                {!data || data?.panelData?.length === 0 ? "Create" : "Update"}  Proposal

              </button>
            </div>
          </div>
        </form>
      </div >
    </div >
  )
}





export default CreateSalesPanelProposal;
