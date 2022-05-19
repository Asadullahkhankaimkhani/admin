import { useState, useEffect } from "react";
import axios from "axios";
import "./badgesList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import { useNavigate   } from "react-router-dom";

export default function BadgesList() {
  const [badgeInfo, setBadgeInfo] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    getBadges();
  }, []);

  const getBadges = async () => {
    await axios
      .get()
      .then(({ data }) => {
        setBadgeInfo(data);
        console.log("Data has been received.");
      })
      .catch((err) => {
        console.log(err);
      });

    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/badges`, {
      headers: {
        Authorization : "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      }
    });
    setBadgeInfo(data);
  };

  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/deletebadge/${id}`, {
        headers: {
          Authorization : "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        }
      })
      .then(() => {
        console.log("Badge has been deleted.");
      })
      .catch((err) => {
        console.log(err);
      });
    getBadges();
  };

  const columns = [
    { field: "name", headerName: "Badge Name", width: 200 },
    {
      field: "image",
      headerName: "Badge Image",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <img
              src={process.env.REACT_APP_BACKEND_URL + "public/images/badges/badge-1649238156229.jpg"}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "contain",
                overflow: "hidden",
              }}
            />
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <EditIcon
            className="userListEditIcon"
            onClick={() => navigate("/updatebadge/" + params.row._id)}
              />
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <div style={{display: 'flex', flexDirection: 'row', justifyContent:'flex-end'}}>
        <Link to="/newbadge">
          <button className="createUser">Create Badge</button>
        </Link>
      </div>
      {badgeInfo.length > 0 && (
        <DataGrid
          rows={badgeInfo}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
          getRowId={(r) => r._id}
        />
      )}
    </div>
  );
}
