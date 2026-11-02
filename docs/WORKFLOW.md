# Alur kerja Codex dan GitHub

Dokumen ini menjelaskan cara mengubah task dari pengguna menjadi pekerjaan yang dapat dilacak di GitHub untuk `JonathanGea/jonathangea.dev`. **Task yang diberikan untuk dicatat** memulai breakdown dan pencatatan ke Todo. **Perintah untuk mengerjakan nomor Todo tertentu** baru memulai implementasi. Saat ini Codex dapat mengelola Issue, sedangkan kolom GitHub Project dikelola pengguna secara manual karena konektor tidak memiliki izin Projects v2.

## 1. Batas antar tahap

| Tahap | Yang dilakukan Codex | Perubahan di GitHub |
| --- | --- | --- |
| Diskusi | Membaca kode terkait dan membahas pilihan atau contoh alur di chat. | Tidak ada. |
| Terima task | Memeriksa kode, membuat breakdown dan Issue; pengguna memastikan item masuk Todo. | Issue dibuat; implementasi belum dimulai. |
| Kerjakan Todo # | Membaca Issue yang dipilih, mengubah kode di `codex-dev`, dan menguji; pengguna memindahkan item ke In Progress. | Commit pada `codex-dev`; status Project diubah pengguna. |
| Review | Menyerahkan hasil kerja dan bukti validasi; pengguna memindahkan item ke Review. | Status Project diubah pengguna. |
| Revisi | Mengerjakan ulang item yang dikembalikan pengguna ke In Progress. | Commit perbaikan ditambahkan pada `codex-dev`. |
| Approve dan rilis | Setelah pengguna memindahkan item ke Approve dan menulis `approve #<nomor>` di chat, menyiapkan PR ke `staging`, memeriksa isinya, lalu merge bila semua syarat lulus. | PR dibuat dan di-merge; setelah itu pengguna memindahkan item ke Done. |

Pertanyaan seperti “bagaimana kalau…” dan contoh task tetap berada di tahap **Diskusi**; jangan membuat Issue dari contoh. Saat pengguna benar-benar memberikan task, lakukan breakdown dan buat Issue tanpa mulai mengubah kode. Pengguna memastikan item masuk **Todo**. Saat pengguna menyebut “kerjakan Todo #<nomor>”, mulai pekerjaan hanya untuk item itu. Selama Project tidak dapat dibaca lewat API, **pesan `approve #<nomor>` di chat** setelah pengguna memindahkan item ke Approve menjadi izin untuk membuat dan merge PR item itu ke `staging`, sesuai pemeriksaan di bawah. Deploy dan publikasi tetap memerlukan instruksi tersendiri.

## 2. Memecah permintaan

1. Baca tujuan, batas pekerjaan, dan bagian kode yang terpengaruh. Untuk repo ini, periksa komponen Angular di `src/app`, data proyek di `src/data`, serta skrip di `package.json` bila relevan.
2. Tulis breakdown singkat di chat: hasil yang diharapkan, bagian pekerjaan, ketergantungan, dan pertanyaan yang benar-benar menentukan implementasi. Jika ada keputusan yang menghalangi penentuan scope, tanyakan sambil melanjutkan bagian yang sudah jelas.
3. Gunakan **satu Issue** untuk satu hasil yang dapat diperiksa sendiri. Gunakan checklist dalam Issue untuk langkah kecil. Gunakan sub-issue bila beberapa hasil perlu dikerjakan atau direview secara terpisah. Hindari Issue untuk setiap perubahan file.
4. Cantumkan kriteria selesai yang dapat diuji. Bila detail produk belum tersedia, catat sebagai keputusan terbuka; jangan mengarang warna, desain, atau perilaku yang belum dipilih.
5. Setelah pencatatan, laporkan nomor Issue, tautan Project, dan urutan kerja yang disarankan. Tunggu perintah pengguna untuk mengerjakan Todo tertentu.

Format Issue yang dianjurkan:

```md
## Tujuan
Perubahan yang diinginkan dan alasan singkatnya.

## Scope
- Bagian yang dikerjakan.
- Batas yang sudah diketahui.

## Kriteria selesai
- [ ] Perilaku atau tampilan yang dapat diperiksa.
- [ ] Tes/build yang relevan lulus.

## Keputusan terbuka
- Detail yang masih perlu dijawab sebelum implementasi.
```

## 3. GitHub Project

Project yang ditunjukkan pengguna, **@JonathanGea's prompt library**, saat ini memiliki empat kolom status. Alur ini membutuhkan kolom kelima, **Approve**, yang harus dibuat sebelum digunakan:

