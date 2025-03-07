import { Navbar } from "@/components/navbar/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Siswa {
  Nis: number | null;
  Nama: string;
  Kelas: string;
  Jurusan: string;
}
const AdminSiswa = () => {
  const [data, setdata] = useState<Siswa[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newdatasiswa, setnewdatasiswa] = useState<Siswa>({
    Nis: null,
    Nama: "",
    Kelas: "",
    Jurusan: "",
  });
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/siswa");
        setdata(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/siswa", {
        Nis: newdatasiswa.Nis,
        Kelas: newdatasiswa.Kelas,
        Jurusan: newdatasiswa.Jurusan,
        Nama: newdatasiswa.Nama,
      });
      if (response.status == 200) {
        Swal.fire({
          text: "berhasil menambahkan data",
          icon: "success",
        });
      }
      window.location.reload();
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
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 bg-blue-500 m-5 text-white cursor-pointer px-4 py-2 rounded hover:bg-blue-600"
      >
        Tambah Data
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Nis
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Nama
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Kelas
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Jurusan
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
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.Nama}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.Kelas}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.Jurusan}
                  </td>
                  <td className="whitespace-nowrap cursor-pointer px-4 py-2 text-gray-700">
                    Update
                  </td>
                  <td
                    onClick={() => {
                      Swal.fire({
                        text: "Apakah Yakin Hapus data",
                        icon: "warning",
                      });
                    }}
                    className="whitespace-nowrap px-4 cursor-pointer py-2 text-gray-700"
                  >
                    Delete
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
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
                  value={newdatasiswa.Nis ?? ""}
                  onChange={(e) =>
                    setnewdatasiswa({
                      ...newdatasiswa,
                      Nis: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Nama</label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1"
                  value={newdatasiswa.Nama}
                  onChange={(e) =>
                    setnewdatasiswa({
                      ...newdatasiswa,
                      Nama: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Jurusan</label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1"
                  value={newdatasiswa.Jurusan}
                  onChange={(e) =>
                    setnewdatasiswa({
                      ...newdatasiswa,
                      Jurusan: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Kelas</label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1"
                  value={newdatasiswa.Kelas}
                  onChange={(e) =>
                    setnewdatasiswa({ ...newdatasiswa, Kelas: e.target.value })
                  }
                  required
                />
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
    </div>
  );
};

export default AdminSiswa;
