import { Navbar } from "@/components/navbar/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Absensi {
  ID: number;
  Nis: number;
  masuk: Date;
  keterangan: string;
  point: number;
  sanksi: string;
  terlambat: string;
}

interface PostAbsensi {
  Nis: number | null;
  terlambat: string;
  keterangan: string;
  point: number | null;
  sanksi: string;
}

const AdminAbsensi = () => {
  const [data, setdata] = useState<Absensi[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAbsensi, setNewAbsensi] = useState<PostAbsensi>({
    Nis: null,
    keterangan: "",
    point: null,
    sanksi: "",
    terlambat: "",
  });
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/absensi", {
        nis: newAbsensi.Nis,
        keterangan: newAbsensi.keterangan,
        terlambat: newAbsensi.terlambat,
        point: newAbsensi.point,
        sanksi: newAbsensi.sanksi,
      });
      Swal.fire({
        icon: "success",
        text: "Data berhasil ditambahkan",
      });
      window.location.reload();
      setIsModalOpen(false);
      // Refresh the data
      const response = await axios.get("http://localhost:3000/api/absensi");
      setdata(response.data.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Gagal menambahkan data",
      });
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="p-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-4 bg-blue-500 text-white cursor-pointer px-4 py-2 rounded hover:bg-blue-600"
        >
          Tambah Absensi
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Tambah Absensi</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1">NIS</label>
                <input
                  type="number"
                  className="w-full border rounded px-2 py-1"
                  value={newAbsensi.Nis ?? ""}
                  onChange={(e) =>
                    setNewAbsensi({
                      ...newAbsensi,
                      Nis: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Keterangan</label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1"
                  value={newAbsensi.keterangan}
                  onChange={(e) =>
                    setNewAbsensi({ ...newAbsensi, keterangan: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Point</label>
                <input
                  type="number"
                  className="w-full border rounded px-2 py-1"
                  value={newAbsensi.point ?? ""}
                  onChange={(e) =>
                    setNewAbsensi({
                      ...newAbsensi,
                      point: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Sanksi</label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1"
                  value={newAbsensi.sanksi}
                  onChange={(e) =>
                    setNewAbsensi({ ...newAbsensi, sanksi: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Terlambat</label>
                <select
                  className="w-full border rounded px-2 py-1"
                  value={newAbsensi.terlambat}
                  onChange={(e) =>
                    setNewAbsensi({ ...newAbsensi, terlambat: e.target.value })
                  }
                  required
                >
                  <option value="">Pilih Status</option>
                  <option value="Terlambat">Terlambat</option>
                  <option value="Tepat Waktu">Tepat Waktu</option>
                  <option value="Sakit">Sakit</option>
                  <option value="Izin">Izin</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
                Terlambat
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Sanksi
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Action
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
                    {item.terlambat}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.sanksi}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 cursor-pointer text-gray-700">
                    Update
                  </td>
                  <td
                    onClick={() => {
                      Swal.fire({
                        text: "apakah yakin hapus data",
                        icon: "warning",
                      });
                    }}
                    className="whitespace-nowrap px-4 py-2 cursor-pointer text-gray-700"
                  >
                    Delete
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

export default AdminAbsensi;
