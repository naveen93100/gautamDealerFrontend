
// import React, { useEffect, useState } from "react";
// const BASE_IMAGE_URL = "https://gautamsolar.us/proposal_images/watt/";
// // const BASE_IMAGE_URL = "http://localhost:1008/proposal_images/watt/";

// const GaloInput = ({
//     field = [],
//     initialData = {},
//     onSubmit,
//     submitText = "Submit",
// }) => {
//     const [formData, setFormData] = useState({});
//     const [previews, setPreviews] = useState({});

//     // Load backend data (EDIT MODE)
//     useEffect(() => {
//         if (initialData && Object.keys(initialData).length > 0) {
//             setFormData(initialData);

//             // rebuild preview from backend every time initialData changes
//             if (initialData.imgWatt?.length) {
//                 setPreviews((prev) => ({
//                     ...prev,
//                     imgWatt: initialData.imgWatt.map(
//                         (img) => BASE_IMAGE_URL + img,
//                     ),
//                 }));
//             }
//         }
//     }, [initialData]);

//     // Cleanup blob URLs
//     useEffect(() => {
//         return () => {
//             Object.values(previews)
//                 .flat()
//                 .forEach((url) => {
//                     if (url.startsWith("blob:")) {
//                         URL.revokeObjectURL(url);
//                     }
//                 });
//         };
//     }, [previews]);

//     const handleChange = (e, item) => {
//         if (item.type === "file") {
//             const files = Array.from(e.target.files);

//             if (item.maxFiles && files.length > item.maxFiles) {
//                 alert(`Maximum ${item.maxFiles} images allowed`);
//                 return;
//             }

//             for (let file of files) {
//                 if (!file.type.startsWith("image/")) {
//                     alert("Only image files allowed");
//                     return;
//                 }

//                 if (item.maxSize && file.size > item.maxSize) {
//                     alert("Each image must be less than 2MB");
//                     return;
//                 }
//             }

//             const previewUrls = files.map((file) => URL.createObjectURL(file));

//             setFormData((prev) => ({
//                 ...prev,
//                 [item.name]: files,
//             }));

//             setPreviews((prev) => ({
//                 ...prev,
//                 [item.name]: previewUrls.length ? previewUrls : prev[item.name],
//             }));
//         } else {
//             setFormData((prev) => ({
//                 ...prev,
//                 [item.name]: e.target.value,
//             }));
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onSubmit(formData);
//     };

//     return (
//         <form className="space-y-4" onSubmit={handleSubmit}>
//             {field.map((item) => (
//                 <div key={item.name} className="flex flex-col gap-1">
//                     <label className="text-sm font-medium text-black">
//                         {item.label}
//                     </label>

//                     <input
//                         autoComplete="off"
//                         name={item.name}
//                         type={item.type}
//                         multiple={item.multiple || false}
//                         placeholder={item.placeholder}
//                         value={
//                             item.type !== "file"
//                                 ? formData[item.name] || ""
//                                 : undefined
//                         }
//                         onChange={(e) => handleChange(e, item)}
//                         className="w-full px-4 py-2 border border-yellow-400 rounded-lg bg-white focus:ring-2 focus:ring-black focus:border-black transition outline-none"
//                     />
//                 </div>
//             ))}

//             <button
//                 type="submit"
//                 className="w-full mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
//             >
//                 {submitText}
//             </button>
//         </form>
//     );
// };

// export default GaloInput;



import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const BASE_IMAGE_URL = "https://gautamsolar.us/proposal_images/watt/";
// const BASE_IMAGE_URL = "http://localhost:1008/proposal_images/watt/";

const GaloInput = ({
    field = [],
    initialData = {},
    onSubmit,
    passwordVisibility = { show: false, toggle: () => {} },
    submitText = "Submit",
}) => {
    const [formData, setFormData] = useState({});
    const [previews, setPreviews] = useState({});
    const [localShowPassword, setLocalShowPassword] = useState(false);

    // Load backend data (EDIT MODE)
    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData(initialData);

            // rebuild preview from backend every time initialData changes
            if (initialData.imgWatt?.length) {
                setPreviews((prev) => ({
                    ...prev,
                    imgWatt: initialData.imgWatt.map(
                        (img) => BASE_IMAGE_URL + img,
                    ),
                }));
            }
        }
    }, [initialData]);

    // Cleanup blob URLs
    useEffect(() => {
        return () => {
            Object.values(previews)
                .flat()
                .forEach((url) => {
                    if (url.startsWith("blob:")) {
                        URL.revokeObjectURL(url);
                    }
                });
        };
    }, [previews]);

    const showPassword =
        passwordVisibility.show !== undefined
            ? passwordVisibility.show
            : localShowPassword;
    const togglePassword =
        passwordVisibility.toggle ||
        (() => setLocalShowPassword((prev) => !prev));

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

            const previewUrls = files.map((file) => URL.createObjectURL(file));

            setFormData((prev) => ({
                ...prev,
                [item.name]: files,
            }));

            setPreviews((prev) => ({
                ...prev,
                [item.name]: previewUrls.length ? previewUrls : prev[item.name],
            }));
        } else {
            setFormData((prev) => ({
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
        <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
            {field.map((item) => {
                const isPassword = item.type === "password";
                const inputType = isPassword && showPassword ? "text" : item.type;

                return (
                    <div key={item.name} className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-black">
                            {item.label}
                        </label>
                        <div className="relative">
                            <input
                                autoComplete={isPassword ? "new-password" : "off"}
                                name={item.name}
                                type={inputType}
                                multiple={item.multiple || false}
                                placeholder={item.placeholder}
                                value={
                                    item.type !== "file"
                                        ? formData[item.name] || ""
                                        : undefined
                                }
                                onChange={(e) => handleChange(e, item)}
                                className="w-full px-4 py-2 border border-yellow-400 rounded-lg bg-white focus:ring-2 focus:ring-black focus:border-black transition outline-none pr-10"
                            />
                            {isPassword && (
                                <button
                                    type="button"
                                    onClick={togglePassword}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-black"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}

            <button
                type="submit"
                className="w-full mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
                {submitText}
            </button>
        </form>
    );
};

export default GaloInput;
