import React, { useState } from "react";
import { apiCall } from "../../services/api";

const Input = ({ field = [], apiData, setOpen, pannelData }) => {
    console.log("API Data : ", apiData)
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    console.log("form Data :", formData);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiCall(apiData?.method, apiData?.url, formData);
            alert(response?.data?.message);
            pannelData();
            setOpen(false)
        } catch (error) {
            console.log(error);
            if (error.status === 404) {
                alert("There Have Some error , Please wait we are resolve your error...")
            } else {

                alert(error?.response?.data?.message)
            }
        }
    }
    return (
        <div className="space-y-4">
            {field.map((item) => (
                <div key={item.name} className="flex flex-col gap-1">
                    <label
                        htmlFor={item.name}
                        className="text-sm font-medium text-gray-700"
                    >
                        {item.label}
                    </label>

                    <input
                        id={item.name}
                        name={item.name}
                        type={item.type}
                        placeholder={item.placeholder}
                        value={formData[item.name] || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    />
                </div>
            ))}

            <button
                onClick={handleSubmit}
                className="w-full mt-6 px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed "
            >
                Submit
            </button>

        </div>
    );
};

export default Input;
