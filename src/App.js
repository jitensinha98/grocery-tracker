import React from "react";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import AfterloginApp from "./Components/AfterLogin_component/AfterloginApp";
import Createlist from "./Components/Createlist_component/Createlist";
import History from "./Components/History_component/History";
import Statistics from "./Components/Statistics_component/Statistics";
import Formcontainer from "./Components/Registration_SignIn_component/Formcontainer_component/Formcontainer";
import { useUserAuth } from "./Context/AuthContextProvider"
import ProtectedRoute from "./Private-Route/ProtectedRoute";

import { Navigate} from "react-router-dom";
import "./App.css";

const App = () => {

  const {user,isLoading} = useUserAuth()

  // Route Structure
  return (
     isLoading ? <div className="Loading-Screen"><h2>LOADING...</h2></div> :     
      <Router>
        <Routes>          
          <Route path="/" element={user ? <Navigate to="/Login/Createlist" replace /> : <Formcontainer/>}/>
          <Route element={<ProtectedRoute/>}>
          <Route path="Login" element={<AfterloginApp/>}>
            <Route path="Createlist" element={<Createlist/>}/>
            <Route path="History" element={<History/>}/>
            <Route path="Statistics" element={<Statistics/>}/>
          </Route>
          </Route>
        </Routes>
      </Router>
  );
}

export default App;