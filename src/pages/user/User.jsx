import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  LocationOn,
  DateRange,
} from "@material-ui/icons";
import WcOutlinedIcon from "@material-ui/icons/WcOutlined";
import ContactMailOutlinedIcon from "@material-ui/icons/ContactMailOutlined";
import InvertColorsOutlinedIcon from "@material-ui/icons/InvertColorsOutlined";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import RateReviewIcon from "@material-ui/icons/RateReview";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./user.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function User() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/users/find/${userId}`,
          {
            headers: {
              Authorization:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        if (data) {
          const {
            user_address,
            user_gender,
            user_phone,
            user_DOB_DATE,
            user_blood_group,
            user_status,

            user_displayname,
            BSG_card_number,
            createdAt,
            user_cnic,
            user_email,
            user_district,

            education,
            skills,
            badges,
            work_experience,
          } = data;
          console.log(data);
          setUser({
            user_address: user_address,
            user_gender: user_gender,
            user_phone: user_phone,
            user_DOB_DATE: user_DOB_DATE,
            user_blood_group: user_blood_group,
            user_status: user_status,
            user_displayname: user_displayname,
            BSG_card_number: BSG_card_number,
            createdAt: createdAt,
            user_cnic: user_cnic,
            user_email: user_email,
            user_district: user_district,
            institution_name: education,
            skills: skills,
            work_experience: work_experience,
            badges: badges,
          });
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    getUserData();
  }, [userId]);

  const notify = (text) =>
    toast(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  var ts = new Date(user.createdAt);
  var dob = new Date(user.user_DOB_DATE);

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">User Detail</h1>
      </div>
      <div className="userTitleContainer">
        <button
          className="createUser"
          style={{ marginLeft: "10px", marginBottom: "-5px" }}
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <Link to={"/edituser/" + userId}>
          <button className="editUser">Edit User</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow" style={{ marginRight: 10 }}>
          <div className="userShowTop">
            <div className="userShowTopTitle">
              <span className="userShowUsername" style={{ fontSize: "24px" }}>
                {user.user_displayname}
              </span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            {/* <div className="userShowInfo">
              <ExitToAppOutlinedIcon className="userShowIcon" />
              <span className="userShowInfoTitle">
                <b>User Login:</b> {user.user_login}
              </span>
            </div> */}
            <div className="userShowInfo">
              <RateReviewIcon className="userShowIcon" />
              <span className="userShowInfoTitle">
                <b>BSG Card Number:</b> {user.BSG_card_number}
              </span>
            </div>
            <div className="userShowInfo">
              <ContactMailOutlinedIcon className="userShowIcon" />
              <span className="userShowInfoTitle">
                <b>CNIC:</b> {user.user_cnic}
              </span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">
                <b>District:</b> {user.user_district}
              </span>
            </div>
            <div className="userShowInfo">
              <LocationOn className="userShowIcon" />
              <span className="userShowInfoTitle">
                <b>Address:</b> {user.user_address}
              </span>
            </div>
            <div className="userShowInfo">
              <WcOutlinedIcon className="userShowIcon" />
              <span className="userShowInfoTitle">
                <b>Gender:</b> {user.user_gender}
              </span>
            </div>
            <div className="userShowInfo">
              <DateRange className="userShowIcon" />
              <span className="userShowInfoTitle">
                <b>Date Of Birth:</b>{" "}
                {dob.toDateString() === "Invalid Date"
                  ? ""
                  : dob.toDateString()}
                {console.log(dob)}
              </span>
            </div>
            <div className="userShowInfo">
              <InvertColorsOutlinedIcon className="userShowIcon" />
              <span className="userShowInfoTitle">
                <b>Blood Group:</b> {user.user_blood_group}
              </span>
            </div>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">
                <b>Status:</b> {user.user_status}
              </span>
            </div>
            {/* <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">
                <b>Registered on:</b> {ts.toDateString()}
              </span>
            </div> */}
          </div>
        </div>
        <div className="userShow" style={{ marginLeft: 10 }}>
          <br />
          <div className="userShowBottom">
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.user_email}</span>
            </div>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+92 {user.user_phone}</span>
            </div>
            <span className="userShowTitle">Education Details</span>
            <div className="userShowInfo">
              <WorkOutlineOutlinedIcon className="userShowIcon" />
              <span className="userShowInfoTitle">
                <b>Institution Details:</b>
              </span>
            </div>
            <div
              className="userShowInfo"
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                marginTop: "-15px",
              }}
            >
              <ul>
                {user.institution_name?.map((item, index) => (
                  <li style={{ marginLeft: -15 }} key={index}>
                    {" "}
                    {item.institution_name}
                  </li>
                ))}
              </ul>
            </div>
            <span className="userShowTitle">Skills Details</span>
            <div
              className="userShowInfo"
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                marginTop: "5px",
              }}
            >
              <ul>
                {user.skills &&
                  user.skills.map((item, index) => (
                    <li style={{ marginLeft: -15 }} key={index}>
                      {" "}
                      {item.skills_name}
                    </li>
                  ))}
              </ul>
            </div>
            <span className="userShowTitle">Work Experience Details</span>
            <div className="userShowInfo" style={{ marginTop: "-10px" }}>
              <ul style={{ width: 360 }}>
                {user.work_experience?.map((item, index) => {
                  var start = new Date(item.company_start_date);
                  var end = new Date(item.company_end_date);
                  return (
                    <div
                      style={{
                        marginLeft: -35,
                        marginTop: 15,
                        marginBottom: 15,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                      key={index}
                    >
                      <div>
                        <b>{index + 1}</b>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginLeft: 15,
                        }}
                      >
                        <p
                          style={{
                            width: 220,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            margin: 0,
                            fontWeight: 500,
                          }}
                        >
                          {item.company_name}
                        </p>
                        <p style={{ fontSize: 12, margin: 0 }}>
                          {start.toDateString()} <b>-</b> {end.toDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </ul>
            </div>
            <span className="userShowTitle">Badges Details</span>
            <div
              className="userShowInfo"
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                marginTop: "-5px",
              }}
            >
              <ul>
                {user.badges &&
                  user.badges.map((item, index) => (
                    <li key={index} className="userShowInfoTitle">
                      {" "}
                      {item.name}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
