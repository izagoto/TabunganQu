import React, { useRef, useState, useEffect } from "react";
import { Cog6ToothIcon, UserCircleIcon, TrashIcon, ArrowDownTrayIcon, ArrowUpTrayIcon, LockClosedIcon, XMarkIcon, CheckCircleIcon, ExclamationCircleIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const getUserFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

const dummyProfile = {
  photo: null,
  name: "Budi Santoso",
  username: "budi123",
  email: "budi@email.com",
};

export default function AccountSettingsPage() {
  const [tab, setTab] = useState("profile");
  const [user, setUser] = useState(getUserFromStorage());
  const [originalUser, setOriginalUser] = useState(getUserFromStorage());
  const [photoPreview, setPhotoPreview] = useState(user?.photo || "/img/blank_profile.webp");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [importError, setImportError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [alert, setAlert] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [alertVisible, setAlertVisible] = useState(false);
  const fileInputRef = useRef();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // State untuk mendeteksi perubahan profil
  const [isProfileChanged, setIsProfileChanged] = useState(false);
  // State untuk mendeteksi perubahan password
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const defaultPhoto = "/img/blank_profile.webp";

  // Reset alert saat tab berganti
  useEffect(() => { setAlert(""); }, [tab]);

  // Alert otomatis hilang setelah beberapa detik dengan animasi fade out
  useEffect(() => {
    if (alert) {
      setAlertVisible(true);
      const fadeTimer = setTimeout(() => setAlertVisible(false), 2500); // mulai fade out setelah 2.5s
      const hideTimer = setTimeout(() => setAlert("") , 3000); // hilang setelah 3s
      return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
    }
  }, [alert]);

  // Deteksi perubahan profil
  useEffect(() => {
    setIsProfileChanged(
      user.fullName !== originalUser.fullName ||
      user.username !== originalUser.username ||
      user.email !== originalUser.email ||
      photoPreview !== (originalUser.photo || defaultPhoto)
    );
  }, [user, originalUser, photoPreview, defaultPhoto]);

  // Deteksi perubahan password
  useEffect(() => {
    setIsPasswordChanged(!!oldPassword || !!password);
  }, [oldPassword, password]);

  // Simpan perubahan profil
  const handleSave = async () => {
    setAlert("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: user.fullName,
          username: user.username,
          email: user.email,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.messages || "Gagal update profil");
      localStorage.setItem("user", JSON.stringify(data.data));
      setOriginalUser(data.data);
      setAlertType("success");
      setAlert("Profil berhasil disimpan!");
    } catch (err) {
      setAlertType("error");
      setAlert(err.message || "Gagal menyimpan profil!");
    }
  };

  // Batalkan perubahan profil
  const handleCancel = () => {
    setUser(originalUser);
    setPhotoPreview(originalUser?.photo || defaultPhoto);
    setAlertType("success");
    setAlert("Perubahan dibatalkan.");
  };

  // Dummy handler
  const handleProfileChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoPreview(URL.createObjectURL(file));
    setUploading(true);
    setUploadError("");
    setAlert("");
    try {
      const formData = new FormData();
      formData.append("photo", file);
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/users/profile/photo", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.messages || "Upload gagal");
      // Update localStorage dan state user
      const updatedUser = { ...user, photo: data.data.photo };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setPhotoPreview(data.data.photo || defaultPhoto);
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };
  const handlePhotoRemove = async () => {
    setPhotoPreview(defaultPhoto);
    setAlert("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/users/profile/photo", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.messages || "Gagal hapus foto profil");
      // Update localStorage dan state user
      const updatedUser = { ...user, photo: null };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (err) {
    }
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
  // Simpan password baru
  const handleSavePassword = async () => {
    setPasswordError("");
    setAlert("");
    if (!oldPassword || !password) {
      setPasswordError("Password lama dan baru wajib diisi.");
      setAlertType("error");
      setAlert("Password lama dan baru wajib diisi.");
      return;
    }
    if (oldPassword === password) {
      setPasswordError("Password baru tidak boleh sama dengan password lama.");
      setAlertType("error");
      setAlert("Password baru tidak boleh sama dengan password lama.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.messages || "Gagal update password");
      setAlertType("success");
      setAlert("Password berhasil diubah!");
      setOldPassword("");
      setPassword("");
    } catch (err) {
      setAlertType("error");
      setAlert(err.message || "Gagal mengubah password!");
    }
  };
  // Batal password
  const handleCancelPassword = () => {
    setOldPassword("");
    setPassword("");
    setPasswordError("");
    setAlert("");
  };

  return (
    <div className="min-h-[80vh] bg-blue-gray-50/40">
      {/* ALERT GLOBAL DI SUDUT KANAN BAWAH */}
      {alert && (
        <div
          className={`fixed z-50 right-6 bottom-6 min-w-[320px] max-w-xs flex items-start gap-3 rounded-lg shadow-lg px-5 py-4 border transition-opacity duration-500
            ${alertType === 'success'
              ? 'bg-green-100 border-green-300 text-green-800'
              : 'bg-red-100 border-red-300 text-red-800'}
            ${alertVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <span className="mt-1">
            {alertType === 'success' ? (
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            ) : (
              <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
            )}
          </span>
          <div className="flex-1">
            <span className="font-bold mr-1">{alertType === 'success' ? 'Success:' : 'Error:'}</span>
            <span>{alert}</span>
          </div>
          <button
            onClick={() => setAlert("")}
            className="ml-2 p-1 rounded hover:bg-black/10 transition"
            aria-label="Close alert"
          >
            <XMarkIcon className={`h-5 w-5 ${alertType === 'success' ? 'text-green-600' : 'text-red-500'}`} />
          </button>
        </div>
      )}
      {/* END ALERT */}
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
                    <img src={photoPreview || defaultPhoto} alt="profile" className="h-44 w-44 rounded-full object-cover border-4 border-cyan-100 shadow-lg" />
                  ) : (
                    <img src={defaultPhoto} alt="profile" className="h-44 w-44 rounded-full object-cover border-4 border-cyan-100 shadow-lg" />
                  )}
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" id="upload-photo" />
                  <div className="flex gap-2 mt-3">
                    <label htmlFor="upload-photo" className="cursor-pointer text-xs text-cyan-700 font-semibold hover:underline">{uploading ? "Uploading..." : "Upload Foto"}</label>
                    {photoPreview && <button type="button" onClick={handlePhotoRemove} className="text-xs text-red-500 font-semibold hover:underline">Hapus Foto</button>}
                  </div>
                  {uploadError && <div className="text-xs text-red-500 mt-1">{uploadError}</div>}
                </div>
                <div className="flex-1 flex flex-col gap-5">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-blue-gray-700">Nama Lengkap</label>
                    <input name="fullName" value={user.fullName} onChange={handleProfileChange} className="border rounded-lg px-4 py-3 w-full text-base focus:outline-none focus:ring-2 focus:ring-cyan-200" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-blue-gray-700">Username</label>
                    <input name="username" value={user.username} onChange={handleProfileChange} className="border rounded-lg px-4 py-3 w-full text-base focus:outline-none focus:ring-2 focus:ring-cyan-200" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-blue-gray-700">Email</label>
                    <input name="email" value={user.email} onChange={handleProfileChange} className="border rounded-lg px-4 py-3 w-full text-base focus:outline-none focus:ring-2 focus:ring-cyan-200" />
                  </div>
                  <div className="flex gap-2 mt-4 justify-end">
                    <button type="button" onClick={handleSave} disabled={!isProfileChanged} className={`bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-lg ${!isProfileChanged ? 'opacity-50 cursor-not-allowed' : ''}`}>Simpan</button>
                    <button type="button" onClick={handleCancel} disabled={!isProfileChanged} className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg ${!isProfileChanged ? 'opacity-50 cursor-not-allowed' : ''}`}>Batal</button>
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
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Password Lama"
                  value={oldPassword}
                  onChange={e => setOldPassword(e.target.value)}
                  className="border rounded-lg px-4 py-3 w-full text-base focus:outline-none focus:ring-2 focus:ring-cyan-200 pr-12"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-gray-400 hover:text-cyan-600"
                  onClick={() => setShowOldPassword(v => !v)}
                  tabIndex={-1}
                >
                  {showOldPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password Baru"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="border rounded-lg px-4 py-3 w-full text-base focus:outline-none focus:ring-2 focus:ring-cyan-200 pr-12"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-gray-400 hover:text-cyan-600"
                  onClick={() => setShowPassword(v => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
              {passwordError && <div className="text-xs text-red-500 -mt-3 mb-2">{passwordError}</div>}
              <div className="flex gap-2 mt-2">
                <button type="button" onClick={handleSavePassword} disabled={!isPasswordChanged} className={`bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2.5 px-6 rounded-lg self-start transition-all duration-200 ${!isPasswordChanged ? 'opacity-50 cursor-not-allowed' : ''}`}>Simpan</button>
                <button type="button" onClick={handleCancelPassword} disabled={!isPasswordChanged} className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 px-6 rounded-lg self-start transition-all duration-200 ${!isPasswordChanged ? 'opacity-50 cursor-not-allowed' : ''}`}>Batal</button>
              </div>
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