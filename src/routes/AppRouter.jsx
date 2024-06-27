import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "../layouts/Header";
import LoginForm from "../pages/LoginForm";
import RegisterForm from "../pages/RegisterForm";

const guestRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={guestRouter} />;
}
