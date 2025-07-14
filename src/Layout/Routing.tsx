import { Navigate, Outlet, useLocation, useRoutes } from "react-router-dom";
import ContainerComponent from "./Container";
import UnAuthorizedAccess from "../views/Pages/UnAuthorised";
import Dashboard from "../views/Pages/Dashboard/index";

const RouteWrapper = ({ element }: { element: any }) => {
  const location = useLocation();
  const basePath = location.pathname;
  const validRoute = true; // This should be replaced with actual logic to check if the route is valid
  return validRoute || basePath === "/unauthorized" ? (
    <>
      <ContainerComponent> {element}</ContainerComponent>
    </>
  ) : (
    <Navigate to="/unauthorized" />
  );
};

function RouterComponent() {
  const routes = useRoutes([
    {
      path: "/",
      element: <RouteWrapper element={<Outlet />} />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
          caseSensitive: true,
        },
        {
          path: "/home",
          element: <Dashboard />,
          caseSensitive: true,
        },
        {
          path: "unauthorized",
          element: <UnAuthorizedAccess />,
          caseSensitive: true,
        },
        {
          path: "/*",
          element: <Dashboard />,
        },
      ],
    },
  ]);

  return routes;
}

export default RouterComponent;
