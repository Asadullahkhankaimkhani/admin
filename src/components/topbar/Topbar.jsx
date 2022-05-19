import React, { useContext } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { executeLogout } from "../../context/authContext/AuthActions";
import { AuthContext } from "../../context/authContext/AuthContext";
import GetAppIcon from '@material-ui/icons/GetApp';
import logo from '../../images/logo.png'


export default function Topbar() {
const {dispatch} = useContext(AuthContext);

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft" style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <img className="logo" height="60px" src={logo} />
          <span style={{fontWeight: 'bold', fontSize: 28, color: '#6E1AA1', marginLeft: 15}} >Buturab Scouts Group</span>
        </div>
        <div className="topRight">
          
          <div className="topbarIconContainer">
            
          <img src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" alt="" className="topAvatar" />
            <div className="options">
              <span style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}><Settings />Settings</span>
              <span style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}} onClick={()=>dispatch(executeLogout())}><GetAppIcon style={{transform: 'rotate(90deg)'}}/>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
