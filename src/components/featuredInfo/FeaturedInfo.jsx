import "./featuredInfo.css";
import PersonIcon from "@material-ui/icons/Person";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext/UserContext";
import { getUsers } from "../../context/userContext/apiCalls";
import { LoadingOutlined } from "@ant-design/icons";

export default function FeaturedInfo() {
  const { users, dispatch } = useContext(UserContext);
  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Total Users</span>
        <div className="featuredMoneyContainer">
          <PersonIcon style={{ fontSize: 34 }} />
          <span className="featuredMoney">
            {users.length > 0 ? (
              users.length
            ) : (
              <LoadingOutlined style={{ fontSize: 20 }} spin />
            )}
          </span>
        </div>
        <span className="featuredSub">
          Number value of total users in the system
        </span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Active Future Event</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">0</span>
          {/* <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span> */}
        </div>
        <span className="featuredSub">Total number of up coming events</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Bench</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">0</span>
          {/* <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span> */}
        </div>
        <span className="featuredSub">
          Number of users which are not actively assigned on any event
        </span>
      </div>
    </div>
  );
}
