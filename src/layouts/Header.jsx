import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";


const guestNav = [
  { to: "/", text: "Login" },
  { to: "/register", text: "Register" },
];

const teacherNav = [
  { to: "/", text: "Home" },
  { to: "/new", text: "New Homework" },
];
const studentNav = [
  { to: "/", text: "Home" },
  { to: "/profile", text: "Profile" },
];

const finalNav = (user) => {
  if (!user) {
    return guestNav;
  }
  if (user.t_code) {
    return teacherNav;
  }
  return studentNav;
};

function Header() {
  const { user, logout } = useAuth();
  const [] = useState();

  const hdlLogout = () => {
    logout()
  }
  
  return (
    <div className="flex justify-between items-center border-b-2 ">
      <div className="flex ms-2 gap-4">
        <p className="text-xl">Hello, {user ? user.firstname : "Guest"}</p>
        <input
          type="checkbox"
          value="dark"
          className="toggle theme-controller"
        />
      </div>
      <ul className="menu menu-horizontal bg-base-200 rounded-box">
        {finalNav(user).map((el) => (
          <li key={el.to}>
            <Link to={el.to}>{el.text}</Link>
          </li>
        ))}
        {user?.id && (
          <li>
            <Link to='/' onClick={hdlLogout}>Logout</Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Header;
