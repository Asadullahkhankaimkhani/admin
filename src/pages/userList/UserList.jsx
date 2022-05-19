import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, Visibility } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext/UserContext";
import { deleteUser, getUsers } from "../../context/userContext/apiCalls";
import { useNavigate } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import { LoadingOutlined } from "@ant-design/icons";

export default function UserList() {
  const { users, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  };

  const columns = [
    { field: "BSG_card_number", headerName: "BSG Card Number", width: 200 },
    {
      field: "user",
      headerName: "Name",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="productListItem">{params.row.user_displayname}</div>
        );
      },
    },
    { field: "user_district", headerName: "District", width: 150 },
    { field: "user_cnic", headerName: "CNIC", width: 300 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <EditIcon
              className="userListEditIcon"
              onClick={() => navigate("/edituser/" + params.row._id)}
            />
            <Visibility
              className="userListView"
              onClick={() => navigate("/user/" + params.row._id)}
            />
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

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

        <Link to="/createUser">
          <button className="createUser">Create User</button>
        </Link>
      </div>

      {users.length > 0 ? (
        <DataGrid
          rows={users}
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
