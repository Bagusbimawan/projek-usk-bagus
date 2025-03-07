"use client";
import Button from "@/components/Button/Button";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Absensi {
  ID: number;
  Nis: number;
  masuk: Date;
  keterangan: string;
  point: number;
  sanksi: string;
}
const Siswa = () => {
  const [data, setdata] = useState<Absensi[]>([]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/absensi");
        setdata(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  return (
    <div>
      <div>
        <Link href="/">
          <Button name="logout" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Nis
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Keterangan
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Waktu
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Point
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Sanksi
              </th>
            </tr>
          </thead>
          {data.map((item, index) => {
            return (
              <tbody key={index} className="divide-y divide-gray-200">
                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {item.Nis}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {item.keterangan}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {new Date(item.masuk).toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.point}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.sanksi}
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Siswa;
