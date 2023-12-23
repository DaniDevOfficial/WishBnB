import { Navigate, RouterProvider, createHashRouter } from "react-router-dom";
import { HomePage } from "./HomePage";


const router = createHashRouter([

      {
        index: true, 
        element: <HomePage />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },

]);

export function RouterWrapper() {
  return <RouterProvider router={router} />;
}
