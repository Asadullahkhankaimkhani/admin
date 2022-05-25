import "./sidebar.css";
import { LineStyle, PermIdentity } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import StarsIcon from "@material-ui/icons/Stars";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
const quickMenu = [
  { title: "Users" },
  { title: "Create Users" },
  { title: "Badges" },
  { title: "Create Badges" },
];

export default function Sidebar() {
  const [active, setActive] = useState(1);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li
                className={`sidebarListItem ${active === 1 ? "active" : ""}`}
                onClick={() => {
                  if (active === 1) {
                    setActive();
                  } else {
                    setActive(1);
                  }
                }}
              >
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li
                className={`sidebarListItem ${active === 2 ? "active" : ""}`}
                onClick={() => {
                  if (active === 2) {
                    setActive();
                  } else {
                    setActive(2);
                  }
                }}
              >
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/badges" className="link">
              <li
                className={`sidebarListItem ${active === 3 ? "active" : ""}`}
                onClick={() => {
                  if (active === 3) {
                    setActive();
                  } else {
                    setActive(3);
                  }
                }}
              >
                <StarsIcon className="sidebarIcon" />
                Badges
              </li>
            </Link>
            <Link to="/comments" className="link">
              <li
                className={`sidebarListItem ${active === 4 ? "active" : ""}`}
                onClick={() => {
                  if (active === 4) {
                    setActive();
                  } else {
                    setActive(4);
                  }
                }}
              >
                <CommentOutlinedIcon className="sidebarIcon" />
                Comments
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
