"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createUser, getuser } from "@/actions/actions";
import { useState } from "react";
import Router, { useRouter } from "next/navigation"

// Form Schema
const formSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

 function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createUser(data.username,data.password)
    router.push("/");
    console.log("User created");
  };

  const router = useRouter();

  const getUSER = () => {
    console.log("User fetched!");
  };

  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div
      className={`min-h-screen flex justify-center items-center transition-all duration-700 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Dark/Light Mode Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`absolute top-5 right-5 p-2 rounded-full transition-colors ${
          isDarkMode ? "bg-gray-700 text-gray-100" : "bg-gray-200 text-gray-900"
        } hover:bg-gray-500`}
      >
        {isDarkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
      </button>

      {/* Form Container */}
      <div
        className={`w-full max-w-lg p-8 rounded-lg shadow-lg ${
          isDarkMode
            ? "bg-gray-800 border border-gray-700"
            : "bg-white border border-gray-200"
        }`}
      >
        <h1 className="text-3xl font-semibold mb-6 text-center tracking-wide">
          Sign In
        </h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Username Field */}
          <div>
            <label className="block text-sm mb-2 font-medium">Username</label>
            <input
              {...form.register("username")}
              type="text"
              placeholder="Enter your username"
              className={`w-full px-4 py-2 rounded-md bg-transparent border ${
                isDarkMode
                  ? "border-gray-600 focus:ring-gray-500"
                  : "border-gray-300 focus:ring-gray-400"
              } focus:outline-none focus:ring-1`}
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm mb-2 font-medium">Password</label>
            <input
              {...form.register("password")}
              type="password"
              placeholder="••••••••"
              className={`w-full px-4 py-2 rounded-md bg-transparent border ${
                isDarkMode
                  ? "border-gray-600 focus:ring-gray-500"
                  : "border-gray-300 focus:ring-gray-400"
              } focus:outline-none focus:ring-1`}
            />
          </div>

          {/* Buttons */}
          <button
            type="submit"
            className={`w-full py-2 rounded-md font-medium transition-all ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-900 hover:bg-gray-700 text-gray-100"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => form.reset()}
            className="w-full py-2 rounded-md text-sm text-gray-500 hover:underline"
          >
            Reset Form
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
