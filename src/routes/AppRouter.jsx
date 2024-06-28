import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "../layouts/Header";
import LoginForm from "../pages/LoginForm";
import RegisterForm from "../pages/RegisterForm";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import HomeworkForm from "../pages/HomeworkForm";
import TeacherHome from "../pages/TeacherHome";

const teacherRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header/>
      <Outlet/>
    </>,
    children: [
      { index: true, element: <TeacherHome /> },
      { path: 'new', element: <HomeworkForm /> },
      { path: "*", element: <h1>Page not found</h1> }
    ]
  }
])
const studentRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header/>
      <Outlet/>
    </>,
    children: [
      { index: true, element: <p>Student Home</p> },
      { path: 'profile', element: <p>Student Profile</p> },
      { path: "*", element: <h1>Page not found</h1> }
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
      { path: "*", element: <Navigate to='/'/> }
    ],
  },
]);

const finalRouter = (user) => {
  if(!user) return guestRouter
  if(user.t_code) return teacherRouter
  return studentRouter
}

export default function AppRouter() {
  const {user} = useAuth()
  return <RouterProvider router={finalRouter(user)} />;
}
