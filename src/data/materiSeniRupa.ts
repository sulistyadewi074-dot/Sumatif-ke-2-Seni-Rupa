/**
 * Modul Pembelajaran Seni Rupa Kelas VI
 * Materi: Ikatan dan Simpul (Seni Kerajinan Makrame)
 * SD NEGERI 3 LOLOAN TIMUR
 */

export interface SimpulDetail {
  id: string;
  nama: string;
  namaInternasional: string;
  fungsi: string;
  karakteristik: string;
  langkahPembuatan: string[];
  contohAplikasi: string;
}

export const MATERI_SENI_RUPA = {
  judul: "Ikatan dan Simpul dalam Seni Rupa (Seni Makrame)",
  kelas: "VI (Enam) Sekolah Dasar",
  semester: "Genap",
  kktp: 60,
  
  pengantar: {
    pengertianIkatanDanSimpul: `Dalam kehidupan sehari-hari maupun seni kerajinan tangan, istilah 'simpul' dan 'ikatan' sering digunakan bersamaan, namun keduanya memiliki perbedaan mendasar:
1. SIMPUL (Knot): Hubungan antara tali dengan tali lainnya, atau ikal pada tali itu sendiri untuk membentuk pola atau sambungan tertentu.
2. IKATAN (Hitch / Lashing): Hubungan antara tali dengan benda lain (seperti tongkat kayu, cincin logam/ring, atau tiang) untuk mengikat atau menggantungkan tali tersebut.`,
    
    seniMakrame: `Seni Makrame (Macramé) adalah seni kerajinan tangan yang memanfaatkan teknik pilinan atau simpul-menyimpul untaian benang/tali tanpa menggunakan jarum rajut atau mesin tenun. Istilah makrame berasal dari bahasa Arab 'Migramah' yang bermakna hiasan rumbai-rumbai atau pinggiran anyaman. Karya makrame memiliki dua fungsi utama:
1. Fungsi Praktis/Pakai: Digunakan untuk benda pakai fungsional seperti gantungan pot bunga (plant hanger), gantungan kunci, tas jaring, sabuk, dan gelang.
2. Fungsi Estetis/Hias: Memperindah ruangan, seperti hiasan dinding (wall hanging), tirai pembatas ruangan, kap lampu, dan taplak meja.`,
    
    alatDanBahan: [
      {
        nama: "Tali Katun (Macrame Cotton Cord)",
        keterangan: "Bahan paling populer karena lembut, lentur, memiliki tekstur alami, dan rumbai ujungnya mudah disisir rapi."
      },
      {
        nama: "Tali Kur (Polyester Cord)",
        keterangan: "Kuat, licin, tidak mudah putus, tahan air, dan tersedia dalam aneka warna cerah ceria."
      },
      {
        nama: "Tali Rami / Goni (Jute Twine)",
        keterangan: "Memberikan kesan klasik, rustic, dan alami, namun memiliki tekstur sedikit kaku dan berserat."
      },
      {
        nama: "Kayu Rentangan (Dowel Wood) / Ring Logam",
        keterangan: "Media tempat mengaitkan tali awal karya makrame sebagai poros pegangan gantungan."
      },
      {
        nama: "Gunting Tajam & Pita Ukur (Meteran)",
        keterangan: "Untuk memotong panjang tali secara presisi dan merapikan ujung rumbai (fringe)."
      },
      {
        nama: "Papan Kerja & Selotip / Jarum Pentul",
        keterangan: "Membantu menahan posisi tali agar tidak bergeser saat membuat simpul yang rumit."
      }
    ]
  },

  enamSimpulUtama: [
    {
      id: "simpul-kepala",
      nama: "Simpul Kepala",
      namaInternasional: "Lark's Head Knot / Cow Hitch",
      fungsi: "Sebagai simpul awal (pangkal) untuk memasang dan mengaitkan helai tali pada kayu rentangan, tongkat, atau cincin gantungan.",
      karakteristik: "Membentuk lingkaran jerat yang rapi di sekeliling kayu, menjuntaikan dua ujung tali sama panjang ke bawah.",
      langkahPembuatan: [
        "Lipat tali menjadi dua bagian sama panjang sehingga terbentuk lengkungan jerat di atas.",
        "Letakkan lengkungan jerat di belakang kayu rentangan (atau masukkan dari atas ke bawah).",
        "Tarik kedua ujung tali ke depan dan masukkan ke dalam rongga lengkungan jerat.",
        "Tarik kedua ujung tali ke bawah secara perlahan hingga simpul mengunci dengan kencang dan rapi pada kayu."
      ],
      contohAplikasi: "Langkah pertama wajib pada pembuatan hiasan dinding makrame, gantungan kunci, dan gantungan pot bunga."
    },
    {
      id: "simpul-rantai",
      nama: "Simpul Rantai",
      namaInternasional: "Chain Knot / Chain Stitch",
      fungsi: "Membentuk jalinan yang menyerupai mata rantai bertingkat, berfungsi memperpendek tali secara dekoratif atau membuat tali pegangan yang kuat.",
      karakteristik: "Teksturnya bergelombang saling mengait berulang-ulang, lentur namun kokoh, serta memiliki estetika dinamis.",
      langkahPembuatan: [
        "Buat satu simpul hidup atau jerat awal pada tali.",
        "Ambil bagian tali bebas, lalu dorong lengkungan tali baru melewati lubang jerat sebelumnya.",
        "Kencangkan jerat sebelumnya dan biarkan lubang lengkungan baru terbuka.",
        "Ulangi proses memasukkan lengkungan tali berikutnya secara berkesinambungan hingga mencapai panjang yang diinginkan."
      ],
      contohAplikasi: "Tali gantungan tas makrame, pembatas gantungan pot, dan gelang tangan kasual."
    },
    {
      id: "simpul-mati",
      nama: "Simpul Mati",
      namaInternasional: "Square Knot / Reef Knot",
      fungsi: "Menyambungkan dua ujung tali yang memiliki ukuran ketebalan sama agar terikat sangat kuat dan tidak mudah terlepas.",
      karakteristik: "Simpul terkunci saling menekan datar, jika ditarik beban akan semakin menguat, namun tetap dapat dilepas dengan cara mendorong ujungnya.",
      langkahPembuatan: [
        "Pegang ujung tali kanan di tangan kanan dan ujung tali kiri di tangan kiri.",
        "Silangkan tali kanan di atas tali kiri, lalu putar dan masukkan ke bawah (ikatan pertama).",
        "Selanjutnya silangkan tali kiri di atas tali kanan, lalu putar dan masukkan ke bawah (ikatan kedua).",
        "Tarik keempat arah tali bersamaan hingga simpul mengunci rata dan pipih di tengah."
      ],
      contohAplikasi: "Menyambung tali yang putus saat proses menganyam, mengikat ujung akhir karya jaring/tandu, dan tali pengikat kado."
    },
    {
      id: "simpul-tunggal",
      nama: "Simpul Tunggal (Simpul Spiral)",
      namaInternasional: "Half Knot / Spiral Stitch",
      fungsi: "Menciptakan motif pilinan atau ulir berputar (spiral) yang sangat indah pada karya makrame.",
      karakteristik: "Jika dibuat terus-menerus dengan arah yang sama (misal selalu dari tali kiri ke kanan), rangkaian tali akan memutar sendiri membentuk spiral alami 360 derajat.",
      langkahPembuatan: [
        "Gunakan empat helai tali: dua tali di tengah sebagai tali pasif (inti), dua tali di samping sebagai tali aktif pengerja.",
        "Ambil tali kiri terluar, tekuk di atas dua tali tengah membentuk angka 4.",
        "Bawa tali kanan terluar melewati atas tali kiri, lalu selipkan ke belakang dua tali tengah dan keluarkan dari lubang lingkaran kiri.",
        "Tarik kedua tali samping secara merata. Ulangi gerakan persis yang sama berkali-kali dari sisi kiri terus-menerus."
      ],
      contohAplikasi: "Gagang gantungan pot tanaman hias, batang hiasan dinding, dan gelang tali ulir."
    },
    {
      id: "simpul-ganda",
      nama: "Simpul Ganda (Simpul Pipih / Datar)",
      namaInternasional: "Square Knot / Flat Knot",
      fungsi: "Membentuk jalinan lurus yang pipih, datar, lebar, dan sangat rapi sebagai fondasi utama pola anyaman makrame.",
      karakteristik: "Tersusun dari dua simpul tunggal berlawanan arah (kiri lalu kanan, atau sebaliknya), sehingga jalinan tali tidak memutar melainkan tetap lurus sejajar.",
      langkahPembuatan: [
        "Langkah 1 (Sisi Kiri): Tekuk tali kiri di atas dua tali tengah (membentuk angka 4), lalu tali kanan masuk lewat belakang tali tengah dan keluar lewat rongga kiri. Tarik kencang.",
        "Langkah 2 (Sisi Kanan): Tekuk tali kanan di atas dua tali tengah (membentuk huruf D terbalik), lalu tali kiri masuk lewat belakang tali tengah dan keluar lewat rongga kanan. Tarik kencang.",
        "Perpaduan langkah kiri dan kanan ini menghasilkan satu simpul ganda sempurna yang pipih dan rata."
      ],
      contohAplikasi: "Anyaman badan tas jaring, panel utama hiasan dinding, tatakan gelas (coaster), dan sabuk tali."
    },
    {
      id: "simpul-gorden",
      nama: "Simpul Gorden (Simpul Tirai)",
      namaInternasional: "Horizontal / Diagonal Clove Hitch / Cavandoli",
      fungsi: "Membentuk garis-garis tegas berjejer rapat mendatar (horizontal) atau miring (diagonal) menyerupai barisan tirai atau gorden jendela.",
      karakteristik: "Menciptakan motif relief yang rapat, padat, dan kokoh untuk membuat variasi pola geometris (garis lurus, zigzag, atau belah ketupat/wajik).",
      langkahPembuatan: [
        "Pilih satu tali penuntun (guide cord) dan bentangkan mendatar atau menyilang.",
        "Ambil satu tali kerja di sebelahnya, lilitkan mengelilingi tali penuntun dari bawah ke atas.",
        "Lilitkan tali kerja sekali lagi mengelilingi tali penuntun, lalu kunci ujungnya ke dalam lingkaran lilitan (dua lilitan per helai tali).",
        "Rapatkan simpul ke samping dan lanjutkan dengan tali kerja berikutnya di sepanjang tali penuntun."
      ],
      contohAplikasi: "Pola pembatas pada hiasan dinding, tepian taplak meja, dan motif tirai pintu pembatas ruangan."
    }
  ],

  tahapanBerkarya: [
    "Tahap 1 - Perencanaan & Desain: Menentukan jenis karya (gantungan kunci/pot/hiasan dinding), memilih jenis tali yang sesuai, dan mengukur panjang tali (biasanya 4 hingga 6 kali panjang karya jadi).",
    "Tahap 2 - Penyiapan Bahan: Memotong tali sama panjang dan menyiapkan kayu rentangan atau ring gantungan.",
    "Tahap 3 - Pemasangan Awal: Mengikatkan semua tali pada kayu rentangan menggunakan Simpul Kepala.",
    "Tahap 4 - Proses Menganyam / Membuat Pola: Memadukan simpul ganda, simpul tunggal, simpul rantai, atau simpul gorden sesuai desain rancangan.",
    "Tahap 5 - Penyelesaian Akhir (Finishing): Mengunci simpul terbawah dengan simpul mati, memotong sisa tali agar rata, dan menyisir ujung tali untuk membentuk rumbai (fringe) yang indah dan rapi."
  ],

  tipsKeselamatanDanKerapian: [
    "Jaga tarikan tali agar memiliki kekuatan yang stabil dan sama kuat (tidak terlalu kendor dan tidak terlalu kencang).",
    "Gunakan gunting yang tajam saat memotong tali katun agar serat ujungnya tidak berserabut acak.",
    "Gunakan selotip atau selotip kertas pada ujung tali kur yang mudah terurai sebelum mulai merajut.",
    "Bekerjalah dengan posisi duduk yang ergonomis dan pencahayaan yang cukup agar mata tidak lelah."
  ]
};
