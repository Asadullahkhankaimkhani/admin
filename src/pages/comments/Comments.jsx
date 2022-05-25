import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { LoadingOutlined } from "@ant-design/icons";
import { Visibility, Cancel } from "@material-ui/icons";
import Link from "@material-ui/core/Link";
import { useNavigate } from "react-router-dom";
import "./modal.css";
import "./comments.css";

export default function Comments() {
  const [comment, setComment] = useState([]);
  const [currentComment, setCurrentComment] = useState("");
  const [toggleState, setToggleState] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getComments();
  }, []);

  const toggleModal = () => {
    setToggleState(!toggleState);
  };

  const getCurrentComment = (x) => {
    setCurrentComment(x);
  };

  if (toggleState) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const getComments = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/comment",
      {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
    );
    console.log(data);
    setComment(data.reverse());
  };

  const navigateToUser = () => {
    navigate("/user/" + currentComment.user._id);
  };

  const columns = [
    {
      field: "user.BSG_card_number",
      headerName: "BSG Card Number",
      width: 200,
      valueGetter: (params) => {
        return params.row.user.BSG_card_number;
      },
    },
    {
      field: "user.user_displayname",
      headerName: "Name",
      width: 250,
      valueGetter: (params) => {
        return params.row.user.user_displayname;
      },
    },
    {
      field: "comment",
      headerName: "Comment",
      width: 500,
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Visibility
              className="userListView"
              onClick={() => {
                toggleModal();
                getCurrentComment(params.row);
              }}
            />
          </>
        );
      },
    },
  ];

  if (toggleState === true) {
    return (
      <div className="modal">
        <div onClick={toggleModal} className="overlay"></div>
        <div className="modal-content">
          <span>
            <h4 className="popup-heading">BSG Card Number:</h4>{" "}
            {currentComment.user.BSG_card_number}
          </span>
          <br></br>
          <span>
            <h4 className="popup-heading">District:</h4>{" "}
            {currentComment.user.user_district}
          </span>
          <br></br>
          <span>
            <h4 className="popup-heading">Name:</h4>{" "}
            <Link onClick={navigateToUser}>
              {currentComment.user.user_displayname}
            </Link>
          </span>
          <br></br>
          <h4>Comment:</h4>
          <p>{currentComment.comment}</p>
          <Cancel className="close-modal" onClick={toggleModal} />
        </div>
      </div>
    );
  }
  // console.log(comment);
  return (
    <div className="userList">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <button
          className="createUser"
          style={{ marginLeft: "10px" }}
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
      {comment.length > 0 ? (
        <DataGrid
          rows={comment}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
          getRowId={(r) => r._id}
        />
      ) : (
        <LoadingOutlined
          spin
          style={{
            fontSize: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      )}
    </div>
  );
}
