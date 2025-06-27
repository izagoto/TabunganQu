import React, { useRef, useState } from "react";
import { Cog6ToothIcon, UserCircleIcon, TrashIcon, ArrowDownTrayIcon, ArrowUpTrayIcon, LockClosedIcon } from "@heroicons/react/24/solid";

const dummyProfile = {
  photo: null,
  name: "Budi Santoso",
  username: "budi123",
  email: "budi@email.com",
};

export default function AccountSettingsPage() {
  const [tab, setTab] = useState("profile");
  const [profile, setProfile] = useState(dummyProfile);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [password, setPassword] = useState("");
  const [importError, setImportError] = useState("");
  const fileInputRef = useRef();

  // Dummy handler
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
      setProfile({ ...profile, photo: file });
    }
  };
  const handlePhotoRemove = () => {
    setPhotoPreview(null);
    setProfile({ ...profile, photo: null });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleExport = () => {
    const data = { keuangan: "dummy data" };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "backup-keuangan.json";
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        JSON.parse(evt.target.result);
        setImportError("");
        alert("Import data berhasil (dummy)");
      } catch {
        setImportError("File tidak valid!");
      }
    };
    reader.readAsText(file);
  };
  const handleDeleteAll = () => {
    if (window.confirm("Yakin ingin menghapus semua data? Tindakan ini tidak dapat dibatalkan!")) {
      alert("Semua data dihapus (dummy)");
    }
  };

  return (
    <div className="min-h-[80vh] bg-blue-gray-50/40">
      <div className="w-full bg-white rounded-2xl shadow-lg border border-blue-gray-100 mt-12">
        <div className="flex items-center gap-3 px-8 pt-8 pb-4 border-b border-blue-gray-50 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-t-2xl">
          <div className="bg-white rounded-full p-2 shadow">
            <Cog6ToothIcon className="h-8 w-8 text-cyan-600" />
          </div>
          <h1 className="text-2xl font-bold text-white drop-shadow">Pengaturan Akun</h1>
        </div>
        <div className="p-8">
          <div className="flex gap-4 mb-8 border-b border-blue-gray-100">
            <button onClick={() => setTab("profile")}
              className={`py-2 px-6 font-semibold border-b-2 transition-all duration-200 rounded-t-lg ${tab === "profile" ? "border-cyan-600 text-cyan-700 bg-cyan-50" : "border-transparent text-blue-gray-500 hover:text-cyan-600 hover:bg-blue-gray-50"}`}>Profil</button>
            <button onClick={() => setTab("security")}
              className={`py-2 px-6 font-semibold border-b-2 transition-all duration-200 rounded-t-lg ${tab === "security" ? "border-cyan-600 text-cyan-700 bg-cyan-50" : "border-transparent text-blue-gray-500 hover:text-cyan-600 hover:bg-blue-gray-50"}`}>Keamanan</button>
            <button onClick={() => setTab("data")}
              className={`py-2 px-6 font-semibold border-b-2 transition-all duration-200 rounded-t-lg ${tab === "data" ? "border-cyan-600 text-cyan-700 bg-cyan-50" : "border-transparent text-blue-gray-500 hover:text-cyan-600 hover:bg-blue-gray-50"}`}>Management Data</button>
          </div>
          {/* Tab Profil */}
          {tab === "profile" && (
            <div className="flex flex-col gap-8">
              <div className="flex gap-8 items-start">
                <div className="relative flex flex-col items-center mt-1">
                  {photoPreview ? (
                    <img src={photoPreview} alt="profile" className="h-44 w-44 rounded-full object-cover border-4 border-cyan-100 shadow-lg" />
                  ) : (
                    <img src="/img/203966659.jpeg" alt="profile" className="h-44 w-44 rounded-full object-cover border-4 border-cyan-100 shadow-lg" />
                  )}
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" id="upload-photo" />
                  <div className="flex gap-2 mt-3">
                    <label htmlFor="upload-photo" className="cursor-pointer text-xs text-cyan-700 font-semibold hover:underline">Upload Foto</label>
                    {photoPreview && <button type="button" onClick={handlePhotoRemove} className="text-xs text-red-500 font-semibold hover:underline">Hapus Foto</button>}
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-5">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-blue-gray-700">Nama Lengkap</label>
                    <input name="name" value={profile.name} onChange={handleProfileChange} className="border rounded-lg px-4 py-3 w-full text-base focus:outline-none focus:ring-2 focus:ring-cyan-200" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-blue-gray-700">Username</label>
                    <input name="username" value={profile.username} onChange={handleProfileChange} className="border rounded-lg px-4 py-3 w-full text-base focus:outline-none focus:ring-2 focus:ring-cyan-200" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-blue-gray-700">Email</label>
                    <input name="email" value={profile.email} onChange={handleProfileChange} className="border rounded-lg px-4 py-3 w-full text-base focus:outline-none focus:ring-2 focus:ring-cyan-200" />
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Tab Keamanan */}
          {tab === "security" && (
            <div className="flex flex-col gap-6 max-w-md">
              <div className="flex items-center gap-2 mb-2">
                <LockClosedIcon className="h-5 w-5 text-blue-gray-400" />
                <span className="font-semibold text-blue-gray-700">Ubah Password</span>
              </div>
              <input type="password" placeholder="Password Baru" value={password} onChange={e => setPassword(e.target.value)} className="border rounded-lg px-4 py-3 w-full text-base focus:outline-none focus:ring-2 focus:ring-cyan-200" />
              <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2.5 px-6 rounded-lg self-start transition-all duration-200">Simpan Password</button>
            </div>
          )}
          {/* Tab Management Data */}
          {tab === "data" && (
            <div className="flex flex-col gap-6 max-w-md">
              <div className="flex gap-2">
                <button onClick={handleExport} className="flex items-center gap-2 bg-blue-gray-100 hover:bg-blue-gray-200 text-blue-gray-700 font-semibold px-5 py-2.5 rounded-lg transition-all duration-200">
                  <ArrowDownTrayIcon className="h-5 w-5" /> Export Data
                </button>
                <label className="flex items-center gap-2 bg-blue-gray-100 hover:bg-blue-gray-200 text-blue-gray-700 font-semibold px-5 py-2.5 rounded-lg cursor-pointer transition-all duration-200">
                  <ArrowUpTrayIcon className="h-5 w-5" /> Import Data
                  <input type="file" accept="application/json" onChange={handleImport} className="hidden" />
                </label>
              </div>
              {importError && <div className="text-red-500 text-xs">{importError}</div>}
              <div className="mt-8 border-t pt-6 border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrashIcon className="h-5 w-5 text-red-400" />
                  <span className="font-semibold text-red-600">Danger Zone</span>
                </div>
                <p className="text-xs text-red-500 mb-2">Tindakan ini akan menghapus semua data Anda secara permanen dan tidak dapat dibatalkan.</p>
                <button onClick={handleDeleteAll} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-lg transition-all duration-200">Hapus Semua Data</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 