import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    package: "gratis",
    photo: "",
  });
  const [errors, setErrors] = useState({});
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!form.fullName) newErrors.fullName = "Nama lengkap wajib diisi";
    if (!form.username) newErrors.username = "Username wajib diisi";
    if (!form.email) newErrors.email = "Email wajib diisi";
    if (!form.password) newErrors.password = "Password wajib diisi";
    setErrors(newErrors);
    setRegisterError("");
    if (Object.keys(newErrors).length > 0) return;
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registrasi gagal");
      navigate("/sign-in");
    } catch (err) {
      setRegisterError(err.message);
    }
  };

  // Registrasi gratis
  const isFree = true;

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-gray-50" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 14 }}>
      <Card className="w-full max-w-lg p-8 rounded-2xl shadow-xl">
        <div className="flex flex-col items-center mb-2">
          <img src="/img/money-bag.png" alt="Money Bag" className="h-20 w-20 mb-2" />
          <span className="text-blue-gray-500 text-base font-medium mb-1 text-center">Kelola keuangan Anda dengan mudah</span>
        </div>
        {isFree && (
          <div className="flex items-start gap-3 bg-green-50 border border-green-300 text-green-900 rounded-xl px-5 py-4 mb-6">
            <svg className="w-6 h-6 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M12 8v4m0 4h.01" /></svg>
            <span>
              <b>Registrasi Gratis</b> – Anda dapat mendaftar tanpa biaya dan langsung menggunakan aplikasi.
            </span>
      </div>
        )}
        <Typography variant="h4" className="font-bold text-center mb-6">
          Daftar ke TabunganQu
        </Typography>
        <div className="flex mb-6 w-full bg-gray-100 rounded-xl p-1">
          <Link to="/sign-in" className="flex-1">
            <button type="button" className="w-full py-3 rounded-lg bg-transparent text-gray-400 font-bold text-xl shadow-none focus:outline-none transition-all duration-150" style={{ boxShadow: 'none' }}>Masuk</button>
          </Link>
          <Link to="/sign-up" className="flex-1">
            <button type="button" className="w-full py-3 rounded-lg bg-white text-black font-bold text-xl shadow-none focus:outline-none transition-all duration-150" style={{ boxShadow: 'none' }} disabled>Daftar</button>
          </Link>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="block text-sm font-semibold mb-1">Nama Lengkap</label>
            <Input
              type="text"
              size="lg"
              placeholder="Nama lengkap"
              value={form.fullName}
              onChange={e => setForm({ ...form, fullName: e.target.value })}
              className={`rounded-lg bg-blue-gray-50 focus:bg-white ${errors.fullName ? 'border border-red-500' : ''}`}
            />
            {errors.fullName && (<Typography className="text-red-500 text-sm mt-1">{errors.fullName}</Typography>)}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Username</label>
            <Input
              type="text"
              size="lg"
              placeholder="Username"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              className={`rounded-lg bg-blue-gray-50 focus:bg-white ${errors.username ? 'border border-red-500' : ''}`}
            />
            {errors.username && (<Typography className="text-red-500 text-sm mt-1">{errors.username}</Typography>)}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <Input
              type="text"
              size="lg"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className={`rounded-lg bg-blue-gray-50 focus:bg-white ${errors.email ? 'border border-red-500' : ''}`}
            />
            {errors.email && (<Typography className="text-red-500 text-sm mt-1">{errors.email}</Typography>)}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                size="lg"
                placeholder="Buat password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className={`rounded-lg bg-blue-gray-50 focus:bg-white pr-12 ${errors.password ? 'border border-red-500' : ''}`}
              />
              <button type="button" className="absolute right-3 top-2.5 text-blue-gray-400 hover:text-cyan-600" onClick={() => setShowPassword((v) => !v)} tabIndex={-1}>
                {showPassword ? (<EyeSlashIcon className="h-5 w-5" />) : (<EyeIcon className="h-5 w-5" />)}
              </button>
            </div>
            {errors.password && (<Typography className="text-red-500 text-sm mt-1">{errors.password}</Typography>)}
          </div>
          {/* <div>
          <label className="block text-sm font-semibold mb-1">Pilih Paket</label>
            <div className="rounded-xl border border-green-200 bg-green-50 px-6 py-5 flex items-center mb-1">
              <span className="text-green-900 font-bold mr-2 text-base leading-tight">Registrasi Gratis</span>
              <span className="text-green-900 text-base leading-tight ml-2">- Akses penuh tanpa biaya</span>
            </div>
            <input type="hidden" name="package" value="gratis" />
          </div> */}
          {registerError && (
            <Typography className="text-red-500 text-sm mt-1 text-center">{registerError}</Typography>
          )}
          <Button type="submit" className="mt-2 bg-cyan-600 hover:bg-cyan-700 text-base font-bold py-3 rounded-lg flex items-center justify-center gap-2" fullWidth>
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            Daftar
          </Button>
        </form>
      </Card>
      </div>
  );
}

export default SignUp;
