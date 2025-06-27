import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import React from "react";
import { BanknotesIcon } from "@heroicons/react/24/solid";

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 mt-20 xl:mt-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div
        className={`relative`}
      >
        <Link to="/dashboard" className="py-6 px-8 text-center flex items-center justify-center gap-2">
          <BanknotesIcon className="h-7 w-7" style={{ color: 'rgb(0,146,185)' }} />
          <Typography
            variant="h6"
            className="text-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-move font-extrabold"
            style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path }) => (
              <li key={name}>
                <NavLink to={path} {...(path === "/" ? { end: true } : {})}>
                  {({ isActive }) => (
                    <Button
                      style={isActive ? { backgroundColor: "rgb(0,146,185)" } : {}}
                      variant={isActive ? "filled" : "text"}
                      className={`flex items-center gap-4 px-4 capitalize ${isActive ? 'text-white font-bold' : ''}`}
                      fullWidth
                    >
                      {React.cloneElement(icon, { className: `${icon.props.className || ''} ${isActive ? 'text-white' : ''}` })}
                      <Typography
                        color="inherit"
                        className={`font-medium capitalize ${isActive ? 'text-white' : ''}`}
                      >
                        {name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "TabunganQu",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
