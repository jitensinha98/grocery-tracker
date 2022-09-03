import React from "react";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { RiLogoutBoxRFill } from "react-icons/ri";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import {useUserAuth} from "../../Context/AuthContextProvider"
import { useState } from "react";

// Functional component for header
const Header = () => {

  // hook used for redirecting
  const navigate = useNavigate();

  // context call
  const { logout } = useUserAuth()

  // Load State Variable
  const [isLoading, setIsLoading] = useState(false);

  // firebase user signout
  let signOut = async () =>
  {
    setIsLoading(true)
    try
    {
      await logout()
      setIsLoading(false)
      navigate("/")  
    }
    catch (error)
    {
      setIsLoading(false)
      alert(error.message)
      console.log(error.message)
    }
  } 

  return (
    isLoading ? <div className="Loading-Screen-sign-in"><h2>LOADING...</h2></div> :     
    <div className="header">
      <div className="align-item-1">
        <MdOutlineLocalGroceryStore className="grocery_icon" />
        <h5>
          Grocery<span className="heading-decoration"> Tracker</span>
        </h5>
      </div>
      <div className="align-item-2">
        <button className="logout-icon-button" onClick={signOut}>
          <RiLogoutBoxRFill size={20} />
        </button>
      </div>
    </div>
  );
};

export default Header;
