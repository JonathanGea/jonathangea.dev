# Instruksi agen untuk jonathangea.dev

Baca [docs/WORKFLOW.md](docs/WORKFLOW.md) sebelum mengerjakan repo ini. Instruksi pengguna terbaru selalu didahulukan jika mereka mengubah alur atau scope.

## Alur kerja

1. Saat pengguna memberi task baru, baca bagian repo yang terkait, pecah task menjadi hasil yang dapat diperiksa, cek Issue yang sudah ada, lalu **buat Issue di GitHub** untuk setiap hasil independen. Langkah kecil menjadi checklist dalam Issue. Sertakan tujuan, scope, kriteria selesai, dependensi, dan referensi. Verifikasi nomor/URL Issue yang berhasil dibuat dan laporkan urutan kerja. **Jangan mulai mengubah kode pada tahap intake.** Contoh atau pertanyaan diskusi bukan task untuk dibuatkan Issue.
2. Mulai implementasi ketika pengguna menunjuk **“kerjakan issue #<nomor>”** atau instruksi setara. Baca Issue terbaru, kerjakan satu Issue aktif pada satu waktu di `codex-dev`; tidak perlu branch baru per Issue. Jalankan validasi yang relevan, commit dengan referensi nomor Issue, push ke `codex-dev`, lalu laporkan perubahan dan hasil tes untuk review. Jangan tutup Issue hanya karena kode selesai ditulis.
3. Jika pengguna meminta revisi untuk Issue yang sama, perbaiki di `codex-dev`, uji ulang bagian terdampak, push, dan laporkan hasilnya lagi.
4. Saat pengguna mengirim **“approve #<nomor>”**, periksa bahwa diff PR hanya memuat pekerjaan yang disetujui, aturan branch, dan seluruh pemeriksaan wajib. Jika aman, buat dan merge PR ke `staging`; verifikasi merge, lalu tutup Issue jika semua kriteria selesai. Jika ada task lain di `codex-dev`, isolasi perubahan untuk rilis atau laporkan hambatan; jangan merge perubahan yang belum disetujui. Deploy dan publikasi memerlukan instruksi tersendiri.

GitHub Issue adalah sumber tugas utama. GitHub Project boleh dipakai pengguna sebagai papan visual, tetapi **jangan mewajibkan item atau status Project** untuk intake maupun implementasi: ChatGPT Codex Connector saat ini tidak memiliki izin Projects v2. Jangan mengklaim sudah memindahkan kolom yang tidak dapat diakses. Jika izin berubah, uji akses aktual sebelum mengelola Project. Codex tidak memantau GitHub terus-menerus di luar sesi; pengguna memicu pengerjaan/review/rilis melalui chat. Jangan minta token rahasia di chat.

## Cara kerja di repo

- Aplikasi menggunakan Angular 20. Komponen berada di `src/app`; data portofolio di `src/data`. `npm start`, `npm run build`, dan `npm test` menjalankan generator proyek. Jangan edit hasil generator di `src/app/features/projects/generated-projects.ts` atau `public/content/projects/`.
- Periksa branch dan working tree sebelum mengubah file. Pertahankan perubahan pengguna. Gunakan checkout cloud yang ada; task cloud sudah terisolasi, jadi jangan buat Git worktree kecuali diminta pengguna.
- Untuk perubahan aplikasi, jalankan build produksi dan tes Chromium yang relevan. Perubahan UI juga perlu pemeriksaan browser desktop/mobile. Catat hasil yang benar-benar dijalankan dan keterbatasannya.
