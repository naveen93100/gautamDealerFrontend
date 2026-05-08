
import { IndianRupee, Mail, MessageCircle, Phone, Sun, User, X } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast';
import { apiCall } from '../../services/api';
import SalesPanelSelector from './SalesPanelSelector';
import JoditEditor from 'jodit-react';
import { useAuth } from '../../Context/AuthContext';
import { useCreateSalesClientProposal, useUpdateSalesClientProposal } from '../../hooks/useSalesMethods';

const CreateSalesPanelProposal = ({ onClose, data = null, setData, clientId }) => {
  const { loginType, user } = useAuth();
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



  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const salesId = userData?._id;


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


  const joditConfig = useMemo(() => ({
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
  }), []);

  const [Body, setBody] = useState(`
      <div style="font-family: Arial, sans-serif; font-size: 14px;">

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

  <h3 style="text-align: center; text-decoration: underline; margin-bottom: 8px;">
    Bank A/C Details
  </h3>

  <table style="width: 100%; border-collapse: collapse; margin-top: 10px; table-layout: fixed;">
    
    <tr>
      <td style="border: 1px solid #000; font-weight: bold; width: 30%; padding: 6px; box-sizing: border-box;">
        Bank A/c Detail
      </td>
      <td style="border: 1px solid #000; width: 5%; padding: 6px; box-sizing: border-box;"></td>
      <td style="border: 1px solid #000; padding: 6px; box-sizing: border-box;"></td>
    </tr>

    <tr>
      <td style="border: 1px solid #000; padding: 6px;">Beneficiary Name</td>
      <td style="border: 1px solid #000; text-align: center; padding: 6px;">:</td>
      <td style="border: 1px solid #000; padding: 6px; word-break: break-word;">
        Gautam Solar Pvt. Ltd.
      </td>
    </tr>

    <tr>
      <td style="border: 1px solid #000; padding: 6px;">Bank Name</td>
      <td style="border: 1px solid #000; text-align: center; padding: 6px;">:</td>
      <td style="border: 1px solid #000; padding: 6px; word-break: break-word;">
        Axis Bank Ltd.
      </td>
    </tr>

    <tr>
      <td style="border: 1px solid #000; padding: 6px;">Bank Address</td>
      <td style="border: 1px solid #000; text-align: center; padding: 6px;">:</td>
      <td style="border: 1px solid #000; padding: 6px; word-break: break-word;">
        Okhla Phase-1, New Delhi, 110020
      </td>
    </tr>

    <tr>
      <td style="border: 1px solid #000; padding: 6px;">Bank Account No.</td>
      <td style="border: 1px solid #000; text-align: center; padding: 6px;">:</td>
      <td style="border: 1px solid #000; padding: 6px; word-break: break-word;">
        925030038328269
      </td>
    </tr>

    <tr>
      <td style="border: 1px solid #000; padding: 6px;">IFSC Code</td>
      <td style="border: 1px solid #000; text-align: center; padding: 6px;">:</td>
      <td style="border: 1px solid #000; padding: 6px; word-break: break-word;">
        UTIB0001609
      </td>
    </tr>

  </table>

</div>
  `)


  const handleClose = () => {
    setCreatePanelData({
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


  useState(() => {
    if (!data) return;
    setSelectPanel(() => {
      return data?.selectedPanels.map((item) => (
        {
          constructiveId: item?.constructiveId?._id,
          panelId: item?.panelId?._id,
          quantity: item?.quantity,
          rate: item?.rate,
          gstAmount: item?.gstAmount,
          technologyId: item?.technologyId?._id,
          totalPrice: item?.totalPrice,
          wattId: item?.wattId?._id
        }))
    })
    setCreatePanelData((p) => ({ ...p, gst: data?.gst }))
    setPanelData(data?.selectedPanels);
  }, [data]);

  useEffect(() => {
    const fetchPanel = async () => {
      toast.dismiss();
      try {
        const apiData = await apiCall("get", "/adminPanel/getPanel", {}, {
          params: {
            isActive: true
          }
        });
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

  const { mutate: createSalesClientProposal } = useCreateSalesClientProposal(clientId);
  const { mutate: updateSalesClientProposal } = useUpdateSalesClientProposal(clientId);



  const handleSubmit = async (e) => {
    toast.dismiss();
    e.preventDefault();
    try {

      let payload;
      if (data) {
        payload = {
          selectedPanels: selectPanel, termsAndConditions: Body, ...createPanelData, propId: data?._id
        }
      }
      else {
        payload = {
          selectedPanels: selectPanel, termsAndConditions: Body, gst: createPanelData?.gst, salesId, clientId

        }
      }

      if (!payload?.gst) {
        return alert("fields are required: GST.");

      }

      selectPanel.map((panel) => {
        if (!panel?.panelId || !panel?.technologyId || !panel?.constructiveId || !panel?.wattId || !panel?.rate) {
          return alert("Please fill in all panel details: Panel Type, Technology, Constructive Type, Panel Watt, and Rate per Panel.")
        }
      })

       let mutationFn=data?updateSalesClientProposal:createSalesClientProposal

       mutationFn(payload,{
          onSuccess: (d) => {
            toast.success(d?.message);
            onClose(false);
          },
          onError: (e) => {
            let er = (e || []);

            toast.error(<div>
              <strong>Please fix the following:</strong>
              <ul className="mt-1">
                {er.map((err, i) => (
                  <li key={i} className="capitalize text-sm">• {err.message}</li>
                ))}
              </ul>
            </div>
            );
          }
       })

      // if (!data) {
      //   createSalesClientProposal(payload, {
      //     onSuccess: (d) => {
      //       toast.success(d?.message);
      //       onClose(false);
      //     },
      //     onError: (e) => {
      //       let er = (e || []);

      //       toast.error(<div>
      //         <strong>Please fix the following:</strong>
      //         <ul className="mt-1">
      //           {er.map((err, i) => (
      //             <li key={i} className="capitalize text-sm">• {err.message}</li>
      //           ))}
      //         </ul>
      //       </div>
      //       );
      //     }
      //   })
      // } else {
      //   updateSalesClientProposal(payload, {
      //     onSuccess: (d) => {
      //       toast.success(d?.message);
      //       onClose(false);
      //     },
      //     onError: (e) => {
      //       let er = (e || []);

      //       toast.error(<div>
      //         <strong>Please fix the following:</strong>
      //         <ul className="mt-1">
      //           {er.map((err, i) => (
      //             <li key={i} className="capitalize text-sm">• {err.message}</li>
      //           ))}
      //         </ul>
      //       </div>
      //       );
      //     }
      //   })

      // }

    } catch (error) {
      let er = (error?.response?.data?.message || []);

      toast.error(<div>
        <strong>Please fix the following:</strong>
        <ul className="mt-1">
          {er.map((err, i) => (
            <li key={i} className="capitalize text-sm">• {err.message}</li>
          ))}
        </ul>
      </div>
      );

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
                    type='number'
                    min={0}
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
                onBlur={(d) => setBody(d)}
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





export default React.memo(CreateSalesPanelProposal);
