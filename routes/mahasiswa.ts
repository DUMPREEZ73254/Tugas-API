import { Elysia, t } from "elysia";

export const mahasiswaRoute = new Elysia({
    prefix: "/mahasiswa"
});

let mahasiswa = [
    {
        id: 1,
        nama: "Ahnaf Haidar",
        umur: 20,
        jurusan: "Teknik Informatika"
    },
    {
        id: 2,
        nama: "Dims DImsum",
        umur: 21,
        jurusan: "Sistem Informasi"
    },
    {
        id: 3,
        nama: "Azura D",
        umur: 20,
        jurusan: "Teknik Informatika"
    },
    {
        id: 4,
        nama: "Dump Reez",
        umur: 22,
        jurusan: "Teknik Komputer"
    },
    {
        id: 5,
        nama: "Adam Rizqi",
        umur: 20,
        jurusan: "Teknik Informatika"
    }
];


mahasiswaRoute.get("/", () => {
    return mahasiswa;
});


mahasiswaRoute.get("/:id", ({ params, status }) => {
    const mhs = mahasiswa.find(
        (m) => m.id === Number(params.id)
    );

    if (!mhs) {
        return status(404, {
            message: "tidak ditemukan Mahasiswa"
        });
    }

    return mhs;
});

mahasiswaRoute.post(
    "/",
    ({ body, status }) => {
        const newMahasiswa = {
            id: mahasiswa.length > 0
                ? Math.max(...mahasiswa.map((m) => m.id)) + 1
                : 1,
            nama: body.nama,
            umur: body.umur,
            jurusan: body.jurusan
        };

        mahasiswa.push(newMahasiswa);

        return status(201, {
            message: "berhasil menambahkan Mahasiswa",
            data: newMahasiswa
        });
    },
    {
        body: t.Object({
            nama: t.String(),
            umur: t.Number(),
            jurusan: t.String()
        })
    }
);

mahasiswaRoute.put(
    "/:id",
    ({ params, body, status }) => {
        const index = mahasiswa.findIndex(
            (m) => m.id === Number(params.id)
        );

        if (index === -1) {
            return status(404, {
                message: "tidak ditemukan Mahasiswa"
            });
        }

        mahasiswa[index] = {
            id: Number(params.id),
            nama: body.nama,
            umur: body.umur,
            jurusan: body.jurusan
        };

        return {
            message: "Data mahasiswa berhasil diubah",
            data: mahasiswa[index]
        };
    },
    {
        body: t.Object({
            nama: t.String(),
            umur: t.Number(),
            jurusan: t.String()
        })
    }
);


mahasiswaRoute.patch(
    "/:id",
    ({ params, body, status }) => {
        const index = mahasiswa.findIndex(
            (m) => m.id === Number(params.id)
        );

        if (index === -1) {
            return status(404, {
                message: "tidak ditemukan Mahasiswa"
            });
        }

        mahasiswa[index] = {
            ...mahasiswa[index],
            ...body
        };

        return {
            message: "Data mahasiswa berhasil diperbarui sebagian",
            data: mahasiswa[index]
        };
    },
    {
        body: t.Partial(
            t.Object({
                nama: t.String(),
                umur: t.Number(),
                jurusan: t.String()
            })
        )
    }
);


mahasiswaRoute.delete("/:id", ({ params, status }) => {
    const index = mahasiswa.findIndex(
        (m) => m.id === Number(params.id)
    );

    if (index === -1) {
        return status(404, {
            message: "tidak ditemukan Mahasiswa"
        });
    }

    const deleted = mahasiswa.splice(index, 1);

    return {
        message: "Mahasiswa berhasil dihapus",
        data: deleted[0]
    };
});


mahasiswaRoute.route(
    "CONNECT",
    "/connect",
    () => {
        return {
            message: "berhasil menjalankan CONNECT method"
        };
    }
);




//tambahkan endpoint dengan method PUT, PATCH,DELETE, CONNECT ,upload ke github