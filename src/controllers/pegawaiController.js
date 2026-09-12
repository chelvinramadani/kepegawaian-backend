import prisma from "../lib/prisma.js";

// GET semua pegawai
export const getAllPegawai = async (req, res) => {
  try {
    const pegawai = await prisma.pegawai.findMany({
      include: {
        jabatan: true,
        unit: true,
        pendidikan: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      message: "Data pegawai berhasil diambil",
      data: pegawai,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data pegawai",
      error: error.message,
    });
  }
};

// GET pegawai berdasarkan ID
export const getPegawaiById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const pegawai = await prisma.pegawai.findUnique({
      where: {
        id,
      },
      include: {
        jabatan: true,
        unit: true,
        pendidikan: true,
      },
    });

    if (!pegawai) {
      return res.status(404).json({
        success: false,
        message: "Pegawai tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data pegawai berhasil ditemukan",
      data: pegawai,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data pegawai",
      error: error.message,
    });
  }
};

// CREATE pegawai
export const createPegawai = async (req, res) => {
  try {
    const {
      nip,
      nama,
      nik,
      tempatLahir,
      tanggalLahir,
      jenisKelamin,
      alamat,
      noTelepon,
      email,
      tanggalMasuk,
      status,
      jabatanId,
      unitId,
      pendidikanId,
    } = req.body;

    if (!nip || !nama || !jenisKelamin) {
      return res.status(400).json({
        success: false,
        message: "NIP, nama, dan jenis kelamin wajib diisi",
      });
    }

    const pegawai = await prisma.pegawai.create({
      data: {
        nip,
        nama,
        nik: nik || null,
        tempatLahir: tempatLahir || null,
        tanggalLahir: tanggalLahir ? new Date(tanggalLahir) : null,
        jenisKelamin,
        alamat: alamat || null,
        noTelepon: noTelepon || null,
        email: email || null,
        tanggalMasuk: tanggalMasuk ? new Date(tanggalMasuk) : null,
        status: status || "Aktif",
        jabatanId: jabatanId ? Number(jabatanId) : null,
        unitId: unitId ? Number(unitId) : null,
        pendidikanId: pendidikanId ? Number(pendidikanId) : null,
      },
      include: {
        jabatan: true,
        unit: true,
        pendidikan: true,
      },
    });

    res.status(201).json({
      success: true,
      message: "Pegawai berhasil ditambahkan",
      data: pegawai,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Gagal menambahkan pegawai",
      error: error.message,
    });
  }
};

// UPDATE pegawai
export const updatePegawai = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const {
      nip,
      nama,
      nik,
      tempatLahir,
      tanggalLahir,
      jenisKelamin,
      alamat,
      noTelepon,
      email,
      tanggalMasuk,
      status,
      jabatanId,
      unitId,
      pendidikanId,
    } = req.body;

    const existingPegawai = await prisma.pegawai.findUnique({
      where: { id },
    });

    if (!existingPegawai) {
      return res.status(404).json({
        success: false,
        message: "Pegawai tidak ditemukan",
      });
    }

    const pegawai = await prisma.pegawai.update({
      where: {
        id,
      },
      data: {
        nip,
        nama,
        nik: nik || null,
        tempatLahir: tempatLahir || null,
        tanggalLahir: tanggalLahir ? new Date(tanggalLahir) : null,
        jenisKelamin,
        alamat: alamat || null,
        noTelepon: noTelepon || null,
        email: email || null,
        tanggalMasuk: tanggalMasuk ? new Date(tanggalMasuk) : null,
        status: status || "Aktif",
        jabatanId: jabatanId ? Number(jabatanId) : null,
        unitId: unitId ? Number(unitId) : null,
        pendidikanId: pendidikanId ? Number(pendidikanId) : null,
      },
      include: {
        jabatan: true,
        unit: true,
        pendidikan: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Data pegawai berhasil diperbarui",
      data: pegawai,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui data pegawai",
      error: error.message,
    });
  }
};

// DELETE pegawai
export const deletePegawai = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existingPegawai = await prisma.pegawai.findUnique({
      where: { id },
    });

    if (!existingPegawai) {
      return res.status(404).json({
        success: false,
        message: "Pegawai tidak ditemukan",
      });
    }

    await prisma.pegawai.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Pegawai berhasil dihapus",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Gagal menghapus pegawai",
      error: error.message,
    });
  }
};
