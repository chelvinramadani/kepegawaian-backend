import prisma from "../lib/prisma.js";

// GET semua unit kerja
export const getAllUnitKerja = async (req, res) => {
  try {
    const unitKerja = await prisma.unitKerja.findMany({
      include: {
        _count: {
          select: {
            pegawai: true,
          },
        },
      },
      orderBy: {
        nama: "asc",
      },
    });

    res.status(200).json({
      success: true,
      message: "Data unit kerja berhasil diambil",
      data: unitKerja,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data unit kerja",
      error: error.message,
    });
  }
};

// GET berdasarkan ID
export const getUnitKerjaById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const unitKerja = await prisma.unitKerja.findUnique({
      where: { id },
      include: {
        pegawai: true,
      },
    });

    if (!unitKerja) {
      return res.status(404).json({
        success: false,
        message: "Unit kerja tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data unit kerja berhasil ditemukan",
      data: unitKerja,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data unit kerja",
      error: error.message,
    });
  }
};

// CREATE
export const createUnitKerja = async (req, res) => {
  try {
    const { nama, keterangan } = req.body;

    if (!nama) {
      return res.status(400).json({
        success: false,
        message: "Nama unit kerja wajib diisi",
      });
    }

    const unitKerja = await prisma.unitKerja.create({
      data: {
        nama,
        keterangan: keterangan || null,
      },
    });

    res.status(201).json({
      success: true,
      message: "Unit kerja berhasil ditambahkan",
      data: unitKerja,
    });
  } catch (error) {
    console.error(error);

    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Nama unit kerja sudah digunakan",
      });
    }

    res.status(500).json({
      success: false,
      message: "Gagal menambahkan unit kerja",
      error: error.message,
    });
  }
};

// UPDATE
export const updateUnitKerja = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nama, keterangan } = req.body;

    const existingUnit = await prisma.unitKerja.findUnique({
      where: { id },
    });

    if (!existingUnit) {
      return res.status(404).json({
        success: false,
        message: "Unit kerja tidak ditemukan",
      });
    }

    if (!nama) {
      return res.status(400).json({
        success: false,
        message: "Nama unit kerja wajib diisi",
      });
    }

    const unitKerja = await prisma.unitKerja.update({
      where: { id },
      data: {
        nama,
        keterangan: keterangan || null,
      },
    });

    res.status(200).json({
      success: true,
      message: "Unit kerja berhasil diperbarui",
      data: unitKerja,
    });
  } catch (error) {
    console.error(error);

    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Nama unit kerja sudah digunakan",
      });
    }

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui unit kerja",
      error: error.message,
    });
  }
};

// DELETE
export const deleteUnitKerja = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const unitKerja = await prisma.unitKerja.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            pegawai: true,
          },
        },
      },
    });

    if (!unitKerja) {
      return res.status(404).json({
        success: false,
        message: "Unit kerja tidak ditemukan",
      });
    }

    if (unitKerja._count.pegawai > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Unit kerja tidak dapat dihapus karena masih digunakan oleh pegawai",
      });
    }

    await prisma.unitKerja.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Unit kerja berhasil dihapus",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Gagal menghapus unit kerja",
      error: error.message,
    });
  }
};
