import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { LoginForm } from "./loginForm";
import { motion } from "framer-motion";
import { AccountContext } from "./accountContext";
import { ForgotPasswordForm } from "./forgotPasswordForm";
import { EnterCodeForm } from "./enterCodeForm";
import { NewPasswordForm } from "./newPasswordForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/authContext/AuthContext";

const BoxContainer = styled.div`
  width: 500px;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;

const BackDrop = styled(motion.div)`
  width: 160%;
  height: 550px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(350deg);
  top: -350px;
  left: -180px;
  background: rgb(241, 196, 15);
  background: linear-gradient(58deg, #833ab4 10%, #fcb045 100%, #fd1d1d 100%);
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
`;

const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1050px",
    borderRadius: "20%",
    transform: "rotate(350deg)",
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(350deg)",
  },
};

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};

export function AccountBox(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signin");
  const { error } = useContext(AuthContext);

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToForgotPassword = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("forgotPassword");
    }, 400);
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };
  const switchToEnterCode = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("enterCode");
    }, 400);
  };
  const switchToNewPassword = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("newPassword");
    }, 400);
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

  const contextValue = {
    switchToForgotPassword,
    switchToSignin,
    switchToNewPassword,
    switchToEnterCode,
  };

  return (
    <AccountContext.Provider value={contextValue}>
      <BoxContainer>
        <TopContainer>
          <BackDrop
            initial={false}
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={backdropVariants}
            transition={expandingTransition}
          />
          {active === "signin" && (
            <HeaderContainer>
              <HeaderText>Welcome</HeaderText>
              <HeaderText>Back</HeaderText>
              <SmallText>Please sign-in to continue!</SmallText>
            </HeaderContainer>
          )}
          {active === "forgotPassword" && (
            <HeaderContainer>
              <HeaderText>Forgot</HeaderText>
              <HeaderText>Password?</HeaderText>
              <SmallText>Enter your email below!</SmallText>
            </HeaderContainer>
          )}
          {active === "enterCode" && (
            <HeaderContainer>
              <HeaderText>Enter</HeaderText>
              <HeaderText>Verification Code</HeaderText>
              <SmallText>
                Enter the verification code sent on your email below!
              </SmallText>
            </HeaderContainer>
          )}
          {active === "newPassword" && (
            <HeaderContainer>
              <HeaderText>New</HeaderText>
              <HeaderText>Password</HeaderText>
              <SmallText>Set your new password below!</SmallText>
            </HeaderContainer>
          )}
        </TopContainer>
        <InnerContainer>
          {active === "signin" && <LoginForm notify={notify} />}
          {active === "forgotPassword" && (
            <ForgotPasswordForm notify={notify} />
          )}
          {active === "enterCode" && <EnterCodeForm notify={notify} />}
          {active === "newPassword" && <NewPasswordForm notify={notify} />}
        </InnerContainer>
      </BoxContainer>
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
    </AccountContext.Provider>
  );
}
