import React, { useState } from "react";
import "./ForgotPassword.css";
import {useUserAuth} from "../../../Context/AuthContextProvider"

const ForgotPassword = ({ active, set_active }) => {

  // State variables used for storing data
  const [email, setEmail] = useState("");
  const [validatedEmail, setValidatedEmail] = useState(false);
  const [email_alert, set_email_alert] = useState(false);

  // State variable used for storing firebase error message
  const [resetError,setResetError] = useState("")

  // context call
  const {passwordReset} = useUserAuth()

  // sets state variables to user input
  let handle_input = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  // stores data in firestore cloud storage and asigns default values to state variables
  let handle_submit = async (e) => {
    e.preventDefault()
    try
    {
      await passwordReset(email)
      setResetError("")
      setEmail("")
      setValidatedEmail(false)
      set_email_alert(false)
      set_active(false)
      alert("Password Reset Instructions have been sent to your mail");
    }
    catch(error)
    {
        console.log(error.message)
        setResetError(error.message)
    }
  };

  /*----------Input Validation arrow functions----------*/

  let validateEmail = (email) => {
    let space_flag = 0;
    for (let i = 0; i < email.length; i++) {
      if (email[i] === " ") {
        space_flag = 1;
        break;
      }
    }
    if (email.length !== 0) {
      setValidatedEmail(true);
      set_email_alert(false);
    }
    if (space_flag === 1) {
      setValidatedEmail(false);
      set_email_alert(true);
    } else if (email.length === 0 || email === null) {
      set_email_alert(false);
      setValidatedEmail(false);
    }
  };

  let closeResetModal = () => {
    set_active(false);
    set_email_alert(false);
    setEmail("");
    setValidatedEmail(false);
    setResetError("")
  };

  /*----------------------------------------------------*/

  if (active === true)
    return (
      <div className="overlay-reset">
        <div className="reset-area">
          <h1>PASSWORD RESET</h1>
          <div className={resetError ? "firebase-alert" : ""}>{resetError}</div>
          <div className="email-input-area">
            <label htmlFor="Email">ENTER EMAIL</label>
            <input type="email" id="email" onChange={handle_input} />
          </div>
          <div className={email_alert ? "email-alert" : "no-email-alert"}>
            Email cannot have any spaces
          </div>
          <br></br>
          <div className="button-align">
            <div>
              <button
                className={
                  validatedEmail
                    ? "submit-button-enable"
                    : "submit-button-disable"
                }
                onClick={handle_submit}
                disabled={validatedEmail ? false : true}
              >
                SUBMIT
              </button>
            </div>
            <div>
              <button className="close" onClick={closeResetModal}>
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ForgotPassword;
