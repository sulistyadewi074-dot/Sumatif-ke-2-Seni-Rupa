import React from 'react';
import { CONFIG } from '../config';
import { AppStage } from '../types';
import { GraduationCap, ShieldCheck, ArrowLeft, BookOpen } from 'lucide-react';

interface NavbarProps {
  currentStage: AppStage;
  onOpenTeacherPanel: () => void;
  onBackToStudentView: () => void;
  onOpenMateri: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStage,
  onOpenTeacherPanel,
  onBackToStudentView,
  onOpenMateri,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Sisi Kiri: Identitas Sekolah & Judul */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-700 flex items-center justify-center text-white shadow-xs">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                  Kelas {CONFIG.KELAS} • {CONFIG.MATA_PELAJARAN}
                </span>
                <span className="hidden sm:inline-block text-xs font-medium text-slate-500">
                  {CONFIG.MATERI}
                </span>
              </div>
              <h1 id="navbar-app-title" className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight">
                {CONFIG.SEKOLAH}
              </h1>
            </div>
          </div>

          {/* Sisi Tengah: Indikator Tahap (Siswa View) */}
          {currentStage !== 4 && (
            <div className="hidden md:flex items-center gap-1 text-xs font-semibold">
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${
                  currentStage === 1
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] bg-black/20">
                  1
                </span>
                <span>Identitas</span>
              </div>
              <span className="text-slate-300">/</span>
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${
                  currentStage === 2
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] bg-black/20">
                  2
                </span>
                <span>Soal Tes</span>
              </div>
              <span className="text-slate-300">/</span>
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${
                  currentStage === 3
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] bg-black/20">
                  3
                </span>
                <span>Hasil Tes</span>
              </div>
            </div>
          )}

          {/* Sisi Kanan: Akses Modul Materi & Panel Guru */}
          <div className="flex items-center gap-2">
            <button
              id="btn-navbar-materi"
              type="button"
              onClick={onOpenMateri}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-300 cursor-pointer"
              title="Pelajari Modul Materi Pembelajaran"
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="hidden sm:inline">Materi Pelajaran</span>
              <span className="sm:hidden">Materi</span>
            </button>

            {currentStage === 4 ? (
              <button
                id="btn-back-student"
                onClick={onBackToStudentView}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-300 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Halaman Siswa</span>
              </button>
            ) : (
              <button
                id="btn-open-teacher-panel"
                onClick={onOpenTeacherPanel}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200 cursor-pointer"
                title="Akses Panel Guru"
              >
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Panel Guru</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
