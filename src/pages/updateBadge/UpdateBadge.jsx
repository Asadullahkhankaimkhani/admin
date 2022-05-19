import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./updateBadge.css";

export default function UpdateBadge() {
  let navigate = useNavigate();
  const { badgeId } = useParams();
  const [badge, setBadge] = useState({});
  const [updatedBadgeName, setUpdatedBadgeName] = useState("");
  const [formData, setFormData] = useState("");

  useEffect(() => {
    const getBadgeData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/badge/` + badgeId,
          {
            headers: {
              Authorization:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        if (data) {
          setBadge({
            name: data.name,
            image: data.image,
          });
          setUpdatedBadgeName(data.name);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getBadgeData();
  }, [badgeId]);

  const upload = ({ target: { files } }) => {
    let data = new FormData();
    data.append("badgeImage", files[0]);
    data.append("name", updatedBadgeName);
    setFormData(data);
  };

  const updateBadge = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/badge/update/` + badgeId,
        formData,
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      if (data) {
        console.log("User Updated");
      }
    } catch (err) {
      console.log(err.response.data);
    }
    navigate("/badges");
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">Update Badge</h1>
      <form
        className="newUserForm"
        encType="multipart/form-data"
        onSubmit={updateBadge}
      >
        <div className="newUserItem">
          <label>Badge Name</label>
          <input
            type="text"
            placeholder={badge.name}
            name="name"
            value={updatedBadgeName}
            onChange={(e) => {
              setUpdatedBadgeName(e.target.value);
            }}
          />
        </div>
        <div className="newUserItem">
          <label>Badge Image</label>
          <div>
            <input type="file" onChange={upload} />
          </div>
        </div>
        <button type="submit" className="newUserButton">
          Update
        </button>
      </form>
    </div>
  );
}
