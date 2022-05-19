import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./newBadge.css";

export default function NewBadge() {
  let navigate = useNavigate();

  const [formData, setFormData] = useState("");
  const [info, setInfo] = useState({
    image: "",
    name: "",
  });

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const upload = ({ target: { files } }) => {
    let data = new FormData();
    data.append("badgeImage", files[0]);
    data.append("name", info.name);
    setFormData(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInfo({
      image: "",
      name: "",
    });

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/addbadge`, formData, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });

    navigate("/badges");
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Badge</h1>
      <form
        className="newUserForm"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="newUserItem">
          <label>Badge Name</label>
          <input
            type="text"
            placeholder="Brotherhood Badge"
            name="name"
            value={info.name}
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Badge Image</label>
          <div>
            <input type="file" onChange={upload} />
          </div>
        </div>
        <button type="submit" className="newUserButton">
          Create
        </button>
      </form>
    </div>
  );
}
