import React, { useEffect, useState } from "react";
import "./History.css";
import { AiFillDelete } from "react-icons/ai";
import { useUserAuth } from "../../Context/AuthContextProvider";
import { useUserData } from "../../Context/DataContextProvider";

// Functional Component for History Page
const History = () => {

  // Load State Variable
  const [isLoading,setIsLoading] = useState(true)

  // context call
  const { user } = useUserAuth();
  const { getData, updateData } = useUserData();

  // State variables for storing relevant data
  const [availableDates, setAvailableDates] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [deleteFlag, setDeleteFlag] = useState(false);

  useEffect(() => {

    let subscribed = true;
    let HistoryDataCollectionArray = [];
    let currentDayData;

    const get_data = async () => {
      let uniqueDates = [];
      try
      {
      const userData = await getData(user.uid.toString());
      if (subscribed) {
        if ((userData.data() !== undefined) & (userData.data().data.length !== 0)) {
          let date_today = new Date().toDateString();
          const DateFilteredData = userData.data().data.filter((item) => {
            return item.date !== date_today;
          });
          currentDayData = userData.data().data.filter((item) => {
            return item.date === date_today;
          });
          for (let i = 0; i < DateFilteredData.length; i++) {
            if (!uniqueDates.includes(DateFilteredData[i].date))
              uniqueDates.push(DateFilteredData[i].date);
          }
          for (let i = 0; i < uniqueDates.length; i++) {
            let ObjectCollectionArray = [];
            for (let j = 0; j < DateFilteredData.length; j++) {
              if (uniqueDates[i] === DateFilteredData[j].date) {
                ObjectCollectionArray.push(DateFilteredData[j]);
              }
            }
            HistoryDataCollectionArray.push([...ObjectCollectionArray]);
          }
        }
        setAvailableDates(uniqueDates);
        setHistoryData(HistoryDataCollectionArray);
        setCurrentData(currentDayData);
      }
      setIsLoading(false)
    }
    catch (error)
    {
      setIsLoading(false)
      console.log("Error : ",error.message)
    }
    };
    get_data();

    // useEffect cleaning
    return () => {
      subscribed = false;
    };

    // eslint-disable-next-line
  }, [deleteFlag]);

  // sets firestore data object array 
  let handleResetHistory = async () => {
    try
    {
      await updateData(user.uid.toString(), currentData);
      setDeleteFlag(true);
      alert("History cleared successfully");
    }
    catch (error)
    {
      alert(error.message)
      console.log("Error : ",error.message)
    }
  };

  return (
    isLoading ? <div className="Loading-Screen"><h2>LOADING...</h2></div> :     
    <div className="History-page">
      <div className="page-heading">
        <h1> HISTORY </h1>
      </div>

      <div
        className={
          availableDates.length !== 0
            ? "button-container"
            : "disable-button-container"
        }
      >
        <button className="clear-history-button" onClick={handleResetHistory}>
          {" "}
          <AiFillDelete /> CLEAR HISTORY
        </button>
      </div>
      <div className="History-list">
        {availableDates.length === 0 ? (
          <div className="emptyGraph">Nothing to Show</div>
        ) : (
          availableDates.map((date, i) => (
            <div key={i}>
              <h2>
                <div className="date-style">{date}</div>
              </h2>
              <hr></hr>
              <div className="History-List-heading">
                <div>Item</div>
                <div>Total Price</div>
                <div>Category</div>
                <div>Quantity</div>
                <div>Status</div>
              </div>
              <ul>
                {historyData[i].map((element, j) => (
                  <li className="History-style" key={j}>
                    <div>{element.item}</div>
                    <div>{element.price_per_unit}</div>
                    <div>{element.category}</div>
                    <div>{element.quantity}</div>
                    <div>
                      {element.checkbox_status ? "Completed" : "Incomplete"}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;
