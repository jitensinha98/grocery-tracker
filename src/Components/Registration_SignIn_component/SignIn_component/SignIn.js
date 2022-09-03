import React, { useState } from "react";
import "./SignIn.css";
import { useNavigate , useLocation } from "react-router-dom";
import {useUserAuth} from "../../../Context/AuthContextProvider"
import ForgotPassword from "./ForgotPassword";

const SignIn = ({ active }) => {

  // used for redirect
  const Navigate = useNavigate()
  const location = useLocation()

  // context call
  const {login} = useUserAuth()

  // Used for storing input
  const [password, setpassword] = useState(null);
  const [email, set_email] = useState(null);

  // Used for validations on inputs
  const [validatedemail, setvalidatedemail] = useState(false);
  const [validatedpassword, setvalidatedpassword] = useState(false);

  // Used for alert display mechanism
  const [password_alert, set_password_alert] = useState(false);
  const [email_alert, set_email_alert] = useState(false);

  // used for storing firebase error message
  const [Login_error,set_Login_error] = useState(null) 

  // State variable used for modal display
  const [ForgotPasswordModal , set_ForgotPasswordModal] = useState(false)


 // Submit Button Click event
 const signin = async (e) => {
    e.preventDefault()
    try
    {
      await login(email,password)
      if (location.state?.from)
        Navigate(location.state.from)
    }
    catch (error)
    {
      console.log(error.message)
      set_Login_error(error.message)
    }

  };


  /*---------------------Functions Used for Capturing input------------------------*/
  let handlePassword = (e) => {
    setpassword(e.target.value);
    validatePassword(e.target.value);
  };
  let handleEmail = (e) => {
    set_email(e.target.value);
    validateEmail(e.target.value);
  };
  /*-------------------------------------------------------------------------------*/


  // opens forgotPassword modal component
  let handleResetClick = () => {
    set_ForgotPasswordModal(true)
  }


  /*-----------------Functions used for input validation---------------*/
  let validateEmail = (email) => {
    let space_flag = 0
    for (let i=0;i<email.length;i++)
    {
        if (email[i] === " ")
        {
          space_flag = 1;
          break
        }
    }
    if ((email.length !== 0)) {
      setvalidatedemail(true);
      set_email_alert(false);
    }
    if (space_flag === 1) {
      setvalidatedemail(false);
      set_email_alert(true);
    } else if (email.length === 0 || email === null) {
      set_email_alert(false);
      setvalidatedemail(false);
    }
    }


  let validatePassword = (password) => {
    if ((password.length !== 0) & (password[0] !== " ")) {
      setvalidatedpassword(true);
      set_password_alert(false);
    } else if (password[0] === " ") {
      setvalidatedpassword(false);
      set_password_alert(true);
    } else if (password.length === 0 || password === null) {
      set_password_alert(false);
      setvalidatedpassword(false);
    }
  };
 /*-------------------------------------------------------------------*/


  if (active)
    return (  
      <div className="Sign-In-Container">
        <form className="Signin-form">
          <div className={Login_error ? "firebase-alert" : ""}>{Login_error}</div>
          <div className="username-align">
            <div className="label-item">
              <label htmlFor="Email">EMAIL</label>
              </div>
            
            <div className="input-specification">
              <input type="email" id="Email" onChange={handleEmail} />
              <div className={email_alert ? "alert" : "no-alert"}>
                Email cannot have any spaces
              </div>
            </div>
          </div>

          <div className="password-align">
          <div className="label-item">
            <label htmlFor="Password">PASSWORD</label>
          </div>
            
            <div className="input-specification">
              <input type="password" id="Password" onChange={handlePassword} />
              <div className={password_alert ? "alert" : "no-alert"}>
                Password cannot begin with a space
              </div>
            </div>
          </div>

          <input
            className={
              validatedemail & validatedpassword
                ? "sign-in-button-enable"
                : "sign-in-button-disable"
            }
            type="submit"
            onClick={signin}
            value="SIGN IN"
            disabled={validatedemail & validatedpassword ? false : true}
          />
          
        </form>
        <button className="reset-password-link" onClick = {handleResetClick}>Forgot Password ?</button>
        <ForgotPassword active={ForgotPasswordModal} set_active={set_ForgotPasswordModal}/>
      </div>
    );
  else return null;
};

export default SignIn;
