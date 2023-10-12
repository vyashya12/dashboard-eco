import { Navigate, useRoutes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import DashboardPage from "./pages/DashboardPage";
import ServerPage from "./pages/ServerPage";
import Logout from "./pages/Logout";
import BackupStatus from "./pages/BackupStatus";
import ServerDetails from "./pages/ServerDetails";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "/dashboard",
      element: <DashboardPage />,
    },
    {
      path: "/serverdetails",
      element: <ServerDetails />,
    },
    {
      path: "/",
      element: <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: <LoginPage />,
      index: true,
    },
    { path: "/logout", element: <Logout /> },
    {
      path: "/servers",
      element: <ServerPage />,
    },
    {
      path: "/backup",
      element: <BackupStatus />,
    },
    {
      path: "404",
      element: <Page404 />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
    // {
    //   element: <SimpleLayout />,
    //   children: [
    //     { element: <Navigate to="/dashboard/app" />, index: true },
    //     { path: '404', element: <Page404 /> },
    //     { path: '*', element: <Navigate to="/404" /> },
    //   ],
    // },
  ]);

  return routes;
}
