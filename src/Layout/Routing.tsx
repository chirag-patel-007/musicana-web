import { Navigate, Outlet, useLocation, useRoutes } from "react-router-dom";
// import { RootState } from "../../store";
// import UnAuthorizedAccess from "../Pages/UnAuthorised";

import AuthHandler from "./AuthHandler";
import ContainerComponent from "./Container";
import React from "react";
import Login from "../views/Pages/Login/Index";
import Home from "../views/Pages/Home";
import UnAuthorizedAccess from "../views/Pages/UnAuthorised";
import PageNotFound from "../views/Pages/PageNotFound";

const RouteWrapper = ({ element }: { element: any }) => {
  const location = useLocation();
  const basePath = location.pathname;
  const validRoute = true; // This should be replaced with actual logic to check if the route is valid
  return validRoute || basePath === "/unauthorized" ? (
    <>
      <AuthHandler /> {/* This handles logout navigation */}
      <ContainerComponent> {element}</ContainerComponent>
    </>
  ) : (
    <Navigate to="/unauthorized" />
  );
};

function RouterComponent() {
  const routes = useRoutes([
    {
      path: "/login",
      element: <Login />,
      caseSensitive: true,
    },
    {
      path: "/",
      element: <RouteWrapper element={<Outlet />} />,
      children: [
        {
          path: "/",
          element: <Home />,
          caseSensitive: true,
        },
        {
          path: "/home",
          element: <Home />,
          caseSensitive: true,
        },
        {
          path: "unauthorized",
          element: <UnAuthorizedAccess />,
          caseSensitive: true,
        },
        {
          path: "/*",
          element: <PageNotFound />,
        },
      ],
    },
  ]);

  return routes;
}

export default RouterComponent;
