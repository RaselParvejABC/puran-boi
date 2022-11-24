import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import ErrorPage from "./components/ErrorPage";
import Home from "./routes/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default router;
