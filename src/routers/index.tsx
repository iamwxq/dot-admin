import { lazy } from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import type { AppRouteObject } from "#/router";

const LoginRoute: AppRouteObject = {
  path: "/login",
  Component: lazy(() => import("@/pages/sys/login/login")),
};

const NotFound: AppRouteObject = {
  path: "*",
  element: <Navigate replace to="/404" />,
};

function Router() {
  const routes = [LoginRoute, NotFound];

  const router = createBrowserRouter(routes as RouteObject[]);

  return <RouterProvider router={router} />;
};

export default Router;
