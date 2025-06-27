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
import React, { useState } from "react";

export function StatisticsChart({ color, chart, title, description, footer }) {
  // Simulasi nama user dan foto, bisa diganti dengan state/auth user
  const userName = "User";
  const userPhoto = "/img/203966659.jpeg";

  // Jika chart adalah objek filter (bukan chart tunggal)
  const isSummaryChart = chart && chart.daily && chart.monthly && chart.yearly;
  const [filter, setFilter] = useState("monthly");

  if (!chart) {
    return (
      <Card className="border border-blue-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[320px] rounded-xl max-w-sm mx-auto" style={{ background: 'rgb(0,146,185)' }}>
        <CardBody className="flex flex-col items-center justify-center mt-[-32px] px-4 py-4">
          <Avatar src={userPhoto} alt={userName} size="xl" className="-mt-10 mb-4 border-4 border-black shadow-lg rounded-full w-28 h-28" />
          <Typography variant="h5" className="mb-2 font-bold text-white">
            Selamat datang, {userName}!
          </Typography>
          <Typography variant="small" className="text-white">
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
  chart: PropTypes.object.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

StatisticsChart.displayName = "/src/widgets/charts/statistics-chart.jsx";

export default StatisticsChart;
