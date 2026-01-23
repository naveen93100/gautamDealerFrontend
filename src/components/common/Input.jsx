// import React, { useEffect, useState } from "react";
// import { apiCall } from "../../services/api";
// import toast from "react-hot-toast";

// const Input = ({ field = [], apiData, setOpen, refresh, panelData }) => {
//     // console.log("API Data : ", field)
//     // console.log("API Data : ", apiData)
//     console.log("panelData Data : ", panelData)
//     const [formData, setFormData] = useState({});

//     useEffect(() => {
//         if (panelData) {
//             setFormData(panelData);
//         }
//     }, [panelData]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     console.log("form Data :", formData);
//     // console.log("form Data :", formData?.panelType?.length);


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         toast.dismiss();

//         // if (!formData?.panelType?.trim()) {
//         //     return alert("Panel Type cannot be empty");
//         // }
//         try {
//             if (apiData?.method === "post") {
//                 const response = await apiCall(apiData?.method, apiData?.url, formData);
//                 toast.success(response?.data?.message);
//             }
//             if (apiData.method === "put") {
//                 const response = await apiCall(apiData?.method, apiData?.url, null, {
//                     params: {
//                         ...formData,
//                         _id: panelData?._id

//                     }
//                 });
//                 toast.success(response?.data?.message);
//             }
//             setTimeout(() => {
//                 refresh();
//             }, 500);
//             setOpen(false)
//         } catch (error) {
//             console.log(error);
//             if (error.status === 404) {
//                 toast.error("There Have Some Server error , Please wait we are resolve your error...")
//             } else {
//                 toast.error(error?.response?.data?.message)
//             }
//         }
//     }
//     return (
//         <div className="space-y-4">
//             {field.map((item) => (
//                 <div key={item?.name} className="flex flex-col gap-1">
//                     <label
//                         htmlFor={item?.name}
//                         className="text-sm font-medium text-gray-700"
//                     >
//                         {item?.label}
//                     </label>

//                     <input
//                         id={item?.name}
//                         name={item?.name}
//                         type={item?.type}
//                         placeholder={item?.placeholder}
//                         value={formData[item?.name] || ""}
//                         onChange={handleChange}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
//                     />
//                 </div>
//             ))}

//             <button
//                 onClick={handleSubmit}
//                 className="w-full mt-6 px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed "
//             >
//                 Submit
//             </button>

//         </div>
//     );
// };

// export default Input;


import React, { useEffect, useState } from "react";

const Input = ({ field = [], initialData = {}, onSubmit, submitText = "Submit" }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            {field.map((item) => (
                <div key={item.name} className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        {item.label}
                    </label>

                    <input
                        name={item.name}
                        type={item.type}
                        placeholder={item.placeholder}
                        value={formData[item.name] || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                </div>
            ))}

            <button
                type="submit"
                className="w-full mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
            >
                {submitText}
            </button>
        </form>
    );
};

export default Input;
