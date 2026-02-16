import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom'
import { apiCall } from '../../services/api';
import { BiLeftArrow } from 'react-icons/bi';
import PanelCard from '../../components/common/panelCard';
import Input from '../../components/common/Input';
import { X } from 'lucide-react';

const PanelWatt = () => {
    const location = useLocation();
    console.log("location : ", location?.state?.data)
    const constructiveId = location?.state?.data?._id
    const constructiveName = location?.state?.data?.constructiveType
    const navigate = useNavigate()
    const [data, setData] = useState()
    const [open, setOpen] = useState();

    const field = [
        {
            lable: "Panel Watt",
            name: "watt",
            type: "number",
            placeholder: "Enter panel watt (555,666,...)",

        },
        {

            lable: "Panel Watt Img",
            name: "imgWatt",
            type: "file",
            placeholder: "select the image..",
            multiple: true,
            maxFiles: 2,
            maxSize: 2 * 1024 * 1024,
            accept: "image/jpeg,image/jpg,image/png,image/webp",
            extensions: ["jpeg", "jpg", "png", "webp"]
        },
    ]

    const fetchData = async () => {
        toast.dismiss();
        try {
            const apiData = await apiCall("get", "adminPanel/getPanelWatt", {}, {
                params: {
                    constructiveId
                }
            })

            setData(apiData?.data?.data)

        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message)
        }

    }

    useEffect(() => {
        fetchData();
    }, [])
    //  console.log("Data : ",data)


    const handleToggle = async (e, panelWatt) => {
        e.stopPropagation()
        toast.dismiss();

        try {
            const payload = {
                _id: panelWatt?._id,
                isActive: !panelWatt?.isActive,
                constructiveId
            }

            // console.log("payload : ", payload);

            const api = await apiCall("put", "/adminPanel/togglePanelWatt", {}, {
                params: {
                    ...payload
                }
            })

            toast.success(api?.data?.message);
            setTimeout(() => {
                fetchData();
            }, 1500)

        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message)
        }

    }

    const handleCreatePanelWatt = async (data) => {
        // console.log("data : ", data);
        let formData = new FormData()
        // console.log(data?.imgWatt)

        // const payload = {
        //     panelId: location?.state?.data?.panelId,
        //     technologyId: location?.state?.data?.technologyId,
        //     constructiveId,
        //     watt: Number(data?.watt),
        //     imgWatt: data?.imgWatt
        // }

        formData.append("panelId", location?.state?.data?.panelId);
        formData.append("technologyId", location?.state?.data?.technologyId);
        formData.append("constructiveId", constructiveId);
        formData.append("watt", Number(data?.watt));
        data?.imgWatt.forEach((item) => {
            formData.append("imgWatt", item);
        })



        // console.log("Payload :  ", payload)

        try {
            const apiData = await apiCall("post", "/adminPanel/createPanelWatt", formData)
            toast.success(apiData?.data?.message);
            setOpen(false)
            setTimeout(() => {
                fetchData();
            }, 1000)


        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message)
        }

    }
    return (
        <div className="p-6 space-y-6">
            <div className="space-y-6 border-2 border-red-300 p-8 rounded-2xl shadow-md shadow-red-300 ">

                <div className="flex items-center justify-between bg-gray-200 p-4 rounded-xl border border-red-300 shadow-lg shadow-red-300">
                    <h1 className="text-xl font-semibold text-gray-800">
                        Panel Watt Management
                    </h1>

                    <button
                        onClick={() => setOpen(true)}
                        className="px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
                    >
                        + Add Panel Watt
                    </button>
                </div>
                <div className="mb-6 bg-gray-200 border border-red-300 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-semibold text-gray-800">
                                {
                                    constructiveName
                                }
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Panel Watt configuration
                            </p>
                        </div>

                        <button
                            //  onClick={() => naviagate("/panel/technology", { state: { id: panelId, name: panelName } })}
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium
                              text-red-600 hover:text-gray-900 hover:bg-red-300
                              rounded-lg transition"
                        >
                            <BiLeftArrow className="text-base" />
                            Go Back
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data?.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center p-10 border border-dashed rounded-xl text-gray-500">
                            <p className="text-sm">No Panel Watt found</p>
                            <p className="text-xs mt-1">
                                Click{" "}
                                <span className="font-medium text-green-600">Add Panel Watt</span> to
                                create one
                            </p>
                        </div>
                    ) : (
                        data?.map((panelWatt) => (
                            // console.log("panelWatt : ",panelWatt),
                            <PanelCard
                                title={`${panelWatt?.watt} Watt`}
                                subtitle={"Panel Watt Conmfiguration"}
                                key={panelWatt?._id}
                                active={panelWatt?.isActive}

                                onEdit={(e) => handleOpenEdit(e, panelWatt)}
                                onToggle={(e) => handleToggle(e, panelWatt)}
                            />

                        ))
                    )}
                </div>

            </div>
            {
                open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="bg-white w-[90%] max-w-md rounded-xl shadow-lg p-6 relative animate-fadeIn">
                            <button
                                onClick={() => setOpen(false)}
                                className="absolute top-3 right-3 p-2 rounded-full text-red-400 hover:bg-red-50 hover:text-red-600 transition"
                            >
                                <X size={20} />
                            </button>

                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                Add Panel Watt
                            </h2>


                            <Input
                                field={field}
                                onSubmit={handleCreatePanelWatt}
                                submitText='Add Panel Watt'
                            />
                        </div>
                    </div>
                )
            }


        </div>
    )
}

export default PanelWatt