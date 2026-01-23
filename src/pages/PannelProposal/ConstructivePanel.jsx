import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom'
import { apiCall } from '../../services/api';
import PanelCard from '../../components/common/panelCard';
import { X } from 'lucide-react';
import Input from '../../components/common/Input';
import { BiLeftArrow } from 'react-icons/bi';

const ConstructivePanel = () => {
    const location = useLocation()
    // console.log(location?.state)
    const panelId = location?.state?.data?.panelId;
    const panelName = location?.state?.panelName;
    const technologyId = location?.state?.data?._id;
    const technologyName = location?.state?.data?.technologyPanel;
    // console.log("panelId,technologyId ,technologyName ", panelId, technologyId, technologyName)
    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState(false);
    const [updateData, setUpdateData] = useState()
    const [constructiveData, setConstructiveData] = useState();

    const naviagate = useNavigate();



    const field = [
        {
            lable: "Panel Constructive",
            name: "constructiveType",
            type: "text",
            placeholder: "Enter panel constructive Type(glass-to-glass/glass-to-backsheet)"
        }
    ]
    const fetchData = async () => {
        toast.dismiss();
        try {
            const response = await apiCall("get", "/adminPanel/getConstructive", null, {
                params: {
                    technologyId
                }
            })

            setConstructiveData(response?.data?.data);

        } catch (error) {
            console.log(error);
            toast?.error(error?.response?.data?.message || "There have some server error .We are resolve your error please Wait..")
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    // console.log("Data : ", constructiveData);
    const handleToggle = async (e, data) => {
        toast.dismiss();
        // console.log("data?.isActive", data?.isActive)
        const payload = {
            panelId,
            technologyId,
            id: data?._id,
            isActive: !data?.isActive
        }

        try {
            const response = await apiCall("put", "/adminPanel/changeStatusConst", { ...payload })
            toast.success(response?.data?.message)
            setTimeout(() => {
                fetchData()
            }, 1000)

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "There have some error in server ,please wait we are resolve your error..")

        }
    }

    const handleCreate = async (data) => {
        console.log(("data  ", data));
        toast?.dismiss();
        try {
            const response = await apiCall("post", "/adminPanel/createConstructive", { constructiveType: data?.constructiveType, panelId, technologyId })
            toast.success(response?.data?.message)

            fetchData();
            setOpen(false)
        } catch (error) {
            console.log("error : ", error)

        }


    }

    const handleOpenEdit = async (e, data) => {
        e.stopPropagation();
        setEdit(true);
        setUpdateData(data);
    }

    const UpdateConstructive = async (data) => {
        toast.dismiss();
        const payload = {
            panelId,
            technologyId,
            id: data?._id,
            constructiveType: data?.constructiveType
        }
        try {
            const response = await apiCall("put", "/adminPanel/updateConstructive", { ...payload })
            toast.success(response?.data?.message);
            setTimeout(() => {
                fetchData()
            }, 1000)
            setEdit(false)
        } catch (error) {
            console.log("Error : ", error);
            toast.error(error?.response?.data?.message || "There have some server error,please wait we are resolve your error..")
        }
    }

    const handleNavigate = async (e, data) => {

    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-800">
                    Panel Constructive Management
                </h1>

                <button
                    onClick={() => setOpen(true)}
                    className="px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
                >
                    + Add Constructive
                </button>
            </div>
            <div className="mb-6 bg-white border rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-800">
                            {technologyName}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Technology configuration details
                        </p>
                    </div>

                    <button onClick={() => naviagate("/panel/technology", { state: { id: panelId, name: panelName } })}
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
                {constructiveData?.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center p-10 border border-dashed rounded-xl text-gray-500">
                        <p className="text-sm">No Condtructuve found</p>
                        <p className="text-xs mt-1">
                            Click{" "}
                            <span className="font-medium text-green-600">Add Constructive</span> to
                            create one
                        </p>
                    </div>
                ) : (
                    constructiveData?.map((constructive) => (
                        <PanelCard
                            title={constructive?.constructiveType}
                            subtitle={"Constructive Conmfiguration"}
                            key={constructive?._id}
                            active={constructive?.isActive}
                            onNavigate={(e) => handleNavigate(e, constructive)}
                            onEdit={(e) => handleOpenEdit(e, constructive)}
                            onToggle={(e) => handleToggle(e, constructive)}
                        />
                    ))
                )}
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
                                Add Constructive
                            </h2>


                            <Input
                                field={field}
                                onSubmit={handleCreate}
                                submitText='Add Technology'
                            />
                        </div>
                    </div>
                )
            }

            {
                edit && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="bg-white w-[90%] max-w-md rounded-xl shadow-lg p-6 relative animate-fadeIn">
                            <button
                                onClick={() => setEdit(false)}
                                className="absolute top-3 right-3 p-2 rounded-full text-red-400 hover:bg-red-50 hover:text-red-600 transition"
                            >
                                <X size={20} />
                            </button>

                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                Update Panel
                            </h2>


                            <Input
                                field={field}
                                initialData={updateData}
                                onSubmit={UpdateConstructive}
                                submitText="Update Panel"
                            />
                        </div>
                    </div>
                )
            }


        </div>
    )
}

export default ConstructivePanel