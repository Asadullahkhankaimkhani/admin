import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import axios from "axios";

export function NewPasswordForm({ notify }) {
  const { switchToSignin } = useContext(AccountContext);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async () => {
    if (newPassword == confirmNewPassword) {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/auth/saveUserNewPassword`,
          {
            email: localStorage.getItem("userEmail"),
            newPassword: newPassword,
          }
        );
        if (data) {
          localStorage.removeItem("userEmail");
          notify("Password Updated!");
          switchToSignin();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setError("Passwords do not match");
    }
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Input
          type="password"
          placeholder="Enter new password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm new password"
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink style={{ color: "red", pointer: "none" }} href="#">
        {error}
      </MutedLink>
      <Marginer direction="vertical" margin="3em" />
      <SubmitButton type="submit" onClick={handleForgotPassword}>
        Update Password
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Sign in
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