| Status | Arti | Perpindahan |
| --- | --- | --- |
| Todo | Task sudah dipecah dan dicatat; belum dikerjakan. | Pengguna memindahkan item ke In Progress dan memerintahkan “kerjakan Todo #”. |
| In Progress | Codex sedang mengerjakan item yang ditunjuk. | Setelah Codex menyerahkan hasil, pengguna memindahkan item ke Review. |
| Review | Pengguna memeriksa hasil. | Bila perlu perbaikan, pengguna mengembalikan item ke In Progress. Jika disetujui untuk rilis, pengguna memindahkan item ke Approve. |
| Approve | Pengguna telah menyetujui rilis item ini. | Pengguna menulis `approve #<nomor>` di chat; Codex menyiapkan dan merge PR ke `staging` setelah pemeriksaan lulus. Jika tertahan, item tetap di Approve. |
| Done | Perubahan telah berhasil di-merge ke `staging`. | Pengguna memindahkan item ke sini setelah Codex melaporkan merge yang terverifikasi. |

Saat membuat Issue, cari duplikat terlebih dahulu. Project dapat menambahkan Issue secara otomatis; dari API Issue, #4–#7 masing-masing terhubung ke satu Project, tetapi Codex tidak dapat membaca Project mana atau kolom statusnya. Pengguna memeriksa dan mengatur Todo secara manual. Jangan menyamakan status Issue (`open`/`closed`) dengan status kolom Project.

### Perintah CLI

Gunakan `gh` hanya jika autentikasi dan izin aksesnya berfungsi. Akses baca/tulis Issue dan akses **Projects v2** adalah kemampuan yang berbeda. Di lingkungan saat dokumen ini ditulis, Issue dapat dibaca/dibuat, tetapi permintaan Project mengembalikan `Resource not accessible by integration`. Karena itu, langkah Project di bawah **belum terverifikasi di lingkungan ini**. Minta perbaikan akses integrasi melalui pengaturan yang aman; jangan meminta token rahasia di chat atau menebak nomor/ID Project.

```bash
# Jalankan dari checkout repo; periksa akses dan data terlebih dahulu.
gh auth status
gh issue list --repo JonathanGea/jonathangea.dev --state all
gh project list --owner JonathanGea --format json

# Setelah pengguna memberikan task nyata, simpan deskripsi Issue ke file sementara.
gh issue create --repo JonathanGea/jonathangea.dev \
  --title '<judul hasil kerja>' --body-file /tmp/issue-body.md

# Ambil nomor Project dari hasil list; jangan menebaknya.
gh project field-list <nomor-project> --owner JonathanGea --format json
gh project item-list <nomor-project> --owner JonathanGea --format json
gh project item-add <nomor-project> --owner JonathanGea \
  --url '<URL-Issue>' --format json
```

Untuk perubahan status melalui CLI, ambil `project-id`, `item-id`, `field-id` untuk Status, dan ID opsi status dari data Project yang aktual. Perintahnya:

```bash
gh project item-edit --project-id '<project-id>' --id '<item-id>' \
  --field-id '<status-field-id>' \
  --single-select-option-id '<status-option-id>'
```

Verifikasi item dan statusnya dengan `gh project item-list` setelah perubahan. Jika Project menolak akses, laporkan Issue yang berhasil dibuat dan bagian pencatatan Project yang belum berhasil; jangan menyebutnya sudah masuk kolom Todo.

## 4. Branch, implementasi, dan PR

Branch kerja saat ini adalah `codex-dev`. Karena pekerjaan tidak berjalan paralel, kerjakan satu Issue aktif langsung di branch itu; **tidak perlu branch baru per Issue**. Kaitkan commit dengan nomor Issue dan catat commit yang termasuk pekerjaan tersebut. Setelah pengguna memindahkan item ke **Approve** dan mengirim `approve #<nomor>` di chat, Codex menyiapkan PR `codex-dev` menuju `staging` jika diff hanya berisi pekerjaan yang disetujui. Peran `main` dalam rilis perlu disepakati tersendiri.

```bash
git status --short --branch
git switch codex-dev
git pull --ff-only origin codex-dev
```

Jalankan langkah ini hanya setelah pengguna memerintahkan pengerjaan Todo tertentu. Sebelum memperbarui branch, pastikan perubahan lokal pengguna aman. Selesaikan siklus Issue aktif hingga **Done** sebelum memulai implementasi Issue berikutnya. Issue lain dapat tetap berada di Todo. Dengan urutan ini, commit yang belum disetujui tidak menumpuk di `codex-dev`. Selama pengerjaan, laporkan kemajuan yang relevan dan temuan yang mengubah scope. Jangan memperluas Issue diam-diam.

Perintah validasi utama repo:

```bash
npm ci
npm run build -- --configuration production
CHROME_BIN=/usr/bin/chromium npm test -- --watch=false --browsers=ChromeHeadless --progress=false
npm start -- --host 127.0.0.1 --port 4200
```

`prestart`, `prebuild`, dan `pretest` menjalankan generator konten. Jalankan build dan tes secara berurutan karena keduanya menulis hasil generator yang sama. Untuk perubahan tampilan atau navigasi, periksa halaman terkait di browser selain menjalankan tes. Laporkan jumlah tes, kegagalan, dan pemeriksaan manual yang benar-benar dilakukan.

