# Alur kerja Codex dan GitHub Issues

Repository: `JonathanGea/jonathangea.dev`. **Issue GitHub adalah daftar tugas utama.** Saat pengguna memberi task, Codex langsung membuat breakdown dan mencatatnya sebagai Issue di GitHub. Pengerjaan kode dimulai setelah pengguna memilih nomor Issue.

## 1. Task masuk → Issue di GitHub

1. Baca permintaan dan kode yang terkait. Bedakan task nyata dari contoh atau pertanyaan diskusi.
2. Pecah task berdasarkan hasil yang dapat diperiksa sendiri. Satu hasil independen menjadi satu Issue; langkah kecil menjadi checklist. Tambahkan dependensi dan urutan jika beberapa Issue saling bergantung.
3. Periksa Issue terbuka dan tertutup agar tidak membuat duplikat. Buat Issue yang diperlukan di `JonathanGea/jonathangea.dev`. Pada tahap ini jangan mengimplementasikan kode.
4. Baca kembali Issue yang dibuat, lalu laporkan nomor, tautan, dan urutan pengerjaan. Jika pembuatan Issue gagal, laporkan kegagalan sebenarnya; jangan menyebutnya sudah tercatat.

Isi Issue yang dianjurkan:

```md
## Tujuan
Hasil yang diinginkan dan alasan singkatnya.

## Scope
- Bagian yang dikerjakan dan batasnya.

## Kriteria selesai
- [ ] Perilaku atau tampilan yang dapat diperiksa.
- [ ] Validasi yang relevan lulus.

## Dependensi dan keputusan terbuka
- Issue lain yang harus selesai lebih dahulu atau detail produk yang perlu ditentukan.
```

Contoh perintah, dari checkout repo:

```bash
gh issue list --repo JonathanGea/jonathangea.dev --state all --limit 50
gh issue create --repo JonathanGea/jonathangea.dev \
  --title '<hasil pekerjaan>' --body-file /tmp/issue-body.md
gh issue view '<nomor>' --repo JonathanGea/jonathangea.dev
```

Gunakan file sementara untuk body agar baris dan checklist tetap utuh. Jangan meminta atau menyimpan token GitHub di Issue.

## 2. Pengguna memilih Issue → implementasi

Pengguna memerintahkan, misalnya, **`kerjakan issue #4`**. Codex membaca Issue terbaru dan mulai bekerja pada `codex-dev`. Hanya satu Issue aktif dikerjakan pada satu waktu; tidak perlu membuat branch per Issue. Jika scope berubah, perbarui Issue dan jelaskan perubahan yang relevan.

```bash
git status --short --branch
git switch codex-dev
git pull --ff-only origin codex-dev
```

Periksa perubahan lokal sebelum `pull` dan jangan menimpa pekerjaan pengguna. Kaitkan commit dengan nomor Issue, misalnya `Add prompt library catalog (refs #4)`. Setelah implementasi dan tes selesai, push ke `codex-dev`, laporkan commit serta hasil validasi, dan serahkan ke pengguna untuk review. **Issue tetap terbuka saat review.**

Validasi utama repo:

```bash
npm run build -- --configuration production
CHROME_BIN=/usr/bin/chromium npm test -- --watch=false --browsers=ChromeHeadless --progress=false
```

`prebuild` dan `pretest` menjalankan generator konten; jalankan perintah secara berurutan. Untuk UI, periksa route dan interaksi yang berubah di browser desktop/mobile, bukan hanya hasil build. Laporkan kegagalan, tes yang dilewati, dan batas pemeriksaan secara jujur.

## 3. Review → revisi atau rilis

Jika pengguna meminta perbaikan, Codex melanjutkan Issue yang sama, menguji ulang bagian terdampak, commit/push perubahan, dan menyerahkan hasil untuk review lagi.

Jika pengguna mengirim **`approve #<nomor>`**, itu mengizinkan Codex menyiapkan dan merge PR untuk Issue tersebut ke `staging`, dengan syarat:

1. Baca kembali Issue, commit terkait, dan perbedaan `codex-dev` terhadap `staging`.
2. Pastikan PR hanya memuat perubahan yang disetujui. Jika `codex-dev` juga memiliki task lain, buat branch rilis dari `staging` dengan perubahan Issue yang disetujui saja, uji ulang, atau laporkan hambatan jika tidak dapat diisolasi dengan aman.
3. Buat PR ke `staging`, tautkan Issue, periksa diff dan pemeriksaan wajib. Jangan bypass aturan branch atau memaksa merge.
4. Setelah merge berhasil, verifikasi commit di `staging` dan tutup Issue bila kriteria selesai terpenuhi. Jika merge tertahan, biarkan Issue terbuka dan laporkan alasannya.

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

Perintah PR dari `codex-dev` hanya berlaku jika **seluruh diff** sudah disetujui. Jika diperlukan branch rilis terpisah, gunakan branch tersebut sebagai `--head`. Deploy dan publikasi mengikuti instruksi pengguna yang terpisah.

## GitHub Project sebagai tampilan opsional

Pengguna boleh mengatur kolom GitHub Project secara manual. Pembuatan Issue **tidak bergantung** pada Project. Saat dokumen ini ditulis, ChatGPT Codex Connector dapat mengelola Issue tetapi tidak memiliki izin Projects v2, sehingga Codex tidak dapat membaca atau memindahkan kolom Project. Jangan mengklaim status `Todo`, `In Progress`, `Review`, `Approve`, atau `Done` tanpa akses dan verifikasi aktual. Jika izin Project tersedia di masa depan, uji operasi baca/tulis sebelum mengotomatisasi status.
