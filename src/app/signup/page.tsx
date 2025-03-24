"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

function SignupPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    // Signup logic will be implemented here
    try {
      const { data } = await axios.post("/api/users/signup", user);
      console.log("Signup success", data);
      router.push("/login");
    } catch (error) {
      console.log("Signup failed", error);
    }
  };

  useEffect(() => {
    if (!user.email || !user.password || !user.username) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="font-bold mb-4 text-4xl">
        Signup {loading && <span className="animate-spin">🔄</span>}
      </h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus-outlie-none focus:border-blue-500"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus-outlie-none focus:border-blue-500"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus-outlie-none focus:border-blue-500"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        className="p-2 bg-blue-500 text-white rounded-lg mb-4"
        onClick={onSignup}
        disabled={buttonDisabled}
      >
        {buttonDisabled ? "Please fill all fields" : "Signup"}
      </button>
      <Link href="/login">Already have an account? Login</Link>
    </div>
  );
}

export default SignupPage;
