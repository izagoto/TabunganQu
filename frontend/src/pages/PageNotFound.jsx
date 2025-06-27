import React from "react";
import { Link } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

export default function PageNotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 relative overflow-hidden">
      {/* Glowing stars */}
      <div className="absolute top-10 left-1/4 w-2 h-2 bg-white rounded-full opacity-70 blur-sm animate-pulse" />
      <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-cyan-300 rounded-full opacity-60 blur-sm animate-pulse" />
      <div className="absolute bottom-20 left-1/3 w-3 h-3 bg-blue-400 rounded-full opacity-50 blur-md animate-pulse" />
      <div className="absolute bottom-10 right-1/4 w-2 h-2 bg-emerald-300 rounded-full opacity-70 blur-sm animate-pulse" />
      {/* Blurred planet */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-blue-700 via-cyan-400 to-blue-900 rounded-full opacity-30 blur-3xl z-0" />
      <div className="backdrop-blur-md bg-white/10 border border-blue-100 rounded-3xl shadow-2xl px-12 py-14 flex flex-col items-center max-w-lg w-full relative z-10">
        <span className="text-7xl mb-4 animate-bounce">🪐</span>
        <h1 className="text-7xl font-extrabold text-white mb-2 z-10 drop-shadow">404</h1>
        <h2 className="text-3xl font-bold text-cyan-200 mb-3 z-10">Oops! Kamu Tersesat di Angkasa</h2>
        <p className="text-blue-100 mb-10 text-center z-10 max-w-xs">Halaman yang kamu cari tidak ditemukan. Mungkin kamu sedang menjelajah galaksi yang belum terpetakan?</p>
        {/* No dashboard button as requested */}
      </div>
    </div>
  );
} 