import React, { useContext, useState } from "react";
import {
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { login } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { switchToForgotPassword } = useContext(AccountContext);
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleLogin = async () => {
    login({ email, password }, dispatch);
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#" onClick={switchToForgotPassword}>
        Forget your password?
      </MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={handleLogin} disabled={isFetching}>
        Sign in
      </SubmitButton>
      <Marginer direction="vertical" margin="2em" />
      {/* <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="#" >
          Signup
        </BoldLink>
      </MutedLink> */}
    </BoxContainer>
  );
}
