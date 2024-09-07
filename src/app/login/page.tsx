"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [processing, setProcessing] = React.useState(false);

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const onLogin = async () => {
        try {
            setProcessing(true);
            const userdata = await axios.post("/api/users/login", user);
            toast.success(userdata.data.message);
            router.push("/profile");
        } catch (error: any) {
            toast.error(error.response?.data?.error || "An error occurred");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 py-12">
            <Toaster position="top-right" reverseOrder={false} />

            {/* Card */}
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
                    {processing ? "Processing..." : "Login"}
                </h1>

                {/* Email Input */}
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Enter your email"
                    className="mt-1 mb-4 p-3 border border-gray-300 rounded-lg w-full focus:ring focus:ring-blue-500 focus:border-blue-500 text-black"
                />

                {/* Password Input */}
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Enter your password"
                    className="mt-1 mb-6 p-3 border border-gray-300 rounded-lg w-full focus:ring focus:ring-blue-500 focus:border-blue-500 text-black"
                />

                {/* Login Button */}
                <button
                    className={`w-full py-3 px-4 rounded-lg text-white font-semibold tracking-wide bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 ease-in-out ${buttonDisabled || processing ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={onLogin}
                    disabled={buttonDisabled || processing}
                >
                    {processing ? "Processing..." : "Login"}
                </button>

                {/* Forgot Password Link */}
                <Link href="/forgetpassword">
                    <p className="text-center text-indigo-600 hover:underline mt-4 text-sm">
                        Forgot your password?
                    </p>
                </Link>

                {/* Signup Link */}
                <Link href="/signup">
                    <p className="text-center text-indigo-600 hover:underline mt-4 text-sm">
                        Don't have an account? Sign Up
                    </p>
                </Link>
            </div>
        </div>
    );
}
