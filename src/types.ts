/**
 * Definisi Type & Interface Aplikasi Tes Sumatif
 * SD NEGERI 3 LOLOAN TIMUR - PENDIDIKAN PANCASILA KELAS VI
 */

export type QuestionType = 'pg' | 'pgk' | 'pgk_kategori' | 'isian';
export type CategoryType = 'benar_salah' | 'setuju_tidak_setuju' | 'sesuai_tidak_sesuai';
export type Difficulty = 'Mudah' | 'Sedang' | 'Sukar';

export interface StudentBirthDate {
  hari?: string;
  bulan?: string;
  tahun?: string;
}

export interface StudentIdentity {
  nama: string;
  noAbsen: string;
  tglLahir?: StudentBirthDate;
}

export interface OptionItem {
  id: string; // e.g. 'A', 'B', 'C', 'D'
  text: string;
}

export interface StatementItem {
  id: string; // e.g. 's1', 's2', 's3'
  text: string;
  correctAnswer: boolean; // true = respon positif (Benar/Setuju/Sesuai), false = respon negatif (Salah/Tidak Setuju/Tidak Sesuai)
}

export interface Question {
  id: number;
  type: QuestionType;
  categoryType?: CategoryType; // untuk 'pgk_kategori'
  text: string;
  imageSvg?: string; // Format SVG visual untuk representasi lambang/ilustrasi Pancasila
  options?: OptionItem[]; // Untuk 'pg' (4 opsi) dan 'pgk' (3-4 opsi)
  statements?: StatementItem[]; // Untuk 'pgk_kategori'
  correctAnswer?: string | string[]; // string untuk 'pg' & 'isian', array untuk 'pgk'
  acceptedAnswers?: string[]; // variasi jawaban untuk 'isian'
  difficulty: Difficulty;
  explanation: string;
  topic: string;
}

export interface ShuffledQuestion extends Question {
  originalQuestionId: number;
  shuffledOptions?: OptionItem[];
}

export type AnswerValue = string | string[] | Record<string, boolean>;

export interface ExamResult {
  id?: string;
  timestamp: string;
  nama: string;
  noAbsen: string;
  kelas: string;
  tglLahir?: string;
  benar: number;
  salah: number;
  nilai: number;
  status: 'Lulus' | 'Belum Lulus';
  detailJawaban?: Record<number, AnswerValue>;
}

export type AppStage = 1 | 2 | 3 | 4;
