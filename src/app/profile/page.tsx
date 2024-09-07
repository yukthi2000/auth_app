"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [userdata, setuserdata] = useState<any>(null);

  async function fetchdata() {
    try {
      const id = await axios.get("/api/users/me");
      console.log(id.data.data);
      setuserdata(id.data.data.username);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  function gotoprofile() {
    router.push("/profile/" + userdata);
  }

  async function logout() {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-600 to-indigo-700 py-8 text-white">
      <Toaster />

      {/* Header */}
      <h1 className="text-5xl font-bold mb-6">Profile</h1>
      <p className="text-lg mb-8">Welcome to your profile page, {userdata ? userdata : "Guest"}</p>

      {/* Buttons */}
      <div className="space-y-4">
        <button
          onClick={fetchdata}
          className="bg-white text-purple-600 hover:bg-purple-100 px-6 py-3 rounded-lg shadow-md transition-all duration-300 ease-in-out"
        >
          Get Data
        </button>

        <button
          onClick={gotoprofile}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 ease-in-out"
          disabled={!userdata}
        >
          Go to Profile
        </button>

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 ease-in-out"
        >
          Logout
        </button>
      </div>

      {/* User Data */}
      {userdata && (
        <div className="mt-10 bg-white text-purple-600 p-6 rounded-lg shadow-lg max-w-xs w-full text-center">
          <h2 className="text-xl font-semibold">Username:</h2>
          <p className="text-lg">{userdata}</p>
        </div>
      )}
    </div>
  );
}
