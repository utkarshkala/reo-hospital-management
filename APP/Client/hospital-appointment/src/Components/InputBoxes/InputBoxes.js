import React, { useState } from "react";
import { SignInInput, Text, ButtonContainer } from "./InputBoxes.styles";
import { Button } from "../Buttons/Buttons.styles";
import CircularProgress from "@material-ui/core/CircularProgress";

function InputBoxes(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();

  const handleClick = () => {

    if (window.zipy) {
      window.zipy.identify(email, {
        firstName: "John",
        lastName: "Doe"
     });
    }
    props.onClick({
      email,
      password,
    });
  };

  const handleSignUp = () => {
    props.onClick({
      email,
      password,
      name,
    });
  };
  return (
    <div style={{ width: "100%" }}>
      <Text>Email</Text>
      <SignInInput type="text" onChange={(e) => setEmail(e.target.value)} />
      {props.signUp && (
        <>
          <Text style={{ marginTop: 20 }}>Name</Text>
          <SignInInput type="text" onChange={(e) => setName(e.target.value)} />
        </>
      )}
      <Text style={{ marginTop: 20 }}>Password</Text>
      <SignInInput type="password" onChange={(e) => setPassword(e.target.value)} />
      <ButtonContainer>
        {!props.signUp && (
          <Button
            style={{
              width: 80,
              display: "flex",
              justifyContent: "center",
            }}
            onClick={handleClick}
          >
            {props.loading ? <CircularProgress size={20} /> : "Login"}
          </Button>
        )}
        {props.signUp && (
          <Button
            style={{
              width: 80,
              display: "flex",
              justifyContent: "center",
            }}
            onClick={handleSignUp}
          >
            {props.loading ? <CircularProgress size={20} /> : "SignUp"}
          </Button>
        )}
      </ButtonContainer>
    </div>
  );
}

export default InputBoxes;
