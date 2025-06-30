import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import React, { useState, useEffect, useRef } from "react";

export function StatisticsChart({ color, chart, title, description, footer }) {
  // Ambil data user dari localStorage
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    console.error("Error parsing user data:", error);
  }
  const defaultPhoto = "/img/blank_profile.webp";
  const [userPhoto, setUserPhoto] = useState(user?.photo || defaultPhoto);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef();

  // Data user untuk welcome card
  const userName = user?.fullName || "User";
  const userRole = user?.role || "user";
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    setUserPhoto(user?.photo || defaultPhoto);
    // eslint-disable-next-line
  }, [user?.photo]);

  // Jika chart adalah objek filter (bukan chart tunggal)
  const isSummaryChart = chart && chart.daily && chart.monthly && chart.yearly;
  const [filter, setFilter] = useState("monthly");

  // Handler upload foto dari avatar
  const handleAvatarClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
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
      setUserPhoto(data.data.photo || defaultPhoto);
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

  if (!chart) {
    return (
      <Card className="border border-blue-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[320px] rounded-xl max-w-sm mx-auto" style={{ background: 'rgb(0,146,185)' }}>
        <CardBody className="flex flex-col items-center justify-center px-4 py-4">
          <div className="relative flex flex-col items-center mb-2">
            <img
              src={userPhoto || defaultPhoto}
              alt={userName}
              className="border-4 border-white shadow-lg rounded-full w-28 h-28 object-cover cursor-pointer hover:opacity-80 transition"
              onClick={handleAvatarClick}
              title="Klik untuk ganti foto profil"
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              className="hidden"
            />
            {/* Status online indicator */}
            <span className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
          </div>
          {uploading && <div className="text-xs text-white mb-1">Uploading...</div>}
          {uploadError && <div className="text-xs text-red-200 mb-1">{uploadError}</div>}
          <Typography variant="h5" className="mb-1 font-bold text-white text-center">
            Selamat datang, {userName}!
          </Typography>
          <Typography
            variant="small"
            className={`font-semibold mb-1 text-center px-3 py-1 rounded-full inline-block ${userRole === 'admin' ? 'bg-cyan-600/80 text-white' : 'bg-blue-gray-400/80 text-white'}`}
          >
            {userRole === 'admin' ? 'Administrator' : 'User Biasa'}
          </Typography>
          <div className="flex items-center gap-2 mb-3">
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-gray-400'}`}></span>
            <Typography variant="small" className="text-white/80">
              {isOnline ? 'Online' : 'Offline'}
            </Typography>
          </div>
          <Typography variant="small" className="text-white text-center mt-2">
            Ayo kelola keuanganmu dengan TabunganQu
          </Typography>
        </CardBody>
      </Card>
    );
  }

  // Jika chart Ringkasan Keuangan (dengan filter)
  if (isSummaryChart) {
    const chartData = chart[filter];
    // Hitung total pemasukan dan pengeluaran
    const pemasukan = chartData.series[0].data.reduce((a, b) => a + b, 0);
    const pengeluaran = chartData.series[1].data.reduce((a, b) => a + b, 0);
    let status = "";
    if (pemasukan > pengeluaran) {
      status = `Pemasukan lebih besar dari pengeluaran (${pemasukan - pengeluaran})`;
    } else if (pengeluaran > pemasukan) {
      status = `Pengeluaran lebih besar dari pemasukan (${pengeluaran - pemasukan})`;
    } else {
      status = "Pemasukan dan pengeluaran seimbang";
    }
    // Simulasi waktu update
    const lastUpdate = new Date().toLocaleString("id-ID", { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short', year: 'numeric' });

    return (
      <Card className="border border-blue-gray-100 shadow-sm">
        <CardHeader variant="gradient" color={color} floated={false} shadow={false} className="flex flex-col items-start gap-2 p-4 pb-0">
          <div className="flex gap-2 mb-2">
            <button onClick={() => setFilter('daily')} className={`px-3 py-1 rounded text-xs font-bold ${filter === 'daily' ? 'bg-cyan-600 text-white' : 'bg-blue-gray-50 text-blue-gray-700'}`}>Harian</button>
            <button onClick={() => setFilter('monthly')} className={`px-3 py-1 rounded text-xs font-bold ${filter === 'monthly' ? 'bg-cyan-600 text-white' : 'bg-blue-gray-50 text-blue-gray-700'}`}>Bulanan</button>
            <button onClick={() => setFilter('yearly')} className={`px-3 py-1 rounded text-xs font-bold ${filter === 'yearly' ? 'bg-cyan-600 text-white' : 'bg-blue-gray-50 text-blue-gray-700'}`}>Tahunan</button>
          </div>
          <div className="w-full" style={{ minHeight: 260 }}>
            <Chart {...chartData} width="100%" height={260} />
          </div>
        </CardHeader>
        <CardBody className="px-6 pt-2">
          <Typography variant="h6" color="blue-gray">
            {title}
          </Typography>
          <Typography variant="small" className="font-normal text-blue-gray-600">
            {status}
          </Typography>
        </CardBody>
        <CardFooter className="border-t border-blue-gray-50 px-6 py-3">
          <Typography variant="small" className="text-blue-gray-400">Diupdate {lastUpdate}</Typography>
        </CardFooter>
      </Card>
    );
  }

  // Chart default (lama)
  return (
    <Card className="border border-blue-gray-100 shadow-sm">
      <CardHeader variant="gradient" color={color} floated={false} shadow={false}>
        <Chart {...chart} />
      </CardHeader>
      <CardBody className="px-6 pt-0">
        <Typography variant="h6" color="blue-gray">
          {title}
        </Typography>
        <Typography variant="small" className="font-normal text-blue-gray-600">
          {description}
        </Typography>
      </CardBody>
      {footer && (
        <CardFooter className="border-t border-blue-gray-50 px-6 py-5">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

StatisticsChart.defaultProps = {
  color: "blue",
  footer: null,
  chart: null,
};

StatisticsChart.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  chart: PropTypes.object,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

StatisticsChart.displayName = "/src/widgets/charts/statistics-chart.jsx";

export default StatisticsChart;
