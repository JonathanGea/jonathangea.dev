# Data proyek portfolio

Setiap folder proyek berisi:

- `metadata.json`: identitas, ringkasan kartu, kategori, teknologi, tahun, URL demo, cover, dan urutan tampil.
- `README.md`: konten halaman detail dalam Markdown.
- `images/`: screenshot lokal jika tersedia. Portal Berita memakai URL gambar dari service sebelumnya.

Proyek yang digunakan:

1. `e-commerce`
2. `dashboard-e-commerce`
3. `portal-berita`

Path gambar lokal pada metadata dan Markdown relatif terhadap folder proyek. `slug` digunakan untuk URL detail, misalnya `/projects/e-commerce`.

Metadata awal diambil dari `src/app/features/projects/services/project-api.ts`. ID, tahun, dan URL demo dipertahankan; judul dan ringkasan dashboard dirapikan. Cover E-Commerce dan Dashboard memakai screenshot yang tersedia. Tautan placeholder `#` dihilangkan. `currentIndex` adalah state slider dan tidak disimpan sebagai konten.

README E-Commerce dan Dashboard memuat informasi implementasi yang lebih rinci daripada metadata teknologi lama dari service. Metadata teknologi saat ini tetap mengikuti service sesuai permintaan; cocokkan dengan implementasi sebenarnya sebelum publikasi.

## Mengubah konten

Edit `metadata.json` untuk kartu proyek dan `README.md` untuk halaman detail. Tambahkan folder baru dengan struktur yang sama untuk menambah proyek; hapus folder proyek untuk menghapusnya dari daftar. Domain filter diambil otomatis dari metadata.

`npm start`, `npm run build`, `npm run watch`, dan `npm test` otomatis menjalankan generator konten sebelum Angular. Generator membaca folder proyek, memvalidasi metadata dan gambar, mengubah Markdown menjadi HTML, dan menyalin gambar lokal ke `public/content/projects/`. Hasil generator diabaikan Git; jangan edit file hasilnya.

Saat dev server sudah berjalan, jalankan `npm run generate:projects` setelah mengedit data untuk memperbarui preview. Untuk publikasi, jalankan build dan deploy ulang.

Detail tersedia di `/projects/:slug`. Server `server.js` sudah memiliki fallback ke `index.html` untuk membuka atau me-refresh URL detail secara langsung. Hosting statis lain perlu fallback SPA yang sama.
