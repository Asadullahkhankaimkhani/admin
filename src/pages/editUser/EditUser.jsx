import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./user.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { DatePicker, Select } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import InputMask from "react-input-mask";
const { RangePicker } = DatePicker;
const { Option } = Select;

export default function User() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [badgeInfo, setBadgeInfo] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [updatedUser_displayname, setUpdatedUser_displayname] = useState("");
  const [updatedUser_address, setUpdatedUser_address] = useState("");
  const [updatedUser_phone, setUpdatedUser_phone] = useState("");
  const [updatedUser_DOB_Date, setUpdatedUser_DOB_Date] = useState("");
  const [updatedUser_blood_group, setUpdatedUser_blood_group] = useState("");
  const [updatedUser_status, setUpdatedUser_status] = useState("");
  const [updatedUser_district, setUpdatedUser_district] = useState("");
  const [updatedUser_email, setUpdatedUser_email] = useState("");
  const [updatedUser_cnic, setUpdatedUser_cnic] = useState("");
  const [updatedInstitution_name, setUpdatedInstitution_name] = useState([]);
  const [updatedSkills_name, setUpdatedSkills_name] = useState([]);
  const [updatedWork_Experience, setUpdatedWork_Experience] = useState([]);
  const [updatedBadges, setUpdatedBadges] = useState([]);
  const [newInstitution, setNewInstitution] = useState("");
  const [newSkills, setNewSkills] = useState("");
  const [companyRadio, setCompanyRadio] = useState();
  const [genderRadio, setGenderRadio] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [dateValue, setDateValue] = useState();
  const [companyStart, setCompanyStart] = useState();
  const [companyEnd, setCompanyEnd] = useState();
  const [newBadge, setNewBadge] = useState("");
  const [currentlyWorking, setCurrentlyWorking] = useState(false);

  const [loading, setLoading] = useState(false);
  const [companyLoading, setComapanyLoading] = useState(false);
  const [educationLoading, setEducationLoading] = useState(false);
  const [proLoading, setProLoading] = useState(false);
  const [badgeLoading, setBadgeLoading] = useState(false);

  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users/find/${userId}`,
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
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
        setUpdatedInstitution_name(education);
        setUpdatedSkills_name(skills);
        setUpdatedWork_Experience(work_experience);
        setUpdatedBadges(badges);
        setUpdatedUser_address(user_address);
        setGenderRadio(user_gender);
        setUpdatedUser_phone(user_phone);
        setUpdatedUser_DOB_Date(user_DOB_DATE);
        setDateValue(user_DOB_DATE);
        setUpdatedUser_blood_group(user_blood_group);
        setUpdatedUser_status(user_status);
        setUpdatedUser_displayname(user_displayname);
        setUpdatedUser_district(user_district);
        setUpdatedUser_email(user_email);
        setUpdatedUser_cnic(user_cnic);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(updatedUser_cnic);
  useEffect(() => {
    getUserData();
    const getBadgesList = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/badges`,
          {
            headers: {
              Authorization:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        if (data) {
          setBadgeInfo(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getBadgesList();
    getUserData();
  }, [userId]);

  const updateUser = async () => {
    const mailformat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    const checkName = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
    // var checkCnic = /^[0-9]{5}[-][0-9]{7}[-][0-9]$/;

    if (!updatedUser_displayname.match(checkName)) {
      return notify("Display name can only be alphabets");
    } else if (!updatedUser_email.match(mailformat)) {
      return notify("You have entered an invalid email address!");
    } else if (updatedUser_district.length < 1) {
      return notify("Please select a district!");
    } else {
      try {
        setLoading(true);
        const { data } = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/users/` + userId,
          {
            user_address: updatedUser_address,
            user_gender: genderRadio,
            user_phone: updatedUser_phone,
            user_DOB_DATE: dateValue,
            user_blood_group: updatedUser_blood_group,
            user_status: updatedUser_status,
            user_displayname: updatedUser_displayname,
            user_district: updatedUser_district,
            user_email: updatedUser_email,
            user_cnic: updatedUser_cnic,
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
          notify("User Updated");
          setLoading(false);
        }

        navigate("/users");
      } catch (err) {
        notify(err.response.data);
        setLoading(false);
      }
    }
  };
  const educationHandler = async (e) => {
    e.preventDefault();
    try {
      setEducationLoading(true);
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/user/education/` + userId,
        {
          education: [
            {
              institution_name: newInstitution,
            },
          ],
        },
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );

      if (data) {
        notify("Added New Institution");
        setNewInstitution("");
        setRefresh(!refresh);
        setEducationLoading(false);
      }
      getUserData();
    } catch (err) {
      notify(err);
      setEducationLoading(false);
    }
  };
  const educationDeleteHandler = async (id) => {
    try {
      setEducationLoading(true);
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/user/education/del/${userId}`,
        {
          _id: id,
        },
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      if (data) {
        notify("Deleted Institution");
        setRefresh(!refresh);
        setEducationLoading(false);
      }
      getUserData();
    } catch (err) {
      notify(err);
      setEducationLoading(false);
    }
  };
  const skillsHandler = async (e) => {
    e.preventDefault();
    try {
      setProLoading(true);
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/user/skills/${userId}`,
        {
          skills: [
            {
              skills_name: newSkills,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).accessToken
            }`,
          },
        }
      );
      if (data) {
        notify("Added New Skill");
        setNewSkills("");
        setRefresh(!refresh);
        setProLoading(false);
      }
      getUserData();
    } catch (err) {
      notify(err);
      setProLoading(false);
    }
  };
  const skillsDeleteHandler = async (id) => {
    try {
      setProLoading(true);
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/user/skills/del/${userId}`,
        {
          _id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).accessToken
            }`,
          },
        }
      );
      if (data) {
        notify("Deleted Skill");
        setRefresh(!refresh);
        setProLoading(false);
      }
      getUserData();
    } catch (err) {
      notify(err);
      setLoading(false);
    }
  };
  const companyHandler = async (e) => {
    e.preventDefault();
    if (currentlyWorking === true) {
      setComapanyLoading(true);
      try {
        const { data } = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/user/work/${userId}`,
          {
            company_name: companyName,
            company_start_date: companyStart,
            current: currentlyWorking,
          },
          {
            headers: {
              Authorization:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        notify("Added New Work Experience");
        setComapanyLoading(false);
        getUserData();
      } catch (err) {
        console.log(err);
        notify(err);
        setComapanyLoading(false);
      }
    } else {
      try {
        setComapanyLoading(true);
        const { data } = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/user/work/${userId}`,
          {
            company_name: companyName,
            company_start_date: companyStart,
            company_end_date: companyEnd,
            current: currentlyWorking,
          },
          {
            headers: {
              Authorization:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        notify("Added New Work Experience");
        setCompanyName("");
        setComapanyLoading(false);
        getUserData();
      } catch (err) {
        console.log(err);
        notify(err);
        setComapanyLoading(false);
      }
    }

    // if (companyStart && companyEnd != null) {
    //   try {
    //     const { data } = await axios.put(
    //       `${process.env.REACT_APP_BACKEND_URL}/profile/work/${userId}`,
    //       {
    //         company_name: companyName,
    //         company_start_date: companyStart,
    //         company_end_date: companyEnd,
    //         current: companyRadio,
    //       },
    //       {
    //         headers: {
    //           Authorization:
    //             "Bearer " +
    //             JSON.parse(localStorage.getItem("user")).accessToken,
    //         },
    //       }
    //     );
    //     if (data) {
    //       notify("Added New Work Experience");
    //       setNewSkills("");
    //       setRefresh(!refresh);
    //     }
    //   } catch (err) {
    //     notify(err);
    //   }
    // } else {
    //   notify("Please add company start & end date");
    // }
  };
  const workDeleteHandler = async (id) => {
    try {
      setComapanyLoading(true);
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/user/work/del/` + userId,
        {
          _id: id,
        },
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      if (data) {
        notify("Deleted Work Experience");
        setRefresh(!refresh);
        setComapanyLoading(false);
      }
      getUserData();
    } catch (err) {
      notify(err);
      setComapanyLoading(false);
    }
  };
  const badgeHandler = async (e) => {
    e.preventDefault();
    try {
      setBadgeInfo(true);
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/user/badge/` + userId,
        {
          name: newBadge,
        },
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      if (data) {
        notify("Assigned New Badge");
        setNewSkills("");
        setRefresh(!refresh);
        setBadgeLoading(false);
      }
    } catch (err) {
      notify(err);
      setBadgeLoading(false);
    }
  };
  const badgeDeleteHandler = async (id) => {
    try {
      setBadgeLoading(true);
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/user/badge/del/` + userId,
        {
          _id: id,
        },
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      if (data) {
        notify("Unassigned Badge");
        setRefresh(!refresh);
        setBadgeLoading(false);
      }
    } catch (err) {
      notify(err);
      setLoading(false);
    }
  };

  // check for dupicate skills
  const checkDuplicate = (skill) => {
    let duplicate = false;
    skills.forEach((element) => {
      if (element.name === skill) {
        duplicate = true;
      }
    });
    return duplicate;
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
    });

  // var ts = new Date(user.createdAt);
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User Information</h1>
      </div>
      <div className="userTitleContainer">
        <button className="editUser" onClick={() => navigate(-1)}>
          {" "}
          Back
        </button>

        <Link to={`/user/${userId}`}>
          <button className="editUser">View User Details</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow" style={{ marginRight: 10 }}>
          <span className="userShowTitle">Account Details</span>
          <div className="userShowBottom">
            <div className="userUpdateItem">
              <label>
                <b>User Display Name</b>
              </label>
              <input
                type="text"
                value={updatedUser_displayname}
                placeholder="Your Name"
                onChange={(e) => setUpdatedUser_displayname(e.target.value)}
                className="userUpdateInput"
              />
            </div>
            <div className="userUpdateItem">
              <label>
                <b>District</b>
              </label>
              <Select
                defaultValue="Select User District"
                value={updatedUser_district}
                required
                style={{ width: 250 }}
                onChange={(e) => setUpdatedUser_district(e)}
              >
                {districtList.map((item, i) => (
                  <Option key={i} value={item.title}>
                    {item.title}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="userUpdateItem">
              <label>
                <b>Address</b>
              </label>
              <input
                type="text"
                value={updatedUser_address}
                placeholder="Your Address"
                onChange={(e) => setUpdatedUser_address(e.target.value)}
                className="userUpdateInput"
              />
            </div>
            <div className="userUpdateItem">
              <label>
                <b>Gender</b>
              </label>
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
                <b>Date Of Birth</b>
              </label>

              {updatedUser_DOB_Date ? (
                <DatePicker
                  showTime={false}
                  style={{ width: 250 }}
                  value={moment(dateValue)}
                  onChange={(e) => setDateValue(e)}
                />
              ) : (
                <DatePicker
                  showTime={false}
                  style={{ width: 250 }}
                  onChange={(e) => setDateValue(e)}
                />
              )}
            </div>
            <div className="userUpdateItem">
              <label>
                <b>Blood Group</b>
              </label>
            </div>
            <div className="userUpdateItem" style={{ flexDirection: "row" }}>
              <Select
                defaultValue="Select Blood Group"
                value={
                  updatedUser_blood_group
                    ? updatedUser_blood_group
                    : "Select Blood Group"
                }
                required
                style={{ width: 250 }}
                onChange={(e) => setUpdatedUser_blood_group(e)}
              >
                {bloodGroup.map((item, i) => (
                  <Option key={i} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="userUpdateItem">
              <label>
                <b>Status</b>
              </label>

              <Select
                defaultValue="User Status"
                value={updatedUser_status}
                required
                style={{ width: 250 }}
                onChange={(e) => setUpdatedUser_status(e)}
              >
                <Option value="Alive">Alive</Option>
                <Option value="Deceased">Deceased</Option>
              </Select>
            </div>

            <br />
            <span className="userShowTitle">Contact Details</span>

            <div className="userUpdateItem">
              <label>
                <b>Email</b>
              </label>
              <input
                type="email"
                value={updatedUser_email}
                placeholder="Your Email"
                className="userUpdateInput"
                onChange={(e) => setUpdatedUser_email(e.target.value)}
              />
            </div>
            <div className="userUpdateItem">
              <label>
                <b>Phone Number</b>
              </label>
              <input
                type="number"
                value={updatedUser_phone}
                placeholder="Your Phone Number"
                className="userUpdateInput"
                onChange={(e) => setUpdatedUser_phone(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="userShow" style={{ marginLeft: 10 }}>
          <div className="userShowBottom" style={{ marginTop: 0 }}>
            <span className="userShowTitle">Education Details</span>
            <br />
            <div className="userUpdateItem" style={{ marginTop: 20 }}>
              <label>
                <b>Institution Details</b>
              </label>
              <div className="userUpdateItem" style={{ flexDirection: "row" }}>
                <form onSubmit={educationHandler}>
                  <Select
                    defaultValue="Select a Institution"
                    required
                    style={{ width: 250 }}
                    onChange={(e) => setNewInstitution(e)}
                  >
                    {education.map((item, i) => (
                      <Option key={i} value={item.title}>
                        {item.title}
                      </Option>
                    ))}
                  </Select>
                  <button
                    className="addItem"
                    type="submit"
                    style={{ height: 32 }}
                  >
                    {educationLoading ? (
                      <LoadingOutlined spin style={{ fontSize: 24 }} />
                    ) : (
                      "Add Institution"
                    )}
                  </button>
                </form>
              </div>
            </div>
            <div
              className="userShowInfo"
              style={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <ul style={{ width: 250 }}>
                {updatedInstitution_name.map((item, index) => (
                  <li
                    style={{
                      marginLeft: -35,
                      height: 30,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    key={index}
                  >
                    <p
                      style={{
                        width: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <b>{index + 1}</b> {item.institution_name}
                    </p>
                    <HighlightOffIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => educationDeleteHandler(item._id)}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <span className="userShowTitle">Profession Details</span>
            <div className="userUpdateItem" style={{ marginTop: 15 }}>
              <div className="userUpdateItem" style={{ flexDirection: "row" }}>
                <form onSubmit={skillsHandler}>
                  <Select
                    defaultValue="Add Profession"
                    required
                    style={{ width: 250 }}
                    onChange={(e) => setNewSkills(e)}
                  >
                    {skills.map((item, i) => (
                      <Option key={i} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                  <button
                    className="addItem"
                    type="submit"
                    style={{ height: 32 }}
                  >
                    {proLoading ? (
                      <LoadingOutlined spin style={{ fontSize: 24 }} />
                    ) : (
                      "Add Details"
                    )}
                  </button>
                </form>
              </div>
            </div>
            <div
              className="userShowInfo"
              style={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <ul style={{ width: 250 }}>
                {updatedSkills_name.map((item, index) => (
                  <li
                    style={{
                      marginLeft: -35,
                      height: 30,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    key={index}
                  >
                    <p
                      style={{
                        width: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <b>{index + 1}</b> {item.skills_name}
                    </p>
                    <HighlightOffIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => skillsDeleteHandler(item._id)}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <span className="userShowTitle">Work Experience Details</span>
            <form onSubmit={companyHandler}>
              <div className="userUpdateItem">
                <label>
                  <b>Company Name</b>
                </label>
                <input
                  type="text"
                  value={companyName}
                  required
                  placeholder="Add Company Name"
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>
                  <b>Start Date</b>
                </label>
                <DatePicker
                  allowEmpty={false}
                  showTime={false}
                  style={{ width: 250 }}
                  onChange={(e) => setCompanyStart(e)}
                />
              </div>
              <div className="userUpdateItem">
                <label>
                  <b>End Date</b>
                </label>
                <DatePicker
                  showTime={false}
                  style={{ width: 250 }}
                  onChange={(e) => setCompanyEnd(e)}
                  disabled={currentlyWorking}
                />
              </div>

              <div className="userUpdateItem">
                {/* <label>
                  <b>Currently Working?</b>
                </label> */}
                <label className="containerRadio">
                  Currently Working
                  <input
                    type="checkbox"
                    value={currentlyWorking}
                    name="work"
                    onChange={() => setCurrentlyWorking(!currentlyWorking)}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
              <br />
              <button
                className="addItem"
                style={{ padding: "5px 25px" }}
                type="submit"
              >
                {companyLoading ? (
                  <LoadingOutlined spin style={{ fontSize: 24 }} />
                ) : (
                  "Add Details"
                )}
              </button>
            </form>
            <div className="userUpdateItem" style={{ marginTop: 25 }}>
              <label>
                <b>Companies Details</b>
              </label>
            </div>
            <div className="userShowInfo" style={{ marginTop: "-10px" }}>
              <ul style={{ width: 360 }}>
                {updatedWork_Experience.map((item, index) => {
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
                          {start.toDateString()} <b>-</b>{" "}
                          {item.current ? "Present" : end.toDateString()}{" "}
                        </p>

                        {/* <p style={{ fontSize: 12, margin: 0 }}>
                          {item.current ? "Employed" : "Unemployed"}
                        </p> */}
                      </div>
                      <div>
                        <HighlightOffIcon
                          style={{ cursor: "pointer", marginBottom: -5 }}
                          onClick={() => workDeleteHandler(item._id)}
                        />
                      </div>
                    </div>
                  );
                })}
              </ul>
            </div>

            {/* <span className="userShowTitle">Badges Details</span>
            <br />
            <br />
            <label>
              <b>Choose a badge:</b>
            </label>
            <div className="userUpdateItem" style={{ flexDirection: "row" }}>
              <form onSubmit={badgeHandler}>
                <Select
                  defaultValue="Select a Badge"
                  required
                  style={{ width: 250 }}
                  onChange={(e) => setNewBadge(e)}
                >
                  {badgeInfo.map((item, i) => (
                    <Option key={i} value={item.name}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
                <button
                  className="addItem"
                  type="submit"
                  style={{ height: 32 }}
                >
                  {badgeLoading ? (
                    <LoadingOutlined spin style={{ fontSize: 24 }} />
                  ) : (
                    "Assign Badge"
                  )}
                </button>
              </form>
            </div> */}
            {/* <div className="userShowInfo" style={{ marginTop: "-10px" }}>
              <ul style={{ width: 360 }}>
                {updatedBadges.map((item, index) => {
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
                          {item.name}
                        </p>
                      </div>
                      <div>
                        <HighlightOffIcon
                          style={{ cursor: "pointer", marginBottom: -5 }}
                          onClick={() => badgeDeleteHandler(item._id)}
                        />
                      </div>
                    </div>
                  );
                })}
              </ul>
            </div> */}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="addItem"
          style={{
            padding: "5px 25px",
            marginTop: 25,
            width: 250,
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => updateUser()}
        >
          {loading ? (
            <LoadingOutlined spin style={{ fontSize: 24 }} />
          ) : (
            "Update User"
          )}
        </button>
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

const bloodGroup = [
  { name: "A+" },
  { name: "A-" },
  { name: "B+" },
  { name: "B-" },
  { name: "O+" },
  { name: "O-" },
  { name: "AB+" },
  { name: "AB-" },
];

const education = [
  { title: "1" },
  { title: "2" },
  { title: "3" },
  { title: "4" },
  { title: "5" },
  { title: "6" },
  { title: "7" },
  { title: "8" },
  { title: "SSC PART 1" },
  { title: "SSC PART 2" },
  { title: "HSC PART 1" },
  { title: "HSC PART 2" },
  { title: "DAE" },
  { title: "BTECH" },
  { title: "BSC" },
  { title: "BS" },
  { title: "BA" },
  { title: "BCOM" },
  { title: "BBA" },
  { title: "MTECH" },
  { title: "MSC" },
  { title: "MS" },
  { title: "MA" },
  { title: "MCOM" },
  { title: "MBA" },
  { title: "DOCTORATE" },
];

const skills = [
  "Academic librarian",
  "Accountant",
  "Accounting technician",
  "Actuary",
  "Adult nurse",
  "Advertising account executive",
  "Advertising account planner",
  "Advertising copywriter",
  "Advice worker",
  "Advocate (Scotland)",
  "Aeronautical engineer",
  "Agricultural consultant",
  "Agricultural manager",
  "Aid worker/humanitarian worker",
  "Air traffic controller",
  "Airline cabin crew",
  "Amenity horticulturist",
  "Analytical chemist",
  "Animal nutritionist",
  "Animator",
  "Archaeologist",
  "Architect",
  "Architectural technologist",
  "Archivist",
  "Armed forces officer",
  "Aromatherapist",
  "Art therapist",
  "Arts administrator",
  "Auditor",
  "Automotive engineer",
  "Barrister",
  "Barrister’s clerk",
  "Bilingual secretary",
  "Biomedical engineer",
  "Biomedical scientist",
  "Biotechnologist",
  "Brand manager",
  "Broadcasting presenter",
  "Building control officer/surveyor",
  "Building services engineer",
  "Building surveyor",
  "Camera operator",
  "Careers adviser (higher education)",
  "Careers adviser",
  "Careers consultant",
  "Cartographer",
  "Catering manager",
  "Charities administrator",
  "Charities fundraiser",
  "Chemical (process) engineer",
  "Child psychotherapist",
  "Children's nurse",
  "Chiropractor",
  "Civil engineer",
  "Civil Service administrator",
  "Clinical biochemist",
  "Clinical cytogeneticist",
  "Clinical microbiologist",
  "Clinical molecular geneticist",
  "Clinical research associate",
  "Clinical scientist - tissue typing",
  "Clothing and textile technologist",
  "Colour technologist",
  "Commercial horticulturist",
  "Commercial/residential/rural surveyor",
  "Commissioning editor",
  "Commissioning engineer",
  "Commodity broker",
  "Communications engineer",
  "Community arts worker",
  "Community education officer",
  "Community worker",
  "Company secretary",
  "Computer sales support",
  "Computer scientist",
  "Conference organiser",
  "Consultant",
  "Consumer rights adviser",
  "Control and instrumentation engineer",
  "Corporate banker",
  "Corporate treasurer",
  "Counsellor",
  "Courier/tour guide",
  "Court reporter/verbatim reporter",
  "Credit analyst",
  "Crown Prosecution Service lawyer",
  "Crystallographer",
  "Curator",
  "Customs officer",
  "Cyber security specialist",
  "Dance movement therapist",
  "Data analyst",
  "Data scientist",
  "Data visualisation analyst",
  "Database administrator",
  "Debt/finance adviser",
  "Dental hygienist",
  "Dentist",
  "Design engineer",
  "Dietitian",
  "Diplomatic service",
  "Doctor (general practitioner, GP)",
  "Doctor (hospital)",
  "Dramatherapist",
  "Economist",
  "Editorial assistant",
  "Education administrator",
  "Electrical engineer",
  "Electronics engineer",
  "Employment advice worker",
  "Energy conservation officer",
  "Engineering geologist",
  "Environmental education officer",
  "Environmental health officer",
  "Environmental manager",
  "Environmental scientist",
  "Equal opportunities officer",
  "Equality and diversity officer",
  "Ergonomist",
  "Estate agent",
  "European Commission administrators",
  "Exhibition display designer",
  "Exhibition organiser",
  "Exploration geologist",
  "Facilities manager",
  "Field trials officer",
  "Financial manager",
  "Firefighter",
  "Fisheries officer",
  "Fitness centre manager",
  "Food scientist",
  "Food technologist",
  "Forensic scientist",
  "Geneticist",
  "Geographical information systems manager",
  "Geomatics/land surveyor",
  "Government lawyer",
  "Government research officer",
  "Graphic designer",
  "Health and safety adviser",
  "Health and safety inspector",
  "Health promotion specialist",
  "Health service manager",
  "Health visitor",
  "Herbalist",
  "Heritage manager",
  "Higher education administrator",
  "Higher education advice worker",
  "Homeless worker",
  "Horticultural consultant",
  "Hotel manager",
  "Housing adviser",
  "Human resources officer",
  "Hydrologist",
  "Illustrator",
  "Immigration officer",
  "Immunologist",
  "Industrial/product designer",
  "Information scientist",
  "Information systems manager",
  "Information technology/software trainers",
  "Insurance broker",
  "Insurance claims inspector",
  "Insurance risk surveyor",
  "Insurance underwriter",
  "Interpreter",
  "Investment analyst",
  "Investment banker - corporate finance",
  "Investment banker – operations",
  "Investment fund manager",
  "IT consultant",
  "IT support analyst",
  "Journalist",
  "Laboratory technician",
  "Land-based engineer",
  "Landscape architect",
  "Learning disability nurse",
  "Learning mentor",
  "Lecturer (adult education)",
  "Lecturer (further education)",
  "Lecturer (higher education)",
  "Legal executive",
  "Leisure centre manager",
  "Licensed conveyancer",
  "Local government administrator",
  "Local government lawyer",
  "Logistics/distribution manager",
  "Magazine features editor",
  "Magazine journalist",
  "Maintenance engineer",
  "Management accountant",
  "Manufacturing engineer",
  "Manufacturing machine operator",
  "Manufacturing toolmaker",
  "Marine scientist",
  "Market research analyst",
  "Market research executive",
  "Marketing account manager",
  "Marketing assistant",
  "Marketing executive",
  "Marketing manager (social media)",
  "Materials engineer",
  "Materials specialist",
  "Mechanical engineer",
  "Media analyst",
  "Media buyer",
  "Media planner",
  "Medical physicist",
  "Medical representative",
  "Mental health nurse",
  "Metallurgist",
  "Meteorologist",
  "Microbiologist",
  "Midwife",
  "Mining engineer",
  "Mobile developer",
  "Multimedia programmer",
  "Multimedia specialists",
  "Museum education officer",
  "Museum/gallery exhibition officer",
  "Music therapist",
  "Nanoscientist",
  "Nature conservation officer",
  "Naval architect",
  "Network administrator",
  "Nurse",
  "Nutritional therapist",
  "Nutritionist",
  "Occupational therapist",
  "Oceanographer",
  "Office manager",
  "Operational researcher",
  "Orthoptist",
  "Outdoor pursuits manager",
  "Packaging technologist",
  "Paediatric nurse",
  "Paramedic",
  "Patent attorney",
  "Patent examiner",
  "Pension scheme manager",
  "Personal assistant",
  "Petroleum engineer",
  "Pharmacist",
  "Pharmacologist",
  "Pharmacovigilance officer",
  "Photographer",
  "Physiotherapist",
  "Picture researcher",
  "Planning and development surveyor",
  "Planning technician",
  "Plant breeder",
  "Plumber",
  "Police officer",
  "Political party agent",
  "Political party research officer",
  "Practice nurse",
  "Press photographer",
  "Press sub-editor",
  "Prison officer",
  "Private music teacher",
  "Probation officer",
  "Product development scientist",
  "Production manager",
  "Programme researcher",
  "Project manager",
  "Psychologist (clinical)",
  "Psychologist (educational)",
  "Psychotherapist",
  "Public affairs consultant (lobbyist)",
  "Public affairs consultant (research)",
  "Public house manager",
  "Public librarian",
  "Public relations (PR) officer",
  "QA analyst",
  "Quality assurance manager",
  "Quantity surveyor",
  "Records manager",
  "Recruitment consultant",
  "Recycling officer",
  "Regulatory affairs officer",
  "Research chemist",
  "Research scientist",
  "Restaurant manager",
  "Retail banker",
  "Retail buyer",
  "Retail manager",
  "Retail merchandiser",
  "Retail pharmacist",
  "Sales executive",
  "Sales manager",
  "Scene of crime officer",
  "Secretary",
  "Seismic interpreter",
  "Site engineer",
  "Site manager",
  "Social researcher",
  "Social worker",
  "Software developer",
  "Soil scientist",
  "Solicitor",
  "Speech and language therapist",
  "Sports coach",
  "Sports development officer",
  "Sports therapist",
  "Statistician",
  "Stockbroker",
  "Structural engineer",
  "Systems analyst",
  "Systems developer",
  "Tax inspector",
  "Teacher (nursery/early years)",
  "Teacher (primary)",
  "Teacher (secondary)",
  "Teacher (special educational needs)",
  "Teaching/classroom assistant",
  "Technical author",
  "Technical sales engineer",
  "TEFL/TESL teacher",
  "Television production assistant",
  "Test automation developer",
  "Tour operator",
  "Tourism officer",
  "Tourist information manager",
  "Town and country planner",
  "Toxicologist",
  "Trade union research officer",
  "Trader",
  "Trading standards officer",
  "Training and development officer",
  "Translator",
  "Transportation planner",
  "Travel agent",
  "TV/film/theatre set designer",
  "UX designer",
  "Validation engineer",
  "Veterinary nurse",
  "Veterinary surgeon",
  "Video game designer",
  "Video game developer",
  "Volunteer work organiser",
  "Warehouse manager",
  "Waste disposal officer",
  "Water conservation officer",
  "Water engineer",
  "Web designer",
  "Web developer",
  "Welfare rights adviser",
  "Writer",
  "Youth worker",
];
