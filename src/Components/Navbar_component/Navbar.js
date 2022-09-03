import React from "react";
import { Link } from "react-router-dom";
import { AiOutlinePieChart } from "react-icons/ai";
import { AiOutlineHistory } from "react-icons/ai";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { ImMenu } from "react-icons/im";
import "./Navbar.css";
import { useLocation } from "react-router-dom";

const Navbar = () => {

  // used for storing route location for menu bar highlighting feature
  const location = useLocation();

  return (
    <div>
      <nav className="Navigation_Bar">
        <div className="navbar-heading">
          <div className="icon-heading">
            <ImMenu className="menu-icon" />
          </div>{" "}
          <div className="text-heading">
            <h1>MENU</h1>
          </div>
        </div>
        <ul className="list-options">
          <hr></hr>
          <div className="Createlist-option">
            <li>
              <Link
                className={
                  location.pathname === "/Login/Createlist"
                    ? "selected"
                    : "link-style"
                }
                to="/Login/Createlist"
              >
                {" "}
                <div className="icon">
                  <AiOutlineUnorderedList className="create-icon" />
                </div>
                <div className="text">CREATE LIST</div>
              </Link>
            </li>
          </div>
          <hr></hr>
          <div className="Statistics-option">
            <li>
              <Link
                className={
                  location.pathname === "/Login/Statistics"
                    ? "selected"
                    : "link-style"
                }
                to="/Login/Statistics"
              >
                {" "}
                <div className="icon">
                  <AiOutlinePieChart className="stats-icon" />
                </div>
                <div className="text">STATISTICS</div>
              </Link>
            </li>
          </div>
          <hr></hr>
          <div className="History-option">
            <li>
              <Link
                className={
                  location.pathname === "/Login/History"
                    ? "selected"
                    : "link-style"
                }
                to="/Login/History"
              >
                <div className="icon">
                  <AiOutlineHistory className="history-icon" />
                </div>
                <div className="text">HISTORY</div>
              </Link>
            </li>
          </div>
          <hr></hr>
        </ul>
        <div className="navbar-image"></div>
      </nav>
    </div>
  );
};

export default Navbar;
