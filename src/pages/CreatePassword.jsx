import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const CreatePassword = () => {

    const { token } = useParams();;

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();

    const isMismatch = password && confirmPassword && password !== confirmPassword;


    const handleCreatePassword = async () => {
        try {
            setLoading(true)
            let res = await axios.post(`http://localhost:1008/api/dealer/create-password/${token}`,{password});

            if(res?.data?.success){
                setLoading(false)
                toast.success("Account Activated! Login Now");
                navigate('/login');
            }

        } catch (er) {
            console.log(er);
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 ">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">Create Password</h2>
                <p className="text-gray-500 mb-6 text-sm">
                    Your password must be at least 8 characters long.
                </p>

                {/* New Password */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">New Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Confirm Password */}
                <div className="mb-2">
                    <label className="block text-gray-700 mb-1">Confirm Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isMismatch ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
                            }`}
                    />
                    {isMismatch && (
                        <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
                    )}
                </div>

                {/* Show Password */}
                <div className="flex items-center mb-6">
                    <input
                        type="checkbox"
                        id="showPassword"
                        className="mr-2"
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    <label htmlFor="showPassword" className="text-gray-700 text-sm">
                        Show Password
                    </label>
                </div>

                {/* Button */}
                <button
                    onClick={handleCreatePassword}
                    disabled={!password || isMismatch}
                    className={`w-full cursor-pointer py-2 px-4 rounded-lg bg-[#a20000d2] text-white font-semibold ${!password || isMismatch ? "bg-[#a20000d2] cursor-not-allowed" : " hover:bg-[#790000e7]"
                        }`}
                >
                    Create Password
                </button>
            </div>
        </div>
    );
};

export default CreatePassword;
