import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import InfoBox from "./InfoBox";

const teacherNav = [
  { to: "/", text: "Home(T)" },
  { to: "/new", text: "New Homework" },
];
const studentNav = [
  { to: "/", text: "Home(S)" },
  { to: "/profile", text: "Profile" },
];
const guestNav = [
  { to: "/", text: "Login" },
  { to: "/register", text: "Register" },
];

const finalNav = (user) => {
  if (!user) return guestNav;
  if (user.t_code) return teacherNav;
  return studentNav;
};

function Header() {
  const { user, logout } = useAuth();

  const hdlLogout = () => {
    // alert('bye')
    logout();
  };
  return (
    <div className="flex justify-between border-b-2">
      <div className="flex ms-2 items-center gap-5">
        <p className="text-xl">Hello, {user ? user.firstname : "Guest"}</p>
        <input type="checkbox" value="dark" className="toggle theme-controller" />
      </div>
      { user && <InfoBox />}
      <ul className="menu menu-horizontal bg-base-200 rounded-box">
        {finalNav(user).map((el) => (
          <li key={el.to}>
            <Link to={el.to}>{el.text}</Link>
          </li>
        ))}

        {user && (
          <li>
            <Link to="/" onClick={hdlLogout}>
              Logout
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Header;
