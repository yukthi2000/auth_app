"use client";
import Link from "next/link";
import React, { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { NextResponse, userAgent } from "next/server";
import toast, { Toaster } from "react-hot-toast";
import { setLazyProp } from "next/dist/server/api-utils";

export default function Loginpage() {
    const router = useRouter();
    const [user, setuser] = React.useState({
        email: "",
        password: "",
    })
    const[buttonDisabled,setButtonDisabled]=React.useState(false)
    const[processing,setprocessing]=React.useState(false)

useEffect(()=>{
    if(user.email.length>0 && user.password.length>0){
        setButtonDisabled(false)
    }else{
        setButtonDisabled(true)
    }
},[user])


    const onLogin = async () => {   
        try{
            setprocessing(true)

            const userdata = await axios.post("/api/users/login", user)
            toast.success(userdata.data.message)
            router.push("/profile")

        }
        catch(error:any){
toast.error(error.message)        }
        finally{
            setprocessing(false)
        }

    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{!processing? "Login":"processing"}</h1>
            <hr />

           
            <label htmlFor="email">email</label>
            <input className="text-black" type="text" id="email" value={user.email} onChange={(e) => setuser({ ...user, email: e.target.value })} placeholder="email" />
           
            <label htmlFor="password">password</label>
            <input className="text-black" type="text" id="password" value={user.password} onChange={(e) => setuser({ ...user, password: e.target.value })} placeholder="password" />

           
           <button disabled={buttonDisabled} className="border border-r-2" onClick={onLogin}>{!buttonDisabled ?"Login here":"NO Login here"}</button>
            <Link href="/signup">Visit SignUp page</Link>
            <Toaster />
        </div>
    )
}