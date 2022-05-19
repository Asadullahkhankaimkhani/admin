import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users?new=true`, {
          headers: {
            Authorization: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setNewUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNewUsers();
  }, []);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Joined Members</span>
      <ul className="widgetSmList">
        {newUsers.map((user) => (
          <li className="widgetSmListItem">
            
            <div className="widgetSmUser">
            <img
              src={
                user.profilePic ||
                "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
              }
              alt=""
              className="widgetSmImg"
            />
              <span className="widgetSmUsername" style={{marginLeft: 10}}>{user.user_displayname}</span>
            </div>
            <button className="widgetSmButton" onClick={() => navigate("/user/"+ user._id)}>
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
