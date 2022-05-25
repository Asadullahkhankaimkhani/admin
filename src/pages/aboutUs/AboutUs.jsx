import React from "react";
import Link from "@material-ui/core/Link";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./aboutUs.css";

function AboutUs() {
  const [about, setAbout] = useState("");
  const [appVersion, setappVersion] = useState("");

  const navigate = useNavigate();

  const updateAboutUs = async (e) => {
    e.preventDefault();
    try {
      if (appVersion && about) {
        const { data } = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/aboutus`,

          {
            about_para: about,
            app_version: appVersion,
          },
          {
            headers: {
              Authorization:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        if (data) {
          try {
            notify("Details Updated");
            about("");
            appVersion("");
          } catch (err) {
            console.log(err.message);
          }
        }
      } else if (appVersion && !about) {
        const { data } = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/aboutus`,
          {
            app_version: appVersion,
          },
          {
            headers: {
              Authorization:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        if (data) {
          try {
            notify("Details Updated");
            about("");
            appVersion("");
          } catch (err) {
            console.log(err.message);
          }
        }
      } else if (!appVersion && about) {
        const { data } = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/aboutus`,
          {
            about_para: about,
          },
          {
            headers: {
              Authorization:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        if (data) {
          try {
            notify("Details Updated");
            about("");
            appVersion("");
          } catch (err) {
            console.log(err.message);
          }
        }
      }
    } catch (err) {
      notify(err.message);
    }
  };

  const notify = (text) =>
    toast(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      // bodyStyle: {
      //   background: "linear-gradient( 58deg, #833ab4 10%, #fcb045 100%, #fd1d1d 100%)",
      //   color: "#fff"
      // }
    });

  return (
    <div className="about">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <button
          className="back"
          style={{ marginLeft: "10px" }}
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        {/* <Link to="/createUser">
          <button className="createUser">Create User</button>
        </Link> */}
      </div>

      <div className="userContainer">
        <div className="userUpdate">
          <span className="userUpdateTitle">Update App Version</span>
          <form className="userUpdateForm" onSubmit={updateAboutUs}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>
                  About Us <b style={{ color: "red" }}>*</b>
                </label>
                <textarea
                  type="text"
                  placeholder="Write about app"
                  className="userUpdateInput"
                  onChange={(e) => setAbout(e.target.value)}
                  value={about}
                />
              </div>
              <div className="userUpdateItem">
                <label>
                  Version <b style={{ color: "red" }}>*</b>
                </label>
                <input
                  type="text"
                  placeholder="1.0.0"
                  className="userUpdateInput"
                  onChange={(e) => setappVersion(e.target.value)}
                  value={appVersion}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <button
                type="submit"
                className="userUpdateButton"
                style={{ backgroundColor: "lavender", color: "#555555" }}
              >
                Update
              </button>
            </div>
          </form>
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

export default AboutUs;
