import prisma from "../lib/prisma.js";

// GET semua jabatan
export const getAllJabatan = async (req, res) => {
  try {
    const jabatan = await prisma.jabatan.findMany({
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

    res.json({
      success: true,
      data: jabatan,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data jabatan",
    });
  }
};

// GET jabatan berdasarkan ID
export const getJabatanById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const jabatan = await prisma.jabatan.findUnique({
      where: { id },
      include: {
        pegawai: true,
      },
    });

    if (!jabatan) {
      return res.status(404).json({
        success: false,
        message: "Jabatan tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data jabatan berhasil ditemukan",
      data: jabatan,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data jabatan",
      error: error.message,
    });
  }
};

// CREATE jabatan
export const createJabatan = async (req, res) => {
  try {
    const { nama, keterangan } = req.body;

    if (!nama) {
      return res.status(400).json({
        success: false,
        message: "Nama jabatan wajib diisi",
      });
    }

    const jabatan = await prisma.jabatan.create({
      data: {
        nama,
        keterangan: keterangan || null,
      },
    });

    res.status(201).json({
      success: true,
      message: "Jabatan berhasil ditambahkan",
      data: jabatan,
    });
  } catch (error) {
    console.error(error);

    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Nama jabatan sudah digunakan",
      });
    }

    res.status(500).json({
      success: false,
      message: "Gagal menambahkan jabatan",
      error: error.message,
    });
  }
};

// UPDATE jabatan
export const updateJabatan = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nama, keterangan } = req.body;

    const existingJabatan = await prisma.jabatan.findUnique({
      where: { id },
    });

    if (!existingJabatan) {
      return res.status(404).json({
        success: false,
        message: "Jabatan tidak ditemukan",
      });
    }

    if (!nama) {
      return res.status(400).json({
        success: false,
        message: "Nama jabatan wajib diisi",
      });
    }

    const jabatan = await prisma.jabatan.update({
      where: { id },
      data: {
        nama,
        keterangan: keterangan || null,
      },
    });

    res.status(200).json({
      success: true,
      message: "Jabatan berhasil diperbarui",
      data: jabatan,
    });
  } catch (error) {
    console.error(error);

    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Nama jabatan sudah digunakan",
      });
    }

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui jabatan",
      error: error.message,
    });
  }
};

// DELETE jabatan
export const deleteJabatan = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const jabatan = await prisma.jabatan.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            pegawai: true,
          },
        },
      },
    });

    if (!jabatan) {
      return res.status(404).json({
        success: false,
        message: "Jabatan tidak ditemukan",
      });
    }

    if (jabatan._count.pegawai > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Jabatan tidak dapat dihapus karena masih digunakan oleh pegawai",
      });
    }

    await prisma.jabatan.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Jabatan berhasil dihapus",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Gagal menghapus jabatan",
      error: error.message,
    });
  }
};
