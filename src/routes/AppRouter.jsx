import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "../layouts/Header";
import LoginForm from "../pages/LoginForm";
import RegisterForm from "../pages/RegisterForm";
import useAuth from "../hooks/useAuth";
import HomeworkForm from "../pages/HomeworkForm";

const teacherRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header/>
      <Outlet />
    </>,
    children: [
      {index: true, element : <p>Teacher Home</p>},
      {path: '/new', element : <HomeworkForm />},
      {path: '*', element : <p>Page not found</p>},
    ]
  }
])

const studentRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header/>
      <Outlet />
    </>,
    children: [
      {index: true, element : <p>Student Home</p>},
      {path: '/profile', element : <p>Student Profile</p>},
      {path: '*', element : <p>Page not found</p>},
    ]
  }
])

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
      {path: '*', element : <p>Page not found</p>},
    ],
  },
]);

const finalRouter = (user) => {
  if(!user) { return guestRouter}
  if(user.t_code) { return teacherRouter}
  return studentRouter
}

export default function AppRouter() {
  const {user} = useAuth()
  return <RouterProvider router={finalRouter(user)} />;
}
