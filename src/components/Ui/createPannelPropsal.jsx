import { IndianRupee, Mail, MessageCircle, Phone, Sun, User, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { apiCall } from '../../services/api';
import PanelSelector from './panelSelector';
import JoditEditor from 'jodit-react';
import { useAuth } from '../../Context/AuthContext';

const CreatePannelPropsal = ({ onClose, proposalData, data = {} , customerId}) => {
  // console.log("data : ", data);
  // console.log(data?.name)

  const [loading, setLoading] = useState(false);
  // const { user, token } = useAuth();
  const [panelData, setPanelData] = useState();
  const [technologyData, setTechnologyData] = useState();
  const [constructiveData, setConstructiveData] = useState();
  const [panelWatt, setPanelWatt] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [createPanelData, setCreatePanelData] = useState({
    customerName: "",
    // email: "",
    // phone: "",
    // address: "",
    gst: 5
  })

  const dealerId = JSON.parse(localStorage.getItem("userData"))?.id;
  // console.log(dealerId);


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
  // console.log("selected panel : ", selectPanel)

  const joditConfig = {
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
  }

  const [Body, setBody] = useState(`
       <h3><strong>Payment Terms</strong></h3>
            <ul>
            <li><strong>100% </strong> before dispatch.</li>
            <li>Net metering licensing and documentation will be handled by our team.</li>
            <li>Any applicable net metering charges will be charged separately.</li>
            </ul>

            <h3><strong>Mode of Payments</strong></h3>
            <p>
            Kindly transfer the advance amount through any of the following modes: <br>
            <strong>Bank Transfer:</strong> [Bank Account Number] <br>
            <strong>UPI:</strong> [UPI ID]
            </p>

            <br>

            <h3 style="background-color:#a20000; color:#fff; display:inline-block;">
            <strong>Terms and Conditions:</strong>
            </h3>

            <p><strong>A) Scope &amp; Design Basis:</strong></p>
            <p>
            The proposal is prepared based on a standard system/design configuration. Any changes or deviations in scope, layout, specifications, or quantities may result in additional costs.
            </p>

            <p><strong>B) Validity of Quotation:</strong></p>
            <p>
            This quotation is valid for <strong>7 days</strong> from the date of issue.
            </p>

            <p><strong>C) WARRANTY:</strong></p>
            <p>
            <strong>5 Year warranty</strong> on Solar System.
            </p>

            <p style="font-size: 14px; color: #555;">
            <em>
                The above warranties cover manufacturing defects, premature material degradation, and equipment failures.
            </em>
            </p>
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

      const payload = {
        selectedPanel: selectPanel, termsAndConditions: Body, ...createPanelData, dealerId , customerId
      }

      if ( !payload?.gst) {
        return alert("fields are required: GST.");

      }


      selectPanel.map((panel) => {
        // console.log("panel ", panel)
        if (!panel?.panelId || !panel?.technologyId || !panel?.constructiveId || !panel?.wattId || !panel?.rate) {
          return alert("Please fill in all panel details: Panel Type, Technology, Constructive Type, Panel Watt, and Rate per Panel.");
        }
      })
      if (!data || data?.panelData.length === 0) {
        var panelPropsal = await apiCall("post", "/api/dealer/create-solarPanel-proposal", payload)
      } else {
        var panelPropsal = await apiCall("put", "/api/dealer/updatePanelProposal", payload)
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

  //using for update panel Propsal 
  useEffect(() => {
    if (!data) {

      setCreatePanelData({
        // customerName: "",
        // email: "",
        // phone: "",
        // address: "",
        gst: 5
      });
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
      return;
    }
    setCreatePanelData({
      // customerName: data?.name || "",
      // email: data?.email || "",
      // phone: data?.phone || "",
      // address: data?.address || "",
      gst: data?.panelData?.[0]?.gst || 5
    });

    if (data?.panelData?.length) {
      setSelectPanel(data.panelData[0].selectedPanels);
      setBody(data.panelData[0].termsAndConditions || "");
    }

  }, [data]);


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
       

            <PanelSelector
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


                {/* <div>
                  <label className="block text-sm  mt-4 font-medium mb-2">Unit Price <i className="fa-solid fa-rupee-sign text-red-600"></i> </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      name="rate"
                      value={panel.rate}
                      onChange={e => handleChange(index, "rate", e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2"
                      placeholder="Enter Panel Price"
                    />
                  </div>
                </div> */}

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
                onBlur={(c) => setBody(c)}
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

export default CreatePannelPropsal