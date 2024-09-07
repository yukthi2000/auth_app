"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const userdata = await axios.post("/api/users/signup", user);
            console.log(userdata.data);
            toast.success(userdata.data.message);
            // add 3 seconds delay
            setTimeout(() => {
                router.push("/login");
            }, 3000);
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-500 py-12">
            <Toaster position="top-right" reverseOrder={false} />

            {/* Card */}
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
                    {loading ? "Processing..." : "Sign Up"}
                </h1>

                {/* Username Input */}
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Enter your username"
                    className="mt-1 mb-4 p-3 border border-gray-300 rounded-lg w-full focus:ring focus:ring-green-500 focus:border-green-500 text-black"
                />

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
                    className="mt-1 mb-4 p-3 border border-gray-300 rounded-lg w-full focus:ring focus:ring-green-500 focus:border-green-500 text-black"
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
                    className="mt-1 mb-6 p-3 border border-gray-300 rounded-lg w-full focus:ring focus:ring-green-500 focus:border-green-500 text-black"
                />

                {/* Sign Up Button */}
                <button
                    className={`w-full py-3 px-4 rounded-lg text-white font-semibold tracking-wide bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 ease-in-out ${buttonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={onSignup}
                    disabled={buttonDisabled}
                >
                    {loading ? "Processing..." : "Sign Up"}
                </button>

                {/* Login Link */}
                <Link href="/login">
                    <p className="text-center text-green-600 hover:underline mt-6 text-sm">
                        Already have an account? Visit Login page
                    </p>
                </Link>
            </div>
        </div>
    );
}
