"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();

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
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>

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
