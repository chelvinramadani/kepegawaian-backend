import prisma from "../lib/prisma.js";

// GET semua pendidikan
export const getAllPendidikan = async (req, res) => {
  try {
    const pendidikan = await prisma.pendidikan.findMany({
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
      message: "Data pendidikan berhasil diambil",
      data: pendidikan,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data pendidikan",
      error: error.message,
    });
  }
};

// GET berdasarkan ID
export const getPendidikanById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const pendidikan = await prisma.pendidikan.findUnique({
      where: { id },
      include: {
        pegawai: true,
      },
    });

    if (!pendidikan) {
      return res.status(404).json({
        success: false,
        message: "Data pendidikan tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data pendidikan berhasil ditemukan",
      data: pendidikan,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data pendidikan",
      error: error.message,
    });
  }
};

// CREATE
export const createPendidikan = async (req, res) => {
  try {
    const { nama, jenjang } = req.body;

    if (!nama) {
      return res.status(400).json({
        success: false,
        message: "Nama pendidikan wajib diisi",
      });
    }

    const pendidikan = await prisma.pendidikan.create({
      data: {
        nama,
        jenjang: jenjang || null,
      },
    });

    res.status(201).json({
      success: true,
      message: "Data pendidikan berhasil ditambahkan",
      data: pendidikan,
    });
  } catch (error) {
    console.error(error);

    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Nama pendidikan sudah digunakan",
      });
    }

    res.status(500).json({
      success: false,
      message: "Gagal menambahkan pendidikan",
      error: error.message,
    });
  }
};

// UPDATE
export const updatePendidikan = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nama, jenjang } = req.body;

    const existingPendidikan = await prisma.pendidikan.findUnique({
      where: { id },
    });

    if (!existingPendidikan) {
      return res.status(404).json({
        success: false,
        message: "Data pendidikan tidak ditemukan",
      });
    }

    if (!nama) {
      return res.status(400).json({
        success: false,
        message: "Nama pendidikan wajib diisi",
      });
    }

    const pendidikan = await prisma.pendidikan.update({
      where: { id },
      data: {
        nama,
        jenjang: jenjang || null,
      },
    });

    res.status(200).json({
      success: true,
      message: "Data pendidikan berhasil diperbarui",
      data: pendidikan,
    });
  } catch (error) {
    console.error(error);

    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Nama pendidikan sudah digunakan",
      });
    }

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui pendidikan",
      error: error.message,
    });
  }
};

// DELETE
export const deletePendidikan = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const pendidikan = await prisma.pendidikan.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            pegawai: true,
          },
        },
      },
    });

    if (!pendidikan) {
      return res.status(404).json({
        success: false,
        message: "Data pendidikan tidak ditemukan",
      });
    }

    if (pendidikan._count.pegawai > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Pendidikan tidak dapat dihapus karena masih digunakan oleh pegawai",
      });
    }

    await prisma.pendidikan.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Data pendidikan berhasil dihapus",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Gagal menghapus pendidikan",
      error: error.message,
    });
  }
};
