import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  TagIcon,
  BanknotesIcon,
  ArrowsRightLeftIcon,
  BellAlertIcon,
  ChartBarIcon,
  UsersIcon,
  MapPinIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import IncomePage from "@/pages/dashboard/income";
import ExpensePage from "@/pages/dashboard/expense";
import CategoryPage from "@/pages/dashboard/category";
import BankAccountPage from "@/pages/dashboard/bank-account";
import DebtLoanPage from "@/pages/dashboard/debt-loan";
import UserManagementPage from "@/pages/dashboard/user-management";
import BillsReminderPage from "@/pages/dashboard/bills-reminder";
import FinanceReportPage from "@/pages/dashboard/finance-report";
import LocationPage from "@/pages/dashboard/location";
import AccountSettingsPage from "@/pages/dashboard/account-settings";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/dashboard",
        element: <Home />,
      },
      {
        icon: <ArrowUpTrayIcon {...icon} />,
        name: "Pemasukan",
        path: "/income",
        element: <IncomePage />,
      },
      {
        icon: <ArrowDownTrayIcon {...icon} />,
        name: "Pengeluaran",
        path: "/expense",
        element: <ExpensePage />,
      },
      {
        icon: <TagIcon {...icon} />,
        name: "Kategori",
        path: "/category",
        element: <CategoryPage />,
      },
      {
        icon: <BanknotesIcon {...icon} />,
        name: "Rekening & Dompet",
        path: "/account-wallet",
        element: <BankAccountPage />,
      },
      {
        icon: <ArrowsRightLeftIcon {...icon} />,
        name: "Hutang/Piutang",
        path: "/debt-loan",
        element: <DebtLoanPage />,
      },
      {
        icon: <BellAlertIcon {...icon} />,
        name: "Tagihan dan Pengingat",
        path: "/bills-reminder",
        element: <BillsReminderPage />,
  },
  {
        icon: <ChartBarIcon {...icon} />,
        name: "Laporan Keuangan",
        path: "/finance-report",
        element: <FinanceReportPage />,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "Management User",
        path: "/user-management",
        element: <UserManagementPage />,
      },
      {
        icon: <Cog6ToothIcon {...icon} />,
        name: "Pengaturan Akun",
        path: "/account-settings",
        element: <AccountSettingsPage />,
      },
      {
        icon: <MapPinIcon {...icon} />,
        name: "Location",
        path: "/location",
        element: <LocationPage />,
      },
    ],
  },
];

export default routes;
