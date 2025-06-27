import {
  BanknotesIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "cyan",
    icon: BanknotesIcon,
    title: "Total Saldo",
    value: "Rp 1.500.000",
    footer: {
      color: "text-green-500",
      value: "+Rp 500.000",
      label: "penambahan saldo",
    },
  },
  {
    color: "green",
    icon: ArrowUpTrayIcon,
    title: "Pemasukan Bulan Ini",
    value: "Rp 500.000",
    footer: {
      color: "text-green-500",
      value: "+Rp 500.000",
      label: "total pemasukan",
    },
  },
  {
    color: "red",
    icon: ArrowDownTrayIcon,
    title: "Pengeluaran Bulan Ini",
    value: "Rp 300.000",
    footer: {
      color: "text-red-500",
      value: "-Rp 300.000",
      label: "total pengeluaran",
    },
  },
  {
    color: "amber",
    icon: ChartBarIcon,
    title: "Pertumbuhan",
    value: "+5%",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "pertumbuhan",
    },
  },
];

export default statisticsCardsData;
