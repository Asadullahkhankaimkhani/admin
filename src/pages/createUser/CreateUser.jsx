import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./user.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputMask from "react-input-mask";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

export default function User() {
  const [displayName, setDisplayName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [email, setEmail] = useState("");
  const [bsgCard, setBsgCard] = useState("");
  const [cnic, setCnic] = useState("");
  const [district, setDistrict] = useState("");
  const [genderRadio, setGenderRadio] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  ///////////////////////////////////////////////////////
  const RegisterUser = async (e) => {
    var mailformat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    var checkName = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
    var checkCnic = /^[0-9]{5}[-][0-9]{7}[-][0-9]$/;

    e.preventDefault();
    if (!displayName.match(checkName)) {
      return notify("Display name can only be alphabets");
    } else if (!email.match(mailformat)) {
      return notify("You have entered an invalid email address!");
    } else if (!cnic.match(checkCnic)) {
      return notify("CNIC invalid!");
    } else if (district.length < 1) {
      return notify("Please select a district!");
    } else if (password.length < 8) {
      return notify("Your password is too short!");
    } else if (password.length > 16) {
      return notify("Your password is too long!");
    } else {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
          {
            user_displayname: displayName,
            father_name: fatherName,
            user_email: email,
            user_district: district,
            user_gender: genderRadio,
            BSG_card_number: bsgCard,
            user_cnic: cnic,
            user_pass: password,
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
            notify("User Registered!");
            setDisplayName("");
            setEmail("");
            setBsgCard("");
            setCnic("");
            setDistrict("");
            setPassword("");
            setGenderRadio("");

            navigate("/users");
          } catch (err) {
            console.log(err.message);
          }
        }
      } catch (err) {
        notify(err.message);
      }
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
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Create New User</h1>
        <br />
      </div>
      <div className="userContainer">
        <div className="userUpdate">
          <span className="userUpdateTitle">Create</span>
          <form className="userUpdateForm" onSubmit={RegisterUser}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>
                  Your Name <b style={{ color: "red" }}>*</b>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="userUpdateInput"
                  onChange={(e) => setDisplayName(e.target.value)}
                  value={displayName}
                />
              </div>
              <div className="userUpdateItem">
                <label>
                  Father Name <b style={{ color: "red" }}>*</b>
                </label>
                <input
                  type="text"
                  placeholder="Father Name"
                  className="userUpdateInput"
                  onChange={(e) => setFatherName(e.target.value)}
                  value={fatherName}
                />
              </div>
              <div className="userUpdateItem">
                <label>
                  Email <b style={{ color: "red" }}>*</b>
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="userUpdateInput"
                  value={email}
                />
              </div>
              <div className="userUpdateItem">
                <label>
                  District <b style={{ color: "red" }}>*</b>
                </label>
                <Select
                  defaultValue="Select User District"
                  value={
                    district.length < 1 ? "Select User District" : district
                  }
                  style={{ width: 250 }}
                  onChange={(e) => setDistrict(e)}
                >
                  {districtList.map((item, i) => (
                    <Option key={i} value={item.title}>
                      {item.title}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="userUpdateItem">
                <label>Gender</label>
                <label className="containerRadio">
                  Male
                  <input
                    type="radio"
                    checked={genderRadio == "Male" ? true : false}
                    name="radio"
                    value="Male"
                    onChange={(e) => setGenderRadio(e.target.value)}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="containerRadio">
                  Female
                  <input
                    type="radio"
                    checked={genderRadio == "Female" ? true : false}
                    name="radio"
                    value="Female"
                    onChange={(e) => setGenderRadio(e.target.value)}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="userUpdateItem">
                <label>
                  BSG Card Number <b style={{ color: "red" }}>*</b>
                </label>
                <input
                  type="number"
                  onChange={(e) => setBsgCard(e.target.value)}
                  placeholder="Your BSG number"
                  className="userUpdateInput"
                  value={bsgCard}
                />
              </div>
              <div className="userUpdateItem">
                <label>
                  CNIC <b style={{ color: "red" }}>*</b>
                </label>
                <InputMask
                  mask="99999-9999999-9"
                  value={cnic}
                  onChange={(e) => setCnic(e.target.value)}
                >
                  {(inputProps) => (
                    <input
                      {...inputProps}
                      className="userUpdateInput"
                      placeholder="XXXXX-XXXXXXX-X"
                      type="text"
                      disableUnderline={true}
                    />
                  )}
                </InputMask>
              </div>

              <div className="userUpdateItem">
                <label>
                  Password <b style={{ color: "red" }}>*</b>
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="set a password"
                  value={password}
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <button
                type="submit"
                className="userUpdateButton"
                style={{ backgroundColor: "lavender", color: "#555555" }}
              >
                Register
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
const districtList = [
  { title: "North" },
  { title: "Central" },
  { title: "South" },
  { title: "East" },
];
