import { Routes, Route } from "react-router-dom";
import {
  ChartPieIcon,
  UserIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { Navbar, Footer } from "@/widgets/layout";
import routes from "@/routes";
import { SignIn, SignUp } from "@/pages/auth";

export function Auth() {
  const navbarRoutes = [
    {
      name: "dashboard",
      path: "/dashboard",
      icon: ChartPieIcon,
    },
    {
      name: "profile",
      path: "/dashboard",
      icon: UserIcon,
    },
    {
      name: "sign up",
      path: "/sign-up",
      icon: UserPlusIcon,
    },
    {
      name: "sign in",
      path: "/sign-in",
      icon: ArrowRightOnRectangleIcon,
    },
  ];

  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        {routes.map(
          ({ layout, pages }) =>
            layout === "auth" &&
            pages.map(({ path, element }) => (
              <Route exact path={path} element={element} />
            ))
        )}
      </Routes>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;