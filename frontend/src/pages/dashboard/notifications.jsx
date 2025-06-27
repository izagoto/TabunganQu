import React from "react";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { InformationCircleIcon, BellIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export function Notifications() {
  const [showAlerts, setShowAlerts] = React.useState({
    blue: true,
    green: true,
    orange: true,
    red: true,
  });
  const [showAlertsWithIcon, setShowAlertsWithIcon] = React.useState({
    blue: true,
    green: true,
    orange: true,
    red: true,
  });
  const alerts = ["gray", "green", "orange", "red"];

  // Dummy data notifikasi
  const notifications = [
    {
      id: 1,
      type: "tagihan",
      title: "Tagihan Listrik Jatuh Tempo",
      desc: "Segera bayar tagihan listrik bulan Juni sebelum 20 Juni 2024.",
      time: "2 jam lalu",
      icon: <ExclamationTriangleIcon className="h-7 w-7 text-yellow-500" />,
    },
    {
      id: 2,
      type: "hutang",
      title: "Pengingat Hutang",
      desc: "Anda memiliki hutang ke Budi sebesar Rp500.000.",
      time: "Kemarin",
      icon: <ExclamationTriangleIcon className="h-7 w-7 text-red-500" />,
    },
    {
      id: 3,
      type: "pengingat",
      title: "Pengingat Tabungan",
      desc: "Saatnya menambah tabungan bulan ini!",
      time: "3 hari lalu",
      icon: <BellIcon className="h-7 w-7 text-cyan-500" />,
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 mb-8">
      <div className="w-full bg-white rounded-2xl shadow-lg border border-blue-gray-100">
        <div className="flex items-center gap-3 px-8 pt-8 pb-4 border-b border-blue-gray-50 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-t-2xl">
          <div className="bg-white rounded-full p-3 shadow">
            <BellIcon className="h-8 w-8 text-cyan-600" />
          </div>
          <h1 className="text-2xl font-bold text-white drop-shadow">Notifikasi</h1>
        </div>
        <div className="p-8 flex flex-col gap-6">
          {notifications.map((notif) => (
            <div key={notif.id} className="flex items-start gap-4 p-5 rounded-xl border border-blue-gray-50 bg-blue-gray-50/40 hover:bg-cyan-50 transition-all cursor-pointer shadow-sm">
              <div>{notif.icon}</div>
              <div className="flex-1">
                <div className="font-semibold text-base mb-1">
                  <Link to="#" style={{ color: 'rgb(0,146,185))' }} className="hover:underline">
                    {notif.title}
                  </Link>
                </div>
                <div className="text-blue-gray-600 text-sm mb-1">{notif.desc}</div>
                <div className="text-xs text-blue-gray-400">{notif.time}</div>
              </div>
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="text-center text-blue-gray-400 py-12">Tidak ada notifikasi.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
