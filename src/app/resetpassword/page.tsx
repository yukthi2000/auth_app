"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ResetPasswordPage() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        const params = window.location.search.split('=')[1];
        setToken(params || "");
        if (!params) {
            toast.error("Invalid reset request");
        }
    }, []);

    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/api/users/resetpassword", { token, password });
            toast.success("Password reset successfully");
            setTimeout(() => {
                router.push("/login");
            }, 3000);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-br from-purple-400 to-indigo-500">
            <Toaster position="top-right" reverseOrder={false} />
            <h1 className="text-3xl font-bold mb-6 text-white">{loading ? "Processing..." : "Reset Password"}</h1>
            
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="mt-1 mb-4 p-3 border rounded-lg w-full focus:ring focus:ring-indigo-500 focus:border-indigo-500 text-black"
                />

                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="mt-1 mb-6 p-3 border rounded-lg w-full focus:ring focus:ring-indigo-500 focus:border-indigo-500 text-black"
                />

                <button
                    className={`w-full py-3 px-4 rounded-lg text-white font-semibold tracking-wide bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 ease-in-out ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={handleResetPassword}
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Reset Password"}
                </button>
            </div>
        </div>
    );
}
