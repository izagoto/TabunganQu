import React, { useState, useEffect } from "react";
import { Input, Button, Typography, Card } from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    } else {
      setIsAuthChecked(true);
    }
  }, [navigate]);

  if (!isAuthChecked) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!form.email) newErrors.email = "Email wajib diisi";
    if (!form.password) newErrors.password = "Password wajib diisi";
    setErrors(newErrors);
    setLoginError("");
    if (Object.keys(newErrors).length > 0) return;
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.messages || "Login gagal");
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      localStorage.setItem("showLoginSuccess", "1");
      navigate("/dashboard");
    } catch (err) {
      setLoginError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-gray-50">
      <Card className="w-full max-w-md p-8 rounded-2xl shadow-xl">
        <div className="flex flex-col items-center mb-2">
          <img src="/img/money-bag.png" alt="Money Bag" className="h-20 w-20 mb-2" />
          <span className="text-blue-gray-500 text-base font-medium mb-1 text-center">Kelola keuangan Anda dengan mudah</span>
        </div>
        <Typography variant="h4" className="font-bold text-center mb-6">
          Masuk ke TabunganQu
            </Typography>
        <div className="flex mb-6 w-full bg-gray-100 rounded-xl p-1">
          <Link
            to="/sign-in"
            className="flex-1"
          >
            <button
              type="button"
              className="w-full py-3 rounded-lg bg-white text-black font-bold text-xl shadow-none focus:outline-none transition-all duration-150"
              style={{ boxShadow: 'none' }}
            >
              Masuk
            </button>
          </Link>
          <Link
            to="/sign-up"
            className="flex-1"
          >
            <button
              type="button"
              className="w-full py-3 rounded-lg bg-transparent text-gray-400 font-bold text-xl shadow-none focus:outline-none transition-all duration-150"
              style={{ boxShadow: 'none' }}
            >
              Daftar
            </button>
          </Link>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <Input
              type="text"
              size="lg"
              placeholder="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className={`rounded-lg bg-blue-gray-50 focus:bg-white ${errors.email ? 'border border-red-500' : ''}`}
            />
            {errors.email && (
              <Typography className="text-red-500 text-sm mt-1">{errors.email}</Typography>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                size="lg"
                placeholder="Masukkan password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className={`rounded-lg bg-blue-gray-50 focus:bg-white pr-12 ${errors.password ? 'border border-red-500' : ''}`}
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-blue-gray-400 hover:text-cyan-600"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <Typography className="text-red-500 text-sm mt-1">{errors.password}</Typography>
            )}
          </div>
          {loginError && (
            <Typography className="text-red-500 text-sm mt-1 text-center">{loginError}</Typography>
          )}
          <Button type="submit" className="mt-2 bg-cyan-600 hover:bg-cyan-700 text-base font-bold py-3 rounded-lg flex items-center justify-center gap-2" fullWidth>
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            Masuk
            </Button>
        </form>
      </Card>
      </div>
  );
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/sign-in";
}

export default SignIn;