Ketika pekerjaan siap diperiksa, sediakan commit pada `codex-dev` dan bukti validasi, lalu minta pengguna memindahkan item ke **Review**. Sebutkan nomor Issue dan commit yang perlu diperiksa. Belum perlu PR ke `staging` pada tahap ini.

```bash
git status --short
git log -1 --oneline
git push origin codex-dev
```

Jika pengguna menemukan kekurangan, ia mengembalikan item ke **In Progress**. Codex membaca catatan review, memperbaiki `codex-dev`, menjalankan validasi yang terdampak, dan mengirim hasilnya lagi ke **Review**. Jangan menutup Issue atau memindahkan item ke **Done** hanya karena kode sudah selesai ditulis.

Saat pengguna memindahkan item ke **Approve** dan mengirim `approve #<nomor>` di chat, Codex mengerjakan langkah rilis berikut:

1. Baca ulang Issue, hasil review, dan status PR. Karena Project belum dapat dibaca lewat API, gunakan pesan `approve #<nomor>` sebagai izin dari pengguna. Pastikan perubahan yang akan dirilis sesuai Issue yang disetujui.
2. Periksa selisih `codex-dev` terhadap `staging`. PR langsung dari `codex-dev` hanya boleh dibuat jika seluruh diff sudah disetujui untuk rilis. Jika ternyata ada commit task lain yang belum disetujui, jangan gabungkan semuanya. Siapkan branch rilis dari `staging` yang hanya memuat commit Issue ini, tangani konflik, dan jalankan ulang tes/build yang relevan. Branch rilis tersebut adalah pengecualian untuk isolasi rilis, bukan branch kerja per Issue. Jika perubahan tidak dapat dipisahkan dengan aman, laporkan hambatan dan biarkan item di Approve.
3. Buat PR ke `staging`, tautkan Issue, dan periksa diff serta pemeriksaan wajib. Ikuti aturan branch dan review GitHub; jangan melewati pemeriksaan atau memaksa merge. Bila pemeriksaan gagal, perbaiki dan ulangi pemeriksaan yang terdampak.
4. Merge PR hanya setelah syaratnya lulus. Verifikasi commit masuk ke `staging`, tutup Issue jika seluruh kriteria selesai terpenuhi, lalu laporkan hasilnya agar pengguna memindahkan item ke **Done**. Jika merge tertahan, item tetap di Approve dengan alasan yang jelas.

Contoh perintah pemeriksaan dan rilis; ganti placeholder dengan nilai aktual setelah akses diverifikasi:

```bash
git fetch origin staging codex-dev
git log --oneline origin/staging..origin/codex-dev
git diff --stat origin/staging...origin/codex-dev
gh pr create --repo JonathanGea/jonathangea.dev \
  --base staging --head codex-dev \
  --title '<hasil yang disetujui>' --body-file /tmp/staging-pr-body.md
gh pr checks '<nomor-PR>' --repo JonathanGea/jonathangea.dev
gh pr merge '<nomor-PR>' --repo JonathanGea/jonathangea.dev --merge
```

Perintah `gh pr create --head codex-dev` di atas hanya berlaku ketika seluruh diff telah disetujui. Jika diperlukan branch rilis terpisah, gunakan nama branch itu sebagai `--head` setelah memverifikasi isinya.

Codex tidak memantau Project terus-menerus di luar sesi kerja. Pengguna memindahkan item ke Approve lalu mengirim `approve #<nomor>` di chat. Untuk memicu pekerjaan tanpa pesan, perlu otomasi GitHub/webhook dan pelaksana yang dikonfigurasi terpisah. Akses **Projects v2** masih ditolak; izin membuat/merge PR belum terverifikasi di lingkungan ini.

## 5. Aturan komunikasi

- Dalam tahap Diskusi, jawab pertanyaan dan contoh; jangan membuat artefak GitHub.
- Setelah menerima task nyata, tampilkan breakdown dan buat Issue. Laporkan nomor Issue; pengguna memeriksa bahwa item berada di Todo.
- Setelah perintah “kerjakan Todo #”, pengguna memindahkan item ke In Progress; Codex mengerjakan dan melaporkan perubahan, hasil tes, serta hambatan yang masih ada.
- Setelah pekerjaan siap, pengguna memindahkan item ke Review. Jika dikembalikan ke In Progress, Codex melanjutkan revisi pada item yang sama.
- Pengguna memindahkan item yang disetujui ke Approve dan mengirim `approve #<nomor>` di chat. Codex membuat dan merge PR yang aman menuju staging, lalu pengguna memindahkan item ke Done setelah merge terverifikasi.
- Jika akses GitHub Project gagal, lanjutkan bagian yang tetap dapat dikerjakan dan sebutkan secara tepat langkah yang terhalang. Jangan menganggap screenshot sebagai akses API langsung.
- Bila Codex membuat Issue atau perubahan yang tidak diminta, hentikan perluasan pekerjaan, jelaskan kesalahan, dan pulihkan keadaan dengan cara yang diizinkan.
