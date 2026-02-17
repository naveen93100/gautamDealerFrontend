
// import React, { useEffect, useState } from "react";

// const Input = ({ field = [], initialData = {}, onSubmit, submitText = "Submit" }) => {
//     const [formData, setFormData] = useState({});

//     useEffect(() => {
//         if (initialData && Object.keys(initialData).length > 0) {
//             setFormData(initialData);
//         }
//     }, [initialData]);

//      console.log("formData : ",formData);


//     // const handleChange = (e, item) => {
//     //     // console.log("type : ", item)
//     //     if (item?.type === "file") {
//     //         const files = Array.from(e.target.files);

//     //         if (item.maxFiles && files.length > item.maxFiles) {
//     //             alert(`Maximum ${item.maxFiles} images allowed`);
//     //             return;
//     //         }
//     //         for (let file of files) {
//     //             if (!file.type.startsWith("image/")) {
//     //                 alert("Only image files are allowed (jpeg,jpg,webp,png)");
//     //                 return;
//     //             }

//     //             if (item.maxSize && file.size > item.maxSize) {
//     //                 alert("Each image must be less than 2MB");
//     //                 return;
//     //             }
//     //         }


//     //         setFormData((prev) => ({
//     //             ...prev,
//     //             [item.name]: files,
//     //         }));
//     //     } else {
//     //         const { name, value } = e.target;

//     //         setFormData((prev) => ({
//     //             ...prev,
//     //             [name]: value,
//     //         }));
//     //     }
//     // };

//     const handleChange = (e, item) => {
//         if (item.type === "file") {
//             const files = Array.from(e.target.files);

//             if (item.maxFiles && files.length > item.maxFiles) {
//                 alert(`Maximum ${item.maxFiles} images allowed`);
//                 return;
//             }

//             for (let file of files) {
//                 // MIME check
//                 if (!file.type.startsWith("image/")) {
//                     alert("Only image files are allowed");
//                     return;
//                 }

//                 // Size check
//                 if (item.maxSize && file.size > item.maxSize) {
//                     alert("Each image must be less than 2MB");
//                     return;
//                 }

//                 // Extension check
//                 const ext = file.name.split(".").pop().toLowerCase();

//                 if (item.extensions && !item.extensions.includes(ext)) {
//                     alert("Only jpeg, jpg, png, webp images are allowed");
//                     return;
//                 }
//             }

//             setFormData((prev) => ({
//                 ...prev,
//                 [item.name]: files,
//             }));
//         } else {
//             setFormData((prev) => ({
//                 ...prev,
//                 [item.name]: e.target.value,
//             }));
//         }
//     };


//     // console.log("formData : ", formData)

//     // const handleSubmit = (e) => {
//     //     e.preventDefault();
//     //     onSubmit(formData);
//     // };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onSubmit(formData);
//     };


//     return (
//         <form className="space-y-4" onSubmit={handleSubmit}>
//             {field.map((item) => (
//                 // console.log("item ",item),
//                 <div key={item.name} className="flex flex-col gap-1">
//                     <label className="text-sm font-medium text-gray-700">
//                         {item.label}
//                     </label>

//                     <input
//                         required={true}
//                         name={item?.name}
//                         type={item?.type}
//                         // placeholder={item.placeholder}
//                         // value={formData[item.name] || ""}
//                         multiple={item.multiple || false}
//                         placeholder={item.placeholder}
//                         value={item.type !== "file" ? formData[item.name] || "" : undefined}
//                         onChange={(e) => handleChange(e, item)}
//                         className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
//                     />
//                 </div>
//             ))}

//             <button
//                 type="submit"
//                 className="w-full mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
//             >
//                 {submitText}
//             </button>
//         </form>
//     );
// };

// export default Input;