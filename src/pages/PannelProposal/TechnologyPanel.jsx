import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom'
import { apiCall } from '../../services/api';
import PanelCard from '../../components/common/panelCard';
import Input from '../../components/common/Input';
import { X } from 'lucide-react';
import { BiLeftArrow } from 'react-icons/bi';

const TechnologyPanel = () => {
    const location = useLocation();
    const panelId = location?.state?.id;
    // console.log("panelId : ", panelId)
    const panelName = location?.state?.name
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const field = [
        {
            lable: "Panel Technology",
            name: "technologyPanel",
            type: "text",
            placeholder: "Enter panel technology(mono/topcorn)"
        }

    ]
    const navigate = useNavigate();
    const [updateTechData, setUpdateTechData] = useState()

    // console.log("panelName : ",panelName);

    const [technologyPanel, setTechnologyPanel] = useState();
    // console.log("data : ", location?.state?.id)

    const fetchData = useCallback(async () => {
        try {
            const response = await apiCall("get", "/adminPanel/getTechnology", null, {
                params: {
                    panelId
                }
            })

            setTechnologyPanel(response?.data?.data);

        } catch (error) {
            console.log("Error : ", error)
            toast.error(error?.response?.data?.message || "There have some Server error, we are resolve the error please wait ..")

        }

    }, [])
    // console.log("technologyPanel : ", technologyPanel)

    useEffect(() => {
        fetchData()
    }, [])

    const handleCreateTech = async (data) => {
        // console.log("data: ", data)
        toast.dismiss();
        try {
            const res = await apiCall("post", "/adminPanel/addTechnology", { ...data, panelId });
            toast.success(res.data.message);
            fetchData();
            setOpen(false);
        } catch (err) {
            toast.error(err?.response?.data?.message);
        }

    }

    const handleOpenEdit = async (e, data) => {
        e.stopPropagation();
        setEdit(true);
        setUpdateTechData(data)

    }

    const handleUpdateTech = async (data) => {
        // console.log("data: ", data)
        toast.dismiss();
        const payload = {
            panelId,
            _id: data?._id,
            technologyPanel: data?.technologyPanel
        }
        try {
            const response = await apiCall("put", "adminPanel/updateTechnology", { ...payload });
            toast.success(response?.data?.message);
            fetchData();
            setEdit(false);

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "There have some server error ,we are resolve your error please wait..")

        }
    }

    const handleToggle = async (e, tech) => {
        toast.dismiss();

        // console.log("tech : ", tech)
        try {
            const payload = {
                panelId,
                id: tech?._id,
                isActive: !tech?.isActive
            }

            const response = await apiCall("put", "/adminPanel/changeStatusTech", payload);

            toast.success(response?.data?.message);
            setTimeout(() => {
                fetchData()
            }, 500);
            // console.log("payload : ", payload)


        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "there have some server error , we are resolving your error please wait..")
        }

    }

    const handleNavigate = async (e, tech) => {
        e.stopPropagation();
        // console.log("tech",tech)
        navigate("/admin/panel/technology/constructive", { state: { data: tech, panelName: panelName } })
    }
    return (
        <div className="p-6 space-y-6">
            <div className="space-y-6 border-2 border-red-300 p-8 rounded-2xl shadow-md shadow-red-300 ">
                <div className="flex items-center justify-between bg-gray-200 p-4 rounded-xl border">
                    <h1 className="text-xl font-semibold text-gray-800">
                        Panel Technology Management
                    </h1>

                    <button
                        onClick={() => setOpen(true)}
                        className="px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
                    >
                        + Add Technology
                    </button>
                </div>

                <div className="mb-6 bg-gray-200 border rounded-xl p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-semibold text-gray-800">
                                {panelName}
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Panel technology configuration
                            </p>
                        </div>
                        <button onClick={() => navigate(-1)}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 hover:text-gray-900 hover:bg-red-300 rounded-lg transition"
                        >
                            <BiLeftArrow className="text-base" />
                            Go Back
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {technologyPanel?.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center p-10 border border-dashed rounded-xl text-gray-500">
                            <p className="text-sm">No Technology found</p>
                            <p className="text-xs mt-1">
                                Click{" "}
                                <span className="font-medium text-green-600">Add Technolgy</span> to
                                create one
                            </p>
                        </div>
                    ) : (
                        technologyPanel?.map((tech) => (
                            < PanelCard
                                title={tech?.technologyPanel}
                                subtitle="Technology Configuration"
                                key={tech?._id}
                                panel={tech}
                                active={tech?.isActive}
                                onNavigate={(e) => handleNavigate(e, tech)}
                                onEdit={(e) => handleOpenEdit(e, tech)}
                                onToggle={(e) => handleToggle(e, tech)}

                            />
                        ))
                    )
                    }
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
                                Add Technology
                            </h2>


                            <Input
                                field={field}
                                onSubmit={handleCreateTech}
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
                                initialData={updateTechData}
                                onSubmit={handleUpdateTech}
                                submitText="Update Panel"
                            />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default TechnologyPanel