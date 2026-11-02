# Instruksi agen untuk jonathangea.dev

Baca [docs/WORKFLOW.md](docs/WORKFLOW.md) saat mulai mengerjakan repo ini. Instruksi pengguna terbaru tetap menjadi sumber utama jika mereka secara jelas mengubah scope atau alur.

## Alur task dan GitHub

1. Untuk task baru yang nyata, baca kode terkait lalu pecah menjadi hasil yang dapat diperiksa. Buat Issue untuk tiap hasil yang independen; gunakan checklist untuk langkah kecil. Periksa duplikat lebih dahulu. Masukkan Issue ke Project **@JonathanGea's prompt library** dengan status **Todo**, lalu laporkan nomor dan urutan kerja. Jangan mulai mengubah kode hanya karena task sudah dicatat.
2. Pertanyaan, contoh, dan diskusi alur bukan task untuk dibuatkan Issue. Jangan mengubah Project atau repo dari contoh semata.
3. Mulai implementasi ketika pengguna menunjuk **“kerjakan Todo #<nomor>”**. Baca Issue, pindahkan item ke **In Progress**, kerjakan satu Issue aktif di branch `codex-dev`, lalu jalankan validasi yang relevan. Tidak perlu branch baru per Issue selama pekerjaan berlangsung serial.
4. Saat hasil siap diperiksa, push commit terkait ke `codex-dev`, laporkan perubahan dan tes yang benar-benar dijalankan, lalu pindahkan item ke **Review**. Jangan membuat PR ke `staging` pada tahap ini.
5. Jika pengguna mengembalikan item ke **In Progress**, kerjakan revisi pada Issue yang sama dan kembalikan ke **Review** setelah validasi.
6. Pengguna memindahkan item yang disetujui ke **Approve**. Status ini memberi izin untuk membuat dan merge PR perubahan tersebut ke `staging` setelah diff, tes, pemeriksaan wajib, dan aturan branch lulus. Periksa bahwa PR tidak membawa task lain yang belum disetujui. Jika perlu, isolasi rilis dari `staging`; jangan merge diff campuran. Setelah merge terverifikasi, pindahkan item ke **Done** dan tutup Issue bila seluruh kriteria selesai terpenuhi.

Codex tidak memantau perubahan Project di luar sesi kerja. Untuk memproses item Approve, pengguna perlu memberi tugas di chat atau menyiapkan otomasi terpisah. Jangan mengklaim item telah masuk Project atau berubah status sebelum membacanya kembali melalui API. Jika akses Projects v2 atau izin PR/merge ditolak, laporkan operasi yang terhalang dan lanjutkan bagian yang masih dapat dikerjakan. Jangan meminta token rahasia di chat.

## Cara kerja di repo

- Aplikasi adalah Angular 20. Komponen ada di `src/app`; data portofolio di `src/data`. `npm start`, `npm run build`, dan `npm test` menjalankan generator proyek lebih dulu. Jangan mengedit hasil generator di `src/app/features/projects/generated-projects.ts` atau `public/content/projects/`.
- Sebelum perubahan, periksa branch dan working tree. Pertahankan perubahan pengguna. Gunakan checkout cloud yang ada; task cloud sudah terisolasi, jadi jangan membuat Git worktree kecuali diminta pengguna.
- Untuk perubahan aplikasi, jalankan `npm run build -- --configuration production` dan `CHROME_BIN=/usr/bin/chromium npm test -- --watch=false --browsers=ChromeHeadless --progress=false` bila tool tersedia. Perubahan UI juga perlu diperiksa di browser pada desktop dan mobile, termasuk interaksi yang berubah. Laporkan kegagalan dan batas verifikasi secara jelas.
- Jangan commit, push, buat PR, merge, deploy, atau ubah GitHub Project di luar tahap yang sudah diotorisasi oleh permintaan pengguna dan alur di atas.
