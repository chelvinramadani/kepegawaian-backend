import prisma from "../lib/prisma.js";

export const getDashboard = async (req, res) => {
  try {
    // ================================
    // STATISTIK DASAR
    // ================================

    const [totalPegawai, pegawaiAktif, pegawaiNonaktif, lakiLaki, perempuan] =
      await Promise.all([
        prisma.pegawai.count(),

        prisma.pegawai.count({
          where: {
            status: "Aktif",
          },
        }),

        prisma.pegawai.count({
          where: {
            status: {
              not: "Aktif",
            },
          },
        }),

        prisma.pegawai.count({
          where: {
            jenisKelamin: "Laki-laki",
          },
        }),

        prisma.pegawai.count({
          where: {
            jenisKelamin: "Perempuan",
          },
        }),
      ]);

    // ================================
    // BERDASARKAN JABATAN
    // ================================

    const berdasarkanJabatan = await prisma.jabatan.findMany({
      select: {
        id: true,
        nama: true,
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

    // ================================
    // BERDASARKAN UNIT KERJA
    // ================================

    const berdasarkanUnitKerja = await prisma.unitKerja.findMany({
      select: {
        id: true,
        nama: true,
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

    // ================================
    // BERDASARKAN PENDIDIKAN
    // ================================

    const berdasarkanPendidikan = await prisma.pendidikan.findMany({
      select: {
        id: true,
        nama: true,
        jenjang: true,
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

    // ================================
    // PEGAWAI TERBARU
    // ================================

    const pegawaiTerbaru = await prisma.pegawai.findMany({
      take: 5,

      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
        nip: true,
        nama: true,
        jenisKelamin: true,
        status: true,

        jabatan: {
          select: {
            nama: true,
          },
        },

        unit: {
          select: {
            nama: true,
          },
        },
      },
    });

    // ================================
    // RESPONSE
    // ================================

    res.json({
      success: true,

      data: {
        statistik: {
          totalPegawai,
          pegawaiAktif,
          pegawaiNonaktif,
          lakiLaki,
          perempuan,
        },

        berdasarkanJabatan,

        berdasarkanUnitKerja,

        berdasarkanPendidikan,

        pegawaiTerbaru,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data dashboard.",
    });
  }
};
