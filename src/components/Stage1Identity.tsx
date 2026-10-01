import React, { useState } from 'react';
import { CONFIG } from '../config';
import { StudentIdentity } from '../types';
import { downloadMateriPembelajaranPDF } from '../utils/pdfGenerator';
import {
  User,
  Hash,
  ArrowRight,
  School,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  FileText,
  Sparkles,
  Download,
  Palette,
  Layers,
} from 'lucide-react';

interface Stage1IdentityProps {
  onStartExam: (identity: StudentIdentity) => void;
  initialIdentity?: StudentIdentity;
  onOpenMateri: () => void;
}

export const Stage1Identity: React.FC<Stage1IdentityProps> = ({
  onStartExam,
  initialIdentity,
  onOpenMateri,
}) => {
  const [nama, setNama] = useState(initialIdentity?.nama || '');
  const [noAbsen, setNoAbsen] = useState(initialIdentity?.noAbsen || '');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi data wajib diisi
    if (!nama.trim()) {
      setErrorMessage('Silakan isi Nama Lengkap terlebih dahulu.');
      return;
    }
    if (!noAbsen.trim()) {
      setErrorMessage('Silakan isi Nomor Absen.');
      return;
    }

    setErrorMessage('');
    onStartExam({
      nama: nama.trim(),
      noAbsen: noAbsen.trim(),
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      {/* Header Pengumuman Tes */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-3 border border-blue-200">
          <School className="w-4 h-4 text-blue-700" />
          <span>{CONFIG.SEKOLAH}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Tes Sumatif {CONFIG.MATA_PELAJARAN}
        </h2>
        <p className="mt-2 text-sm text-slate-600 max-w-2xl mx-auto">
          Materi Pokok: <span className="font-bold text-blue-900">{CONFIG.MATERI}</span> • Subtema: <span className="font-semibold text-slate-800">{CONFIG.SUB_MATERI}</span> • Kelas <span className="font-semibold text-slate-800">{CONFIG.KELAS}</span> • Standar KKTP: <span className="font-bold text-blue-700">{CONFIG.KKTP}</span>.
        </p>
      </div>

      {/* Banner Materi Pembelajaran Sebelum Ujian */}
      <div className="bg-gradient-to-r from-blue-800 via-indigo-800 to-slate-900 rounded-3xl p-5 sm:p-7 text-white shadow-md relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Modul Pembelajaran Siswa</span>
          </div>
          <h3 className="text-lg sm:text-2xl font-black tracking-tight">
            Pelajari Materi: Ikatan &amp; 6 Jenis Simpul Makrame
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
            Kuasai teknik simpul kepala, simpul rantai, simpul mati, simpul tunggal (spiral), simpul ganda (pipih), dan simpul gorden (tirai), serta alat, bahan tali katun, dan tahapan pembuatan karya kriya.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            id="btn-stage1-open-materi"
            type="button"
            onClick={onOpenMateri}
            className="px-4 py-2.5 bg-white text-blue-900 hover:bg-blue-50 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-blue-700" />
            <span>Baca Modul Materi</span>
          </button>
          <button
            id="btn-stage1-download-materi-pdf"
            type="button"
            onClick={() => downloadMateriPembelajaranPDF()}
            className="px-3.5 py-2.5 bg-blue-950/70 hover:bg-blue-950 text-white border border-white/20 font-semibold rounded-xl text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer"
            title="Unduh Modul Materi format PDF"
          >
            <Download className="w-4 h-4" />
            <span>Unduh PDF</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Kolom Kiri: Form Identitas Siswa (TAHAP 1) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Tahap 1: Identitas Siswa
              </h3>
              <p className="text-xs text-slate-500">
                Isi data dengan benar untuk memulai ujian online
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              Formulir Wajib
            </span>
          </div>

          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="font-medium">{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nama Lengkap */}
            <div>
              <label
                htmlFor="input-nama-lengkap"
                className="block text-xs font-bold text-slate-700 mb-1.5"
              >
                Nama Lengkap Siswa <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="input-nama-lengkap"
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Contoh: I Putu Agus Wirawan"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            {/* Nomor Absen */}
            <div>
              <label
                htmlFor="input-no-absen"
                className="block text-xs font-bold text-slate-700 mb-1.5"
              >
                Nomor Absen Siswa <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Hash className="w-4 h-4" />
                </div>
                <input
                  id="input-no-absen"
                  type="number"
                  min="1"
                  max="60"
                  value={noAbsen}
                  onChange={(e) => setNoAbsen(e.target.value)}
                  placeholder="Contoh: 15"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            {/* Sekolah dan Kelas Terpilih */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 block">Sekolah</span>
                <span className="text-xs font-bold text-slate-800">{CONFIG.SEKOLAH}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 block">Mata Pelajaran / Kelas</span>
                <span className="text-xs font-bold text-slate-800">{CONFIG.MATA_PELAJARAN} - Kelas {CONFIG.KELAS}</span>
              </div>
            </div>

            {/* Tombol Mulai Tes */}
            <div className="pt-2">
              <button
                id="btn-mulai-tes"
                type="submit"
                className="w-full py-3.5 px-5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
              >
                <span>Mulai Tes</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Kolom Kanan: Rincian Info Tes & Ketentuan */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card Komposisi Soal & Aturan */}
          <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-400" />
              Komposisi &amp; Format Soal
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <span>1. Pilihan Ganda (PG)</span>
                <span className="font-bold text-blue-300">20 Butir</span>
              </div>
              <div className="flex items-center justify-between bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <span>2. Pilihan Ganda Kompleks (PGK)</span>
                <span className="font-bold text-emerald-300">5 Butir</span>
              </div>
              <div className="flex items-center justify-between bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <span>3. PGK Kategori (Respon Kategori)</span>
                <span className="font-bold text-amber-300">5 Butir</span>
              </div>
              <div className="flex items-center justify-between bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                <span>4. Isian Singkat</span>
                <span className="font-bold text-purple-300">5 Butir</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-slate-300">
                <span>Total Butir Soal:</span>
                <span className="font-extrabold text-white text-sm">35 Soal</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-2">
              <p className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>Pengerjaan mandiri tanpa batasan waktu mundur, kerjakan dengan tenang dan teliti.</span>
              </p>
              <p className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>Soal dan opsi jawaban diacak setiap kali tes dimulai.</span>
              </p>
              <p className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>Seluruh 35 butir soal wajib dijawab sebelum dikirim.</span>
              </p>
              <p className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>Standar Ketercapaian (KKTP): <strong>{CONFIG.KKTP}</strong>.</span>
              </p>
            </div>
          </div>

          {/* Mini Visual Preview Makrame */}
          <div className="rounded-3xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
            <img
              src="/src/assets/images/hero_makrame_simpul_1790824243949.jpg"
              alt="Seni Ikatan dan Simpul Makrame"
              referrerPolicy="no-referrer"
              className="w-full h-36 object-cover"
            />
            <div className="p-3 text-center text-xs font-semibold text-slate-700 bg-slate-50">
              Seni Kriya Makrame: Keindahan Jalinan Ikatan &amp; Simpul
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
