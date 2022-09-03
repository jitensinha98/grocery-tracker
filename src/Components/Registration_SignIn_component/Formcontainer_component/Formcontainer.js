import React from "react";
import "./Formcontainer.css";
import Register from "../Register_component/Register";
import SignIn from "../SignIn_component/SignIn";
import { useState } from "react";

const Formcontainer = () => {

  // used for Routing and Route link styling
  const [signinactive, setsigninactive] = useState(true);
  const [registeractive, setregisteractive] = useState(false);

  /*-------------Functions used for Routing and Route link styling----------------*/
  let isActive_tab_Register = () => {
    setregisteractive(true);
    setsigninactive(false);
  };
  let isActive_tab_SignIn = () => {
    setsigninactive(true);
    setregisteractive(false);
  };
/*--------------------------------------------------------------------------------*/

  return (
    <div className="Form-Container">
      <ul className="list">
        <li
          className={registeractive ? "selected-link-register" : "register"}
          onClick={isActive_tab_Register}
        >
          Register
        </li>
        <li
          className={signinactive ? "selected-link-signin" : "signin"}
          onClick={isActive_tab_SignIn}
        >
          Sign In
        </li>
      </ul>
      <div className="Form">
        <Register active={registeractive} />
        <SignIn active={signinactive} />
      </div>
    </div>
  );
};

export default Formcontainer;
