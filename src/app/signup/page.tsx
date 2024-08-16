"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { userAgent } from "next/server";

export default function SignupPage() {

    const [user, setuser] = React.useState({
        email: "",
        password: "",
        username: "",
    })

    const onSignup = async () => {

    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>SignUp</h1>
            <hr />

            <label htmlFor="username">username</label>
            <input type="text" id="username" value={user.username} onChange={(e) => setuser({ ...user, username: e.target.value })} placeholder="username" />

            
            <label htmlFor="email">email</label>
            <input type="text" id="email" value={user.email} onChange={(e) => setuser({ ...user, email: e.target.value })} placeholder="email" />

            <label htmlFor="password">password</label>
            <input type="text" id="password" value={user.password} onChange={(e) => setuser({ ...user, password: e.target.value })} placeholder="password" />


            <button onClick={onSignup}>Sign UP</button>
            <Link href="/login">Visit Login page</Link>
        </div>
    )
}