import { jsPDF } from 'jspdf';
import { CONFIG } from '../config';
import { ExamResult, Question } from '../types';

/**
 * Format tanggal dalam bahasa Indonesia
 */
export function formatIndonesianDate(dateStr?: string): string {
  const d = dateStr ? new Date(dateStr) : new Date();
  if (isNaN(d.getTime())) {
    return new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * 1. Download Lembar Laporan Hasil Tes Siswa (PDF)
 * Dilengkapi Kop Surat Sekolah Resmi, Rincian Nilai, dan Kolom Tanda Tangan Guru & Orang Tua
 */
export function downloadStudentResultPDF(result: ExamResult): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 18;

  // --- KOP SURAT SEKOLAH RESMI ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('PEMERINTAH KABUPATEN JEMBRANA', pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.text('DINAS PENDIDIKAN KEPEMUDAAN DAN OLAHRAGA', pageWidth / 2, y, { align: 'center' });
  y += 6;
  doc.setFontSize(14);
  doc.text(CONFIG.SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(CONFIG.ALAMAT_SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 3;

  // Garis Pembatas Kop Ganda
  doc.setLineWidth(0.8);
  doc.line(15, y, pageWidth - 15, y);
  doc.setLineWidth(0.2);
  doc.line(15, y + 0.8, pageWidth - 15, y + 0.8);
  y += 8;

  // --- JUDUL DOKUMEN ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('LEMBAR LAPORAN HASIL TES SUMATIF', pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Tahun Ajaran 2025/2026', pageWidth / 2, y, { align: 'center' });
  y += 9;

  // --- DATA IDENTITAS SISWA ---
  doc.setDrawColor(200, 200, 200);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, y, pageWidth - 30, 36, 2, 2, 'FD');

  doc.setFontSize(10);
  const leftX = 20;
  const col2X = 58;
  const rightX = 115;
  const col4X = 150;

  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Nama Peserta', leftX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${result.nama}`, col2X, y);

  doc.setFont('helvetica', 'bold');
  doc.text('Mata Pelajaran', rightX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${CONFIG.MATA_PELAJARAN}`, col4X, y);

  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Nomor Absen', leftX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${result.noAbsen}`, col2X, y);

  doc.setFont('helvetica', 'bold');
  doc.text('Materi / Pokok', rightX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${CONFIG.MATERI}`, col4X, y);

  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Kelas', leftX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: Kelas ${result.kelas || CONFIG.KELAS} SD`, col2X, y);

  doc.setFont('helvetica', 'bold');
  doc.text('Standar KKTP', rightX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${CONFIG.KKTP} (Skala 0–100)`, col4X, y);

  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Waktu Tes', leftX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${result.timestamp}`, col2X, y);

  y += 12;

  // --- TABEL RINCIAN HASIL TES ---
  doc.setFillColor(30, 58, 138); // Dark Navy Blue
  doc.rect(15, y, pageWidth - 30, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('KOMPONEN PENILAIAN HASIL UJIAN', pageWidth / 2, y + 5.5, { align: 'center' });
  doc.setTextColor(0, 0, 0);
  y += 8;

  const rowHeight = 7.5;
  const isPassed = result.status === 'Lulus' || result.nilai >= CONFIG.KKTP;

  const rows = [
    { label: 'Jumlah Butir Soal', value: '35 Soal (20 PG, 5 PGK, 5 PGK Kategori, 5 Isian)' },
    { label: 'Jumlah Jawaban Benar', value: `${result.benar} Soal` },
    { label: 'Jumlah Jawaban Salah', value: `${result.salah} Soal` },
    { label: 'Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)', value: `${CONFIG.KKTP}` },
    { label: 'NILAI AKHIR (Skala 0 - 100)', value: `${result.nilai}` },
    {
      label: 'STATUS KELULUSAN',
      value: isPassed ? 'LULUS (Mencapai Standar KKTP)' : 'BELUM LULUS (Perlu Remedial)',
    },
  ];

  rows.forEach((r, idx) => {
    if (idx % 2 === 0) {
      doc.setFillColor(255, 255, 255);
    } else {
      doc.setFillColor(245, 247, 250);
    }
    doc.rect(15, y, pageWidth - 30, rowHeight, 'FD');

    doc.setFont('helvetica', idx >= 4 ? 'bold' : 'normal');
    doc.setFontSize(idx >= 4 ? 10.5 : 9.5);

    if (idx === 4) {
      doc.setTextColor(isPassed ? 16 : 180, isPassed ? 120 : 50, isPassed ? 50 : 20);
    } else if (idx === 5) {
      doc.setTextColor(isPassed ? 16 : 200, isPassed ? 140 : 30, isPassed ? 50 : 30);
    } else {
      doc.setTextColor(0, 0, 0);
    }

    doc.text(r.label, 20, y + 5.2);
    doc.text(r.value, 120, y + 5.2);
    doc.setTextColor(0, 0, 0);
    y += rowHeight;
  });

  y += 7;

  // Catatan Guru / Evaluasi Singkat
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 80, 80);
  const noteText = isPassed
    ? `Catatan: Selamat atas pencapaian kompetensi Seni Rupa materi Ikatan dan Simpul (Seni Makrame). Terus kembangkan daya cipta, ketelitian teknik simpul, dan kreativitas berkarya!`
    : `Catatan: Peserta didik belum mencapai standar KKTP (${CONFIG.KKTP}) pada materi Ikatan dan Simpul. Dianjurkan membaca kembali modul macam-macam simpul dan mengikuti bimbingan remedial.`;
  const splitNote = doc.splitTextToSize(noteText, pageWidth - 30);
  doc.text(splitNote, 15, y);
  doc.setTextColor(0, 0, 0);
  y += splitNote.length * 4 + 10;

  // --- TANDA TANGAN (KOLOM GURU & ORANG TUA) ---
  const signDateStr = `${CONFIG.KOTA}, ${formatIndonesianDate()}`;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);

  const leftSignX = 40;
  const rightSignX = pageWidth - 45;

  doc.text('Mengetahui,', leftSignX, y, { align: 'center' });
  doc.text(signDateStr, rightSignX, y, { align: 'center' });
  y += 5;
  doc.text('Orang Tua / Wali Murid', leftSignX, y, { align: 'center' });
  doc.text(`Guru Kelas ${CONFIG.KELAS}`, rightSignX, y, { align: 'center' });

  y += 22; // Tempat tanda tangan
  doc.setFont('helvetica', 'bold');
  doc.text('( ................................................ )', leftSignX, y, { align: 'center' });
  doc.text(CONFIG.GURU, rightSignX, y, { align: 'center' });
  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(`${CONFIG.LABEL_NIP_GURU}. ${CONFIG.NIP_GURU}`, rightSignX, y, { align: 'center' });

  // Unduh dokumen PDF
  const cleanName = result.nama.replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`Hasil_Tes_Seni_Rupa_${cleanName}_Absen_${result.noAbsen}.pdf`);
}

