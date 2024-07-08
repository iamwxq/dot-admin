import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" />,
    ),
  );

  return <RouterProvider router={router} />;
};

export default Router;
