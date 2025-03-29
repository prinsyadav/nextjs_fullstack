"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React from "react";

function page() {
  const router = useRouter();
  const [user, setUser] = React.useState(null);

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log("Logout success", response.data);
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log("Logout failed", error);
      toast.error("Logout failed");
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log("User details", response.data);
      setUser(response.data.data._id);
    } catch (error: any) {
      console.log("Error getting user details", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2>
        {user === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${user}`}>{user}</Link>
        )}
      </h2>
      <button
        onClick={getUserDetails}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus-outlie-none focus:border-blue-500"
      >
        Get User Details
      </button>
      <hr />

      <button
        onClick={logout}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus-outlie-none focus:border-blue-500"
      >
        Logout
      </button>
    </div>
  );
}

export default page;
