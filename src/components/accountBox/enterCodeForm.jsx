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

export function EnterCodeForm({ notify }) {
  const { switchToSignin, switchToNewPassword } = useContext(AccountContext);
  const [code, setCode] = useState("");

  const handleVerification = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/codeVerification`,
        {
          email: localStorage.getItem("userEmail"),
          code: code,
        }
      );
      if (data) {
        notify("Code Verified!");
        switchToNewPassword();
      }
    } catch (err) {
      notify(err.response.data);
    }
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Input
          type="text"
          placeholder="Enter Verification Code"
          onChange={(e) => setCode(e.target.value)}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <Marginer direction="vertical" margin="3em" />
      <SubmitButton type="submit" onClick={handleVerification}>
        Verify Code
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
