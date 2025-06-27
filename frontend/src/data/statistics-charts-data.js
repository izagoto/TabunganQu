import { chartsConfig } from "@/configs";

const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#0288d1"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
};

const summaryChartData = {
  daily: {
  type: "line",
  height: 220,
  series: [
    {
        name: "Pemasukan",
        data: [200, 300, 250, 400, 350, 500, 450],
      },
      {
        name: "Pengeluaran",
        data: [150, 200, 300, 350, 400, 300, 250],
    },
  ],
  options: {
    ...chartsConfig,
      colors: ["#22c55e", "#ef4444"],
      xaxis: {
        ...chartsConfig.xaxis,
        categories: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
      },
    },
  },
  monthly: {
    type: "line",
    height: 220,
    series: [
      {
        name: "Pemasukan",
        data: [5000, 7000, 8000, 6000, 9000, 7500, 8500, 9500, 10000, 11000, 12000, 13000],
      },
      {
        name: "Pengeluaran",
        data: [4000, 6000, 7000, 5000, 8000, 6500, 7000, 8000, 9000, 9500, 10000, 11000],
      },
    ],
    options: {
      ...chartsConfig,
      colors: ["#22c55e", "#ef4444"],
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
          "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
      ],
    },
  },
  },
  yearly: {
    type: "line",
    height: 220,
  series: [
    {
        name: "Pemasukan",
        data: [70000, 80000, 90000, 100000, 110000],
      },
      {
        name: "Pengeluaran",
        data: [60000, 70000, 80000, 90000, 95000],
    },
  ],
    options: {
      ...chartsConfig,
      colors: ["#22c55e", "#ef4444"],
      xaxis: {
        ...chartsConfig.xaxis,
        categories: ["2019", "2020", "2021", "2022", "2023"],
      },
    },
  },
};

export const statisticsChartsData = [
  {
    color: "white",
    title: "Ringkasan Keuangan",
    description: "", // Akan diisi dinamis di komponen
    footer: "", // Akan diisi dinamis di komponen
    chart: summaryChartData,
  },
  {
    color: "white",
    title: "Welcome",
    description: "Selamat datang, [Nama User]!",
    footer: "",
    chart: null,
  },
];

export default statisticsChartsData;
