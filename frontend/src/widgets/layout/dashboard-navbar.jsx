import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
  Breadcrumbs,
} from "@material-tailwind/react";
import { UserCircleIcon, BellIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathParts = pathname.split("/").filter(Boolean);

  const handleLogout = () => {
    // Implementasi logout (misal: hapus token, redirect ke login)
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  const notifications = [
    {
      title: "Tagihan Belum Dibayar",
      message: "Ada 2 tagihan yang belum dibayar.",
    },
    {
      title: "Hutang Belum Lunas",
      message: "Ada 1 hutang yang belum lunas.",
    },
    {
      title: "Piutang Belum Lunas",
      message: "Ada 3 piutang yang belum lunas.",
    },
  ];

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex justify-between items-center gap-4">
        <div className="capitalize">
          {pathParts.length === 1 && pathParts[0] === "dashboard" ? (
            <Link to="/dashboard" className="group">
              <Typography
                variant="h5"
                color="blue-gray"
                className="text-xl font-bold transition-all group-hover:text-[rgb(0,146,185)]"
                style={{ cursor: 'pointer' }}
              >
                Dashboard
              </Typography>
            </Link>
          ) : (
            <Breadcrumbs className="bg-transparent p-0 transition-all">
              <Link to="/dashboard" className="group">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="text-xl font-bold transition-all group-hover:text-[rgb(0,146,185)]"
                  style={{ cursor: 'pointer' }}
                >
                  Dashboard
                </Typography>
              </Link>
              {pathParts[0] !== "dashboard" && pathParts.slice(0).map((part, idx) => (
                part && (
            <Typography
                    key={idx}
                    variant="h5"
              color="blue-gray"
                    className="text-xl font-bold"
            >
                    {part.replace(/-/g, " ").replace(/rekening dan dompet/i, "Rekening & Dompet")}
            </Typography>
                )
              ))}
          </Breadcrumbs>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Menu placement="bottom-end">
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <BellIcon className="h-6 w-6 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-80">
              <Typography variant="h6" className="px-4 py-2">Notifikasi</Typography>
              {notifications.map((notif, idx) => (
                <MenuItem key={idx} className="flex flex-col items-start gap-1">
                  <span className="font-bold text-blue-gray-700">{notif.title}</span>
                  <span className="text-xs text-blue-gray-500">{notif.message}</span>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          {/* Hamburger menu untuk mobile di kanan notification */}
          <button
            className="xl:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 bg-transparent"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon className="h-8 w-8 text-blue-gray-400" />
          </button>
          <Menu placement="bottom-end">
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <UserCircleIcon className="h-6 w-6 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList>
              <MenuItem>
                <Link to="/account-settings" className="flex items-center gap-2">
                  <Cog6ToothIcon className="h-5 w-5 text-blue-gray-400" />
                  Pengaturan
                </Link>
              </MenuItem>
              <MenuItem onClick={handleLogout} className="flex items-center gap-2">
                <ArrowRightOnRectangleIcon className="h-5 w-5 text-blue-gray-400" />
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