/**
 * 2. Download Seluruh Naskah Soal Ujian dalam format PDF
 */
export function downloadExamQuestionsPDF(questions: Question[]): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 16;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 16) {
      doc.addPage();
      y = 16;
    }
  };

  // --- KOP NASKAH SOAL ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('PEMERINTAH KABUPATEN JEMBRANA', pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.text('DINAS PENDIDIKAN KEPEMUDAAN DAN OLAHRAGA', pageWidth / 2, y, { align: 'center' });
  y += 5.5;
  doc.setFontSize(13);
  doc.text(CONFIG.SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(CONFIG.ALAMAT_SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 3;

  doc.setLineWidth(0.7);
  doc.line(15, y, pageWidth - 15, y);
  doc.setLineWidth(0.2);
  doc.line(15, y + 0.7, pageWidth - 15, y + 0.7);
  y += 7;

  // Judul Naskah
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(`NASKAH SOAL TES SUMATIF KELAS ${CONFIG.KELAS}`, pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `Mata Pelajaran: ${CONFIG.MATA_PELAJARAN} | Materi: ${CONFIG.MATERI}`,
    pageWidth / 2,
    y,
    { align: 'center' }
  );
  y += 7;

  // Box Identitas Siswa
  doc.setDrawColor(200, 200, 200);
  doc.setFillColor(252, 252, 252);
  doc.rect(15, y, pageWidth - 30, 16, 'FD');
  doc.setFontSize(9);
  doc.text('Nama Siswa  : ..............................................................', 18, y + 6);
  doc.text('Nomor Absen : ................', 18, y + 12);
  doc.text(`Kelas / Semester : ${CONFIG.KELAS} / Genap`, pageWidth / 2 + 10, y + 6);
  doc.text(`Standar KKTP    : ${CONFIG.KKTP}`, pageWidth / 2 + 10, y + 12);
  y += 20;

  // Petunjuk Umum
  doc.setFillColor(245, 247, 250);
  doc.rect(15, y, pageWidth - 30, 11, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.text('PETUNJUK UMUM:', 18, y + 4);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(
    '1. Berdoalah sebelum mengerjakan. 2. Tulislah nama & no absen. 3. Jawablah seluruh butir soal dengan teliti dan jujur.',
    18,
    y + 8,
    { maxWidth: pageWidth - 36 }
  );
  y += 16;

  // Iterasi Soal
  questions.forEach((q, idx) => {
    checkPageBreak(25);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);

    let typeLabel = 'Pilihan Ganda';
    if (q.type === 'pgk') typeLabel = 'Pilihan Ganda Kompleks (Bisa >1 jawaban benar)';
    if (q.type === 'pgk_kategori') typeLabel = 'PGK Kategori (Respon Kategori)';
    if (q.type === 'isian') typeLabel = 'Isian Singkat';

    doc.setTextColor(30, 58, 138);
    doc.text(`Soal No. ${idx + 1} [${typeLabel}] - ${q.topic}`, 15, y);
    doc.setTextColor(0, 0, 0);
    y += 5;

    // Teks Soal
    doc.setFont('helvetica', 'normal');
    const textLines = doc.splitTextToSize(q.text, pageWidth - 32);
    checkPageBreak(textLines.length * 4.5 + 15);
    doc.text(textLines, 16, y);
    y += textLines.length * 4.5 + 2;

    // Opsi Jawaban PG & PGK
    if ((q.type === 'pg' || q.type === 'pgk') && q.options && q.options.length > 0) {
      q.options.forEach((opt) => {
        checkPageBreak(8);
        const optLines = doc.splitTextToSize(`[   ]  ${opt.id}. ${opt.text}`, pageWidth - 36);
        doc.text(optLines, 20, y);
        y += optLines.length * 4.2 + 1;
      });
      y += 3;
    }

    // Pernyataan Kategori
    if (q.type === 'pgk_kategori' && q.statements && q.statements.length > 0) {
      const posLabel =
        q.categoryType === 'setuju_tidak_setuju'
          ? 'Setuju'
          : q.categoryType === 'sesuai_tidak_sesuai'
          ? 'Sesuai'
          : 'Benar';
      const negLabel =
        q.categoryType === 'setuju_tidak_setuju'
          ? 'Tidak Setuju'
          : q.categoryType === 'sesuai_tidak_sesuai'
          ? 'Tidak Sesuai'
          : 'Salah';

      q.statements.forEach((st, sIdx) => {
        checkPageBreak(8);
        const stLines = doc.splitTextToSize(
          `(${sIdx + 1}) ${st.text}  [  ] ${posLabel}   [  ] ${negLabel}`,
          pageWidth - 36
        );
        doc.text(stLines, 20, y);
        y += stLines.length * 4.2 + 1;
      });
      y += 3;
    }

    // Isian Singkat
    if (q.type === 'isian') {
      checkPageBreak(10);
      doc.text('Jawaban: .....................................................................................', 20, y + 2);
      y += 8;
    }

    y += 4;
  });

  doc.save(`Naskah_Soal_Tes_Sumatif_Seni_Rupa_Kelas_${CONFIG.KELAS}.pdf`);
}

/**
 * 3. Export Hasil Tes Siswa ke format CSV (Dapat dibuka langsung di Excel / Spreadsheet)
 */
export function exportResultsToCSV(results: ExamResult[]): void {
  const headers = [
    'Timestamp',
    'Nama Siswa',
    'Kelas',
    'Nomor Absen',
    'Benar',
    'Salah',
    'Nilai Akhir',
    'Status Kelulusan',
    'Mata Pelajaran',
    'Materi',
    'Sekolah',
  ];

  const rows = results.map((r) => [
    `"${r.timestamp}"`,
    `"${r.nama}"`,
    `"${r.kelas || CONFIG.KELAS}"`,
    `"${r.noAbsen}"`,
    r.benar,
    r.salah,
    r.nilai,
    `"${r.status || (r.nilai >= CONFIG.KKTP ? 'Lulus' : 'Belum Lulus')}"`,
    `"${CONFIG.MATA_PELAJARAN}"`,
    `"${CONFIG.MATERI}"`,
    `"${CONFIG.SEKOLAH}"`,
  ]);

  const csvContent =
    'data:text/csv;charset=utf-8,\uFEFF' +
    [headers.join(','), ...rows.map((row) => row.join(','))].join('\r\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute(
    'download',
    `Rekap_Nilai_Seni_Rupa_Kelas_${CONFIG.KELAS}_${Date.now()}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * 4. Download Rekap Seluruh Nilai Siswa untuk Guru (PDF Landscape)
 */
export function downloadResultsRecapPDF(results: ExamResult[]): void {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 14;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 14) {
      doc.addPage();
      y = 14;
    }
  };

  // Header Kop
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('PEMERINTAH KABUPATEN JEMBRANA - DINAS PENDIDIKAN KEPEMUDAAN DAN OLAHRAGA', pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.setFontSize(13);
  doc.text(CONFIG.SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(
    `REKAPITULASI NILAI TES SUMATIF SENI RUPA KELAS ${CONFIG.KELAS} (KKTP: ${CONFIG.KKTP})`,
    pageWidth / 2,
    y,
    { align: 'center' }
  );
  y += 3;

  doc.setLineWidth(0.6);
  doc.line(15, y, pageWidth - 15, y);
  y += 6;

  // Header Tabel
  doc.setFillColor(30, 58, 138);
  doc.rect(15, y, pageWidth - 30, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);

  const cols = [
    { label: 'No', x: 18 },
    { label: 'Waktu Pengerjaan', x: 30 },
    { label: 'Nama Lengkap Siswa', x: 75 },
    { label: 'Absen', x: 145 },
    { label: 'Kelas', x: 165 },
    { label: 'Benar', x: 185 },
    { label: 'Salah', x: 205 },
    { label: 'Nilai', x: 225 },
    { label: 'Keterangan', x: 250 },
  ];

  cols.forEach((col) => {
    doc.text(col.label, col.x, y + 5.5);
  });
  doc.setTextColor(0, 0, 0);
  y += 8;

  // Baris Siswa
  doc.setFontSize(8.5);
  results.forEach((r, idx) => {
    checkPageBreak(7.5);
    if (idx % 2 === 0) {
      doc.setFillColor(248, 250, 252);
    } else {
      doc.setFillColor(255, 255, 255);
    }
    doc.rect(15, y, pageWidth - 30, 7, 'FD');

    doc.setFont('helvetica', 'normal');
    doc.text(String(idx + 1), 18, y + 4.8);
    doc.text(r.timestamp.substring(0, 19), 30, y + 4.8);

    const truncatedName = r.nama.length > 30 ? r.nama.substring(0, 28) + '...' : r.nama;
    doc.text(truncatedName, 75, y + 4.8);

    doc.text(r.noAbsen, 145, y + 4.8);
    doc.text(r.kelas || CONFIG.KELAS, 165, y + 4.8);
    doc.text(String(r.benar), 185, y + 4.8);
    doc.text(String(r.salah), 205, y + 4.8);

    doc.setFont('helvetica', 'bold');
    doc.text(String(r.nilai), 225, y + 4.8);

    if (r.status === 'Lulus' || r.nilai >= CONFIG.KKTP) {
      doc.setTextColor(16, 185, 129);
      doc.text('LULUS', 250, y + 4.8);
    } else {
      doc.setTextColor(239, 68, 68);
      doc.text('BELUM LULUS', 250, y + 4.8);
    }
    doc.setTextColor(0, 0, 0);

    y += 7;
  });

  doc.save(`Rekap_Nilai_Tes_Seni_Rupa_Kelas_${CONFIG.KELAS}.pdf`);
}

/**
 * 5. Download Modul & Ringkasan Materi Pembelajaran Seni Rupa: Ikatan dan Simpul (PDF)
 */
export function downloadMateriPembelajaranPDF(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 16;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 18) {
      doc.addPage();
      y = 16;
    }
  };

  // --- KOP RESMI SEKOLAH ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('PEMERINTAH KABUPATEN JEMBRANA', pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.text('DINAS PENDIDIKAN KEPEMUDAAN DAN OLAHRAGA', pageWidth / 2, y, { align: 'center' });
  y += 5.5;
  doc.setFontSize(13);
  doc.text(CONFIG.SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(CONFIG.ALAMAT_SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 3;

  doc.setLineWidth(0.7);
  doc.line(15, y, pageWidth - 15, y);
  doc.setLineWidth(0.2);
  doc.line(15, y + 0.7, pageWidth - 15, y + 0.7);
  y += 7;

  // Judul Modul
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('RINGKASAN MATERI PEMBELAJARAN SENI RUPA KELAS VI', pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.setFontSize(10);
  doc.setTextColor(30, 58, 138);
  doc.text('TEMA: IKATAN DAN SIMPUL (SENI KERAJINAN MAKRAME)', pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.setFontSize(9);
  doc.text(`SUBTEMA: SIMPUL KEPALA, RANTAI, MATI, TUNGGAL, GANDA, DAN GORDEN • KELAS ${CONFIG.KELAS}`, pageWidth / 2, y, { align: 'center' });
  doc.setTextColor(0, 0, 0);
  y += 7;

  // Kotak Pengantar
  doc.setDrawColor(200, 200, 200);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, y, pageWidth - 30, 19, 2, 2, 'FD');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  const introLines = doc.splitTextToSize(
    'Seni Makrame adalah kerajinan tangan menyimpul untaian benang/tali tanpa jarum rajut atau mesin tenun. Perbedaan mendasar: Simpul (knot) menghubungkan tali dengan tali lain, sedangkan Ikatan (hitch/lashing) menghubungkan tali dengan benda lain seperti kayu rentangan atau ring gantung.',
    pageWidth - 36
  );
  doc.text(introLines, 18, y + 5);
  y += 24;

  const sections = [
    {
      title: 'A. 6 Jenis Simpul Utama dalam Seni Makrame',
      points: [
        '1. Simpul Kepala (Lark\'s Head Knot): Simpul awal/pangkal untuk memasang tali pada kayu rentangan atau cincin gantung.',
        '2. Simpul Rantai (Chain Knot): Membentuk jalinan bertingkat seperti mata rantai untuk memperpendek tali atau tali pegangan.',
        '3. Simpul Mati (Square Knot / Reef Knot): Menyambung dua tali seukuran agar terkunci kuat dan tidak mudah lepas.',
        '4. Simpul Tunggal (Half Knot): Jika dibuat berulang ke arah yang sama, akan membentuk pilinan spiral 360 derajat yang indah.',
        '5. Simpul Ganda (Flat / Square Knot): Dibuat bolak-balik kiri-kanan secara bergantian sehingga jalinan tetap lurus dan pipih.',
        '6. Simpul Gorden (Clove Hitch / Tirai): Dibuat berjejer rapat melilit tali penuntun sehingga menyerupai tirai jendela.',
      ],
    },
    {
      title: 'B. Alat dan Bahan Pembuatan Karya Makrame',
      points: [
        '- Tali Katun: Lembut, alami, lentur, dan mudah disisir membentuk rumbai (fringe).',
        '- Tali Kur: Kuat, licin, tahan air, dan tersedia dalam warna-warni cerah.',
        '- Tali Rami / Goni: Memberikan kesan alami (rustic) dan berserat kuat.',
        '- Kayu Rentangan (Dowel) & Ring Logam: Poros pegangan awal pemasangan tali.',
        '- Gunting Tajam & Meteran: Untuk memotong presisi dan merapikan rumbai.',
      ],
    },
    {
      title: 'C. 5 Tahapan Baku Praktik Berkarya Makrame',
      points: [
        '1. Perencanaan & Desain: Menentukan karya (gantungan kunci/pot/hiasan dinding) dan memotong tali (4-6x panjang karya).',
        '2. Pemasangan Awal: Mengikatkan semua tali pada kayu rentangan menggunakan Simpul Kepala.',
        '3. Proses Menganyam: Memadukan simpul ganda, tunggal, rantai, atau gorden sesuai pola rancangan.',
        '4. Penguncian Simpul: Mengunci bagian bawah rangkaian tali dengan ikatan simpul mati.',
        '5. Penyelesaian Akhir (Finishing): Memotong ujung tali rata dan menyisirnya menjadi rumbai yang rapi.',
      ],
    },
    {
      title: 'D. Fungsi Karya Makrame dalam Keseharian',
      points: [
        '- Fungsi Pakai (Praktis): Gantungan pot tanaman, gantungan kunci, tas jaring belanja, sabuk tali.',
        '- Fungsi Hias (Estetis): Hiasan dinding ruang tamu/kelas (wall hanging), tirai pintu, taplak meja.',
      ],
    },
  ];

  sections.forEach((sec) => {
    checkPageBreak(18 + sec.points.length * 6);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(30, 58, 138);
    doc.text(sec.title, 15, y);
    doc.setTextColor(0, 0, 0);
    y += 5.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    sec.points.forEach((pt) => {
      const ptLines = doc.splitTextToSize(pt, pageWidth - 36);
      checkPageBreak(ptLines.length * 4.5 + 2);
      doc.text(ptLines, 18, y);
      y += ptLines.length * 4.5 + 1.5;
    });
    y += 3;
  });

  // Tanda Tangan Guru
  checkPageBreak(35);
  y += 4;
  const signDateStr = `${CONFIG.KOTA}, ${formatIndonesianDate()}`;
  const rightSignX = pageWidth - 50;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(signDateStr, rightSignX, y, { align: 'center' });
  y += 4.5;
  doc.text(`Guru Kelas ${CONFIG.KELAS}`, rightSignX, y, { align: 'center' });
  y += 18;
  doc.setFont('helvetica', 'bold');
  doc.text(CONFIG.GURU, rightSignX, y, { align: 'center' });
  y += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`${CONFIG.LABEL_NIP_GURU}. ${CONFIG.NIP_GURU}`, rightSignX, y, { align: 'center' });

  doc.save(
    `Modul_Materi_Seni_Rupa_Ikatan_dan_Simpul_Kelas_${CONFIG.KELAS}_${CONFIG.SEKOLAH.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`
  );
}
