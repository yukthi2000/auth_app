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
            //add 3 seconds delay
            setTimeout(() => {
                router.push("/login");
            }, 3000);
            router.push("/login");
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
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing..." : "Sign Up"}</h1>
            <hr />

            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="Username"
                className="text-black mb-2 p-2 border rounded"
            />

            <label htmlFor="email">Email</label>
            <input
                type="text"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
                className="mb-2 p-2 border rounded"
            />

            <label htmlFor="password">Password</label>
            <input
                className="mb-2 p-2 border rounded text-black"
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
            />

            <button
                className={`border border-gray-500 border-2 rounded px-4 py-2 ${buttonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={onSignup}
                disabled={buttonDisabled}
            >
                {loading ? "Processing..." : "Sign Up"}
            </button>
            <Link className="text-orange-300 mt-4" href="/login">Visit Login page</Link>
            <Toaster />
        </div>
    );
}