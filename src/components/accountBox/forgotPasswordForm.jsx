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


export function ForgotPasswordForm({notify}) {
  const { switchToSignin, switchToEnterCode } = useContext(AccountContext);
  const [email, setEmail] = useState('')



  const handleForgotPassword = async () => {
    try {
     const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/forgotpassword`, {email: email});
     if(data){
       localStorage.setItem("userEmail", email)
       notify("Verification Link Sent!")
      switchToEnterCode()
     }
    } catch (err) {
      notify(err.response.data);
    }
  }

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <Marginer direction="vertical" margin="3em" />
      <SubmitButton type="submit" onClick={handleForgotPassword}>Send Code </SubmitButton>
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
