import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex justify-end">
      <ul className="menu menu-horizontal bg-base-200 rounded-box">
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <a>Logout</a>
        </li>
        <li>
          <input
            type="checkbox"
            value="dark"
            className="toggle theme-controller"
          />
        </li>
      </ul>
    </div>
  );
}

export default Header;
