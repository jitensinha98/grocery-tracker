import React, { useState} from "react";
import "./Register.css";
import {useNavigate} from "react-router-dom"
import {useUserAuth} from "../../../Context/AuthContextProvider"

const Register = ({ active }) => {

  // context call
  const {register} = useUserAuth()

  // used for navigating to a different route
  const Navigate = useNavigate()

  // Used for storing input
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const [confirmpassword, setconfirmpassword] = useState(null);

  // Used for validations on inputs
  const [validatedemail, setvalidatedemail] = useState(false);
  const [validated_password, set_validated_password] = useState(false);
  const [validated_confirmpassword, setvalidated_confirmpassword] =
    useState(false);

  // Used for alert display mechanism
  const [password_alert, set_password_alert] = useState(false);
  const [email_alert, set_email_alert] = useState(false);
  const [confirm_password_alert, set_confirm_password_alert] = useState(false);

  // Used for stroing and displaying firebase error message
  const [Register_error,set_Register_error] = useState("")
  

/*---------------------Functions Used for Capturing input------------------------*/
let handleregisterclick = async (e) => {
    e.preventDefault()
    set_Register_error("")
    try
    {
      await register(email,password)
      Navigate("/login/Createlist")
    }
    catch (error)
    {
      console.log(error.message)
      set_Register_error(error.message)
    }
  }

let handleEmail = (e) => {
    setemail(e.target.value);
    validateEmail(e.target.value);
  }

let handlePassword = (e) => {
    setpassword(e.target.value);
    validatePassword(e.target.value);
  }
let handleconfirmPassword = (e) => {
    setconfirmpassword(e.target.value);
    validateConfirmPassword(e.target.value,password);
  }
/*-------------------------------------------------------------------*/


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
    if ((password.length >= 6) & (password[0] !== " ")) {
      set_validated_password(true)
      set_password_alert(false)
    } 
    else
    {
      set_validated_password(false);
      set_password_alert(true);
    } 
    validateConfirmPassword(confirmpassword,password)
  }

let validateConfirmPassword = (confirmpassword,password) => {

  if (password === confirmpassword)
  {
    setvalidated_confirmpassword(true)
    set_confirm_password_alert(false)
  }
  else
  {
    setvalidated_confirmpassword(false)
    set_confirm_password_alert(true)
  }
  }
/*-------------------------------------------------------------------*/


  if (active)
    return (
      <form className="Registration-form">
        <div className={Register_error ? "firebase-alert" : ""}>{Register_error}</div>
        <div className="set-username-align">
          <div className="label-item">
            <label htmlFor="Email">SET EMAIL</label>
          </div>
          <div className="input-specification">
            <input type="email" id="Email" onChange={handleEmail} />
            <div className={email_alert ? "alert" : "no-alert"}>
              Email cannot have any spaces
            </div>
          </div>
        </div>

        <div className="set-password-align">
          <div className="label-item">
            <label htmlFor="Password">SET PASSWORD</label>
          </div>
          <div className="input-specification">
            <input type="password" id="Password" onChange={handlePassword} />
            <div className={password_alert ? "alert" : "no-alert"}>
              Password cannot begin with a space and password should be of atleast 6 characters
            </div>
          </div>
        </div>

        <div className="set-retype-password-align">
        <div className="label-item">
          <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
        </div>
          <div className="input-specification">
          <input
            type="password"
            id="confirmPassword"
            onChange={handleconfirmPassword}
          />
          <div className={confirm_password_alert ? "alert" : "no-alert"}>
          Password not matching
          </div>
          </div>
        </div>

        <input
          className={
            validatedemail & validated_password & validated_confirmpassword
              ? "register-button-enable"
              : "register-button-disable"
          }
          type="submit"
          value="REGISTER"
          onClick={handleregisterclick}
          disabled={ validatedemail & validated_password & validated_confirmpassword ? false : true}
        />
        <input className="reset-button" type="reset" value="RESET" />
      </form>
    );
  else return null;
}

export default Register;
