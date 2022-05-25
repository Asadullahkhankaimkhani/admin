import "./App.css";
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import BadgesList from "./pages/badgesList/BadgesList";
import UpdateBadge from "./pages/updateBadge/UpdateBadge";
import NewBadge from "./pages/newBadge/NewBadge";
import User from "./pages/user/User";
import CreateUser from "./pages/createUser/CreateUser";
import EditUser from "./pages/editUser/EditUser";
import NewUser from "./pages/newUser/NewUser";
import Home from "./pages/home/Home";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import { AuthContext } from "./context/authContext/AuthContext";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import Comments from "./pages/comments/Comments";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
`;
function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user ? <Topbar /> : null}
      <div className="container">
        {user ? <Sidebar /> : null}
        <Routes>
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <AppContainer>
                  <AccountBox />
                </AppContainer>
              )
            }
          />
          {user && (
            <>
              <Route exact path="/" element={<Home />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/user/:userId" element={<User />} />
              <Route path="/createuser" element={<CreateUser />} />
              <Route path="/edituser/:userId" element={<EditUser />} />
              <Route path="/newUser" element={<NewUser />} />
              <Route path="/badges" element={<BadgesList />} />
              <Route path="/updatebadge/:badgeId" element={<UpdateBadge />} />
              <Route path="/newbadge" element={<NewBadge />} />
              <Route path="/comments" element={<Comments />} />
            </>
          )}
          <Route
            path="*"
            element={user ? <Navigate to="/" /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
