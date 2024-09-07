"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ForgetPasswordPage() {
    const [email, setEmail] = useState<string>("");
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            const res = await axios.post("/api/users/forgetpassword", { email });
            toast.success(res.data.message);
            // router.push("/resetpassword");
            
        } catch (error: any) {
            if (error.response) {
                toast.error(error.response.data.error || "An error occurred");
            } else {
                toast.error("An error occurred");
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 py-12">
            <Toaster position="top-right" reverseOrder={false} />
            
            {/* Card */}
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">Forgot Password</h1>
                <h2 className="text-center text-gray-700 mb-4">Enter your email to reset your password</h2>

                {/* Email Input */}
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 mb-6 p-3 border border-gray-300 rounded-lg w-full focus:ring focus:ring-blue-500 focus:border-blue-500 text-black"
                />

                {/* Submit Button */}
                <button
                    className={`w-full py-3 px-4 rounded-lg text-white font-semibold tracking-wide bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 ease-in-out ${!email ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={handleSubmit}
                    disabled={!email} // Disable button if email is empty
                >
                    Submit
                </button>
            </div>
        </div>
    )
}
