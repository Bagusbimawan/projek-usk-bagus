-- CreateTable
CREATE TABLE "siswa" (
    "ID" SERIAL NOT NULL,
    "Nis" INTEGER NOT NULL,
    "Nama" TEXT NOT NULL,
    "Kelas" TEXT NOT NULL,
    "Jurusan" TEXT NOT NULL,

    CONSTRAINT "siswa_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "user" (
    "ID" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "admin_type" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "absensi" (
    "ID" SERIAL NOT NULL,
    "masuk" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "keterangan" TEXT NOT NULL,
    "terlambat" TEXT NOT NULL,
    "point" INTEGER NOT NULL,
    "sanksi" TEXT NOT NULL,
    "Idsiswa" INTEGER NOT NULL,

    CONSTRAINT "absensi_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "siswa_Nis_key" ON "siswa"("Nis");

-- AddForeignKey
ALTER TABLE "absensi" ADD CONSTRAINT "absensi_Idsiswa_fkey" FOREIGN KEY ("Idsiswa") REFERENCES "siswa"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
