"use client";

import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
interface Login {
  Username: string;
  Password: string;
}
import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter();
  const [formdata, setformdata] = useState<Login>({
    Username: "",
    Password: "",
  });

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth",
        formdata
      );

      if (response.status === 200) {
        if (response.data.data.admin_type === "admin") {
         
          Swal.fire({
            text: "Berhasil Login Sebagai Admin",
            icon: "success",
          });
          router.push("/admin/absensi");
        } else {
          router.push("/guest");
          Swal.fire({
            text: "Berhasil Login Sebagai Siswa",
            icon: "success",
          });
        }
      }
    } catch (error: any) {
      console.log(error);
      Swal.fire({
        text: error.response?.data?.message,
        icon: "error",
      });
    }
  };
  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Aplikasi Absensi</h1>
        </div>

        <form
          onSubmit={handlesubmit}
          className="mx-auto mt-8 mb-0 max-w-md space-y-4"
        >
          <div>
            <label className="sr-only">Username</label>

            <div className="relative">
              <input
                type="text"
                name="Username"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
                placeholder="Masukan Username"
                onChange={handlechange}
                value={formdata.Username}
              />
            </div>
          </div>

          <div>
            <label className="sr-only">Password</label>

            <div className="relative">
              <input
                name="Password"
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
                placeholder="Masukan password"
                onChange={handlechange}
                value={formdata.Password}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="inline-block rounded-lg cursor-pointer bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
