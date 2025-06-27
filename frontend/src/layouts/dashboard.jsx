import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  // Configurator,
  // Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController } from "@/context";
import PageNotFound from "@/pages/PageNotFound";

export function Dashboard() {
  const [controller] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const location = useLocation();

  // Ambil semua pages dari routes dashboard
  const dashboardPages = routes.find(r => r.layout === "dashboard").pages;
  const validPaths = dashboardPages.map(({ path }) => (path === "/" ? "/" : path));
  const is404 = !validPaths.includes(location.pathname === "/" ? "/" : `/${location.pathname.split("/")[1] ? location.pathname.split("/")[1] : ""}${location.pathname.split("/")[2] ? "/" + location.pathname.split("/")[2] : ""}`);

  if (is404) {
    return <PageNotFound />;
  }

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="flex flex-col h-screen p-4 xl:ml-80">
        <div className="sticky top-0 z-50" style={{ backgroundColor: 'rgb(246,247,248)' }}>
          <DashboardNavbar />
        </div>
        <div className="flex-1 overflow-auto">
          {/* <Configurator /> */}
          <Routes>
            {dashboardPages.map(({ path, element }) => (
              <Route key={path} path={path.replace(/^\//, "")} element={element} />
            ))}
            <Route path="" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
