import React, { useState } from 'react';
import { MATERI_SENI_RUPA } from '../data/materiSeniRupa';
import { CONFIG } from '../config';
import { downloadMateriPembelajaranPDF } from '../utils/pdfGenerator';
import {
  X,
  BookOpen,
  Download,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Scissors,
  Layers,
  Wrench,
  ShieldCheck,
  Palette,
  ExternalLink,
} from 'lucide-react';

interface MateriModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartExam?: () => void;
}

export const MateriModal: React.FC<MateriModalProps> = ({
  isOpen,
  onClose,
  onStartExam,
}) => {
  const [activeTab, setActiveTab] = useState<'simpul' | 'pengantar' | 'alat' | 'tahapan' | 'tips'>('simpul');
  const [selectedSimpulIndex, setSelectedSimpulIndex] = useState<number>(0);

  if (!isOpen) return null;

  const currentSimpul = MATERI_SENI_RUPA.enamSimpulUtama[selectedSimpulIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header Modal */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-blue-700 text-white flex items-center justify-center shadow-xs">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md">
                  Modul Pembelajaran Siswa
                </span>
                <span className="text-xs text-slate-500 hidden sm:inline">
                  {CONFIG.SEKOLAH} • Kelas {CONFIG.KELAS}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight mt-0.5">
                {MATERI_SENI_RUPA.judul}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => downloadMateriPembelajaranPDF()}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors cursor-pointer shadow-2xs"
              title="Unduh Modul Ringkasan Materi dalam bentuk PDF"
            >
              <Download className="w-4 h-4 text-blue-600" />
              <span className="hidden sm:inline">Unduh PDF</span>
            </button>
            <button
              id="btn-close-materi-modal"
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigasi Submateri */}
        <div className="flex items-center gap-1 px-5 sm:px-6 py-2.5 bg-slate-100/70 border-b border-slate-200 overflow-x-auto text-xs shrink-0 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('simpul')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'simpul'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>6 Jenis Simpul Utama</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pengantar')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'pengantar'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Konsep Simpul & Ikatan</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('alat')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'alat'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>Alat & Bahan Tali</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tahapan')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'tahapan'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Tahapan Praktik Berkarya</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tips')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'tips'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Tips Kerapian & K3</span>
          </button>
        </div>

        {/* Konten Tab Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* TAB 1: 6 JENIS SIMPUL UTAMA */}
          {activeTab === 'simpul' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-extrabold text-slate-900 tracking-tight">
                  6 Jenis Simpul Utama dalam Seni Makrame Kelas VI
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Pilihlah salah satu jenis simpul di bawah untuk melihat rincian karakteristik, fungsi praktis, serta langkah-langkah pembuatannya secara berurutan.
                </p>
              </div>

              {/* Grid Tombol Pilihan 6 Simpul */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
                {MATERI_SENI_RUPA.enamSimpulUtama.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedSimpulIndex(idx)}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                      selectedSimpulIndex === idx
                        ? 'bg-blue-50 border-blue-500 shadow-xs ring-2 ring-blue-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-[10px] font-bold text-blue-700 block uppercase">
                      Simpul #{idx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-900 block leading-tight mt-0.5">
                      {item.nama}
                    </span>
                  </button>
                ))}
              </div>

              {/* Kartu Detail Simpul Terpilih */}
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                      {currentSimpul.namaInternasional}
                    </span>
                    <h5 className="text-xl font-black text-slate-900 mt-0.5">
                      {currentSimpul.nama}
                    </h5>
                  </div>
                  <span className="self-start sm:self-center px-3 py-1 bg-white text-slate-700 rounded-full text-xs font-semibold border border-slate-300">
                    Seni Rupa Kelas VI
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
                    <span className="text-xs font-bold text-blue-900 block uppercase">
                      Fungsi Utama:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {currentSimpul.fungsi}
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
                    <span className="text-xs font-bold text-emerald-900 block uppercase">
                      Karakteristik &amp; Ciri Visual:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {currentSimpul.karakteristik}
                    </p>
                  </div>
                </div>

                {/* Langkah-langkah Pembuatan */}
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                    Langkah-Langkah Pembuatan Berurutan:
                  </span>
                  <div className="space-y-2">
                    {currentSimpul.langkahPembuatan.map((step, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800"
                      >
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center shrink-0 text-xs">
                          {sIdx + 1}
                        </span>
                        <p className="leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contoh Aplikasi Nyata */}
                <div className="p-4 bg-blue-100/60 rounded-2xl border border-blue-200 text-xs sm:text-sm text-blue-900 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Contoh Aplikasi Nyata:</span>{' '}
                    <span>{currentSimpul.contohAplikasi}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PENGANTAR KONSEP */}
          {activeTab === 'pengantar' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1 space-y-3">
                  <h4 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    Memahami Perbedaan Simpul dan Ikatan
                  </h4>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs sm:text-sm text-slate-700">
                    <div className="space-y-1">
                      <span className="font-bold text-blue-800 block">1. Simpul (Knot)</span>
                      <p>Jalinan yang menghubungkan helai tali dengan tali lainnya, atau ikal pada tali itu sendiri untuk membentuk pola atau ikatan pengunci tertentu.</p>
                    </div>
                    <div className="space-y-1 pt-2 border-t border-slate-200">
                      <span className="font-bold text-emerald-800 block">2. Ikatan (Hitch / Lashing)</span>
                      <p>Hubungan antara tali dengan media benda lain, seperti kayu rentangan (dowel), ring besi/cincin gantung, atau tiang penahan.</p>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-72 shrink-0 rounded-2xl overflow-hidden border border-slate-200 shadow-xs relative">
                  <img
                    src="/src/assets/images/hero_makrame_simpul_1790824243949.jpg"
                    alt="Karya Seni Makrame Ikatan dan Simpul"
                    referrerPolicy="no-referrer"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-2.5 bg-slate-900 text-white text-[11px] text-center">
                    Karya Makrame: Jalinan Simpul Estetis
                  </div>
                </div>
              </div>

              {/* Seni Makrame */}
              <div className="p-5 bg-blue-50/60 rounded-3xl border border-blue-200 space-y-3">
                <h5 className="text-base font-bold text-blue-950">
                  Mengenal Seni Makrame (Macramé)
                </h5>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Istilah <em>Makrame</em> diserap dari bahasa Arab yaitu <strong>Migramah</strong>, yang bermakna hiasan rumbai-rumbai atau pinggiran anyaman berumbai. Seni makrame merupakan keterampilan kerajinan tangan menyimpul untaian tali secara manual (tangan kosong) tanpa memakai jarum rajut atau mesin tenun.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-blue-100">
                    <span className="font-bold text-blue-900 block mb-0.5">Fungsi Praktis (Pakai)</span>
                    <p className="text-slate-600">Gantungan pot bunga, gantungan kunci, tas jaring belanja, sabuk, dan gelang tangan.</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-blue-100">
                    <span className="font-bold text-blue-900 block mb-0.5">Fungsi Estetis (Hias)</span>
                    <p className="text-slate-600">Hiasan dinding kelas/kamar (wall hanging), tirai pintu, taplak meja, dan kap lampu hias.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ALAT & BAHAN */}
          {activeTab === 'alat' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1 space-y-2">
                  <h4 className="text-lg font-extrabold text-slate-900">
                    Alat dan Bahan dalam Seni Simpul Makrame
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Kualitas karya simpul sangat dipengaruhi oleh kecocokan bahan tali dan ketepatan peralatan yang digunakan oleh siswa.
                  </p>
                </div>
                <div className="w-full md:w-64 shrink-0 rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
                  <img
                    src="/src/assets/images/craft_tali_macrame_1790824255337.jpg"
                    alt="Alat dan Bahan Tali Makrame"
                    referrerPolicy="no-referrer"
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-2 bg-slate-900 text-white text-[10px] text-center">
                    Bahan Tali Katun &amp; Perlengkapan
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {MATERI_SENI_RUPA.pengantar.alatDanBahan.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-colors shadow-2xs space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs">
                        {idx + 1}
                      </span>
                      <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                        {item.nama}
                      </h5>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.keterangan}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TAHAPAN BERKARYA */}
          {activeTab === 'tahapan' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-lg font-extrabold text-slate-900">
                  5 Tahapan Baku Membuat Karya Seni Makrame
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Ikuti alur kerja terstruktur dari perancangan hingga penyelesaian rumbai akhir (finishing).
                </p>
              </div>

              <div className="space-y-3">
                {MATERI_SENI_RUPA.tahapanBerkarya.map((tahap, idx) => {
                  const [title, desc] = tahap.split(': ');
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-start gap-3.5"
                    >
                      <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center shrink-0 text-sm">
                        {idx + 1}
                      </div>
                      <div className="space-y-1">
                        <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                          {title}
                        </h5>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: TIPS KERAPIAN & K3 */}
          {activeTab === 'tips' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-lg font-extrabold text-slate-900">
                  Tips Kerapian &amp; Keselamatan Kerja (K3)
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Panduan menghasilkan karya seni kriya yang rapi, simetris, dan aman saat berpraktik di sekolah.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MATERI_SENI_RUPA.tipsKeselamatanDanKerapian.map((tip, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs sm:text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-slate-700 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs sm:text-sm text-amber-900">
                <span className="font-bold block mb-1">Pedoman Kelulusan Sumatif:</span>
                Kriteria Ketercapaian Tujuan Pembelajaran (KKTP) untuk Tes Sumatif Seni Rupa Kelas VI ini adalah nilai <strong>{CONFIG.KKTP}</strong>. Pastikan Anda membaca setiap materi dengan teliti sebelum memulai ujian online.
              </div>
            </div>
          )}
        </div>

        {/* Footer Modal */}
        <div className="px-5 py-4 sm:px-6 sm:py-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Standar KKTP: <strong className="text-blue-700">{CONFIG.KKTP}</strong></span>
            <span>·</span>
            <span>Total Butir Soal: <strong>35 Soal</strong></span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Tutup
            </button>
            {onStartExam && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onStartExam();
                }}
                className="flex-1 sm:flex-initial px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Mulai Kerjakan Tes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
