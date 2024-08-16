"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { userAgent } from "next/server";

export default function Loginpage() {

    const [user, setuser] = React.useState({
        email: "",
        password: "",
    })

    const onLogin = async () => {

    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Login</h1>
            <hr />

           
            <label htmlFor="email">email</label>
            <input type="text" id="email" value={user.email} onChange={(e) => setuser({ ...user, email: e.target.value })} placeholder="email" />
           
            <label htmlFor="password">password</label>
            <input type="text" id="password" value={user.password} onChange={(e) => setuser({ ...user, password: e.target.value })} placeholder="password" />

           
           <button onClick={onLogin}>Login here</button>
            <Link href="/signup">Visit SignUp page</Link>
        </div>
    )
}