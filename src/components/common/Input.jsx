
import React, { useEffect, useState } from "react";

const BASE_IMAGE_URL = "http://localhost:1008/Proposal_Images/watt/";

const Input = ({ field = [], initialData = {}, onSubmit, submitText = "Submit" }) => {
    const [formData, setFormData] = useState({});
    const [previews, setPreviews] = useState({});

    // console.log("formData : ", formData)

    // Load backend data (EDIT MODE)
    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData(initialData);

            // rebuild preview from backend every time initialData changes
            if (initialData.imgWatt?.length) {
                setPreviews(prev => ({
                    ...prev,
                    imgWatt: initialData.imgWatt.map(img => BASE_IMAGE_URL + img)
                }));
            }
        }
    }, [initialData]);


    useEffect(() => {
        return () => {
            Object.values(previews)
                .flat()
                .forEach(url => {
                    if (url.startsWith("blob:")) {
                        URL.revokeObjectURL(url);
                    }
                });
        };
    }, [previews]);



    const handleChange = (e, item) => {
        if (item.type === "file") {
            const files = Array.from(e.target.files);

            if (item.maxFiles && files.length > item.maxFiles) {
                alert(`Maximum ${item.maxFiles} images allowed`);
                return;
            }

            for (let file of files) {
                if (!file.type.startsWith("image/")) {
                    alert("Only image files allowed");
                    return;
                }

                if (item.maxSize && file.size > item.maxSize) {
                    alert("Each image must be less than 2MB");
                    return;
                }
            }

            const previewUrls = files.map(file => URL.createObjectURL(file));
            // console.log("previous url ", previewUrls)

            setFormData(prev => ({
                ...prev,
                [item.name]: files,
            }));

            setPreviews(prev => ({
                ...prev,
                [item.name]: previewUrls.length ? previewUrls : prev[item.name],
            }));

        } else {
            setFormData(prev => ({
                ...prev,
                [item.name]: e.target.value,
            }));
        }
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
                        multiple={item.multiple || false}
                        placeholder={item.placeholder}
                        value={item.type !== "file" ? formData[item.name] || "" : undefined}
                        onChange={(e) => handleChange(e, item)}
                        className="w-full px-4 py-2 border rounded-lg"
                    />

                    {/* PREVIEW SECTION */}
                    {item.type === "file" && previews[item.name] && (
                        <div className="flex gap-3 mt-2 flex-wrap">
                            {previews[item.name].map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt="preview"
                                    className="w-24 h-24 object-cover rounded border"
                                />
                            ))}
                        </div>
                    )}
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
