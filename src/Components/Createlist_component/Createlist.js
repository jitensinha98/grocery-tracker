import React, { useEffect, useState } from "react";
import "./Createlist.css";
import Listcomponent from "../List_component/Listcomponent";
import { useUserData } from "../../Context/DataContextProvider";
import { useUserAuth } from "../../Context/AuthContextProvider";

// Functional Component for Createlist page
const Createlist = () => {

  // Context Call
  const { user } = useUserAuth();
  const { getData, postData } = useUserData();

  // state variable that will store user data 
  const [dataList, setDataList] = useState([]);

  // state variables
  const [emptyFlag, setEmptyFlag] = useState(false);
  const [userdata, set_userdata] = useState({
    item: "",
    price_per_unit: 0,
    category: "",
    quantity: 0,
  });

  // Load state variable
  const [isLoading,setIsLoading] = useState(true)

  // used for storage and initialization of user input object
  let attribute;
  let value;

  useEffect(() => {

    let subscribed = true;
    const get_data = async () => {
      try
      {
      const userData = await getData(user.uid.toString());
      if (subscribed)
       {
        if (userData.data() === undefined)
          setEmptyFlag(true);
        else 
          {
            setEmptyFlag(false);
            let date_today = new Date().toDateString();
            const DateFilteredData = userData.data().data.filter((item) => {return item.date === date_today})
            setDataList(DateFilteredData);
          }
      }
      setIsLoading(false)
    }
    catch (error)
    {
      setIsLoading(false)
      alert(error.message)
      console.log("Error : ",error.message)
    }
    };
    get_data();
    
    // useEffect cleaning
    return () => {
      subscribed = false;
    };

    // eslint-disable-next-line
  }, [userdata]);


  /*-----------input box handle arrow functions------------*/

  let handle_input = (e) => {
    attribute = e.target.name;
    if (attribute === "price_per_unit" || attribute === "quantity")
      value = parseInt(e.target.value);
    else value = e.target.value;
    set_userdata({ ...userdata, [attribute]: value });
    if (attribute === "item") validateItem(value);
    else if (attribute === "price_per_unit") validatePrice_per_unit(value);
    else if (attribute === "category") validateCategory(value);
    else if (attribute === "quantity") validateQuantity(value);
  };

  /*--------------------------------------------------------*/

  // usestate hooks used for validation and conditional rendering
  const [validatedquantity, setvalidatequantity] = useState(false);
  const [validatedcategory, setvalidatedcategory] = useState(false);
  const [validatedprice_per_unit, setvalidatedprice_per_unit] = useState(false);
  const [validateditem, setvalidateditem] = useState(false);

  /*----------Input Validation arrow functions----------*/

  let validateQuantity = (quantity) => {
    if ((quantity > 0) & (quantity !== "")) setvalidatequantity(true);
    else setvalidatequantity(false);
  };
  let validateCategory = (category) => {
    if (category !== "") setvalidatedcategory(true);
    else setvalidatedcategory(false);
  };
  let validatePrice_per_unit = (price_per_unit) => {
    if ((price_per_unit !== "") & (price_per_unit > 0))
      setvalidatedprice_per_unit(true);
    else setvalidatedprice_per_unit(false);
  };
  let validateItem = (item) => {
    if (item !== "") setvalidateditem(true);
    else setvalidateditem(false);
  };

  /*----------------------------------------------------*/

  /*------------Button Click arrow fuunctions------------*/

  let save_entry = async () => {
    const date = new Date().toDateString(); // converting date to string
    userdata["checkbox_status"] = false;
    userdata["date"] = date;
    try
    {
      await postData(user.uid.toString(), userdata, emptyFlag);
      set_userdata({ item: "", price_per_unit: 0, category: "", quantity: 0 });
      setvalidateditem(false);
      setvalidatedcategory(false);
      setvalidatequantity(false);
      setvalidatedprice_per_unit(false);
    }
    catch (error)
    {
      alert(error.message)
      console.log("Error : ",error)
    }
  };

  /*-------------------------------------------------------*/

  return (
    isLoading ? <div className="Loading-Screen"><h2>LOADING...</h2></div> :     
    <div className="Createlist-page">
      <div className="page-heading">
        <h1>ADD ITEMS</h1>
      </div>
      <div className="input-container">
        <div>
          <label>ENTER ITEM</label>
          <input onChange={handle_input} name="item" value={userdata.item} />
        </div>
        <div>
          <label>PER UNIT COST (in Rupees)</label>
          <input
            type="number"
            min="0"
            onChange={handle_input}
            name="price_per_unit"
            value={userdata.price_per_unit}
          />
        </div>
        <div>
          <label>ENTER CATEGORY </label>
          <select
            onChange={handle_input}
            name="category"
            value={userdata.category}
          >
            <option value="" disabled>
              Please select
            </option>
            <option value="Fruit">Fruit</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Dairy">Dairy</option>
            <option value="Meat">Meat</option>
            <option value="Spice">Spice</option>
            <option value="Cooking oil">Cooking oil</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>ENTER QUANTITY </label>
          <input
            type="number"
            min="0"
            onChange={handle_input}
            name="quantity"
            value={userdata.quantity}
          />
        </div>
      </div>
      <br></br>
      <div className="save-button-align">
        <button
          className={
            validatedquantity &
            validatedcategory &
            validatedprice_per_unit &
            validateditem
              ? "save-button-enable"
              : "save-button-disable"
          }
          onClick={save_entry}
          disabled={
            validatedquantity &
            validatedcategory &
            validatedprice_per_unit &
            validateditem
              ? false
              : true
          }
        >
          SAVE
        </button>
      </div>
      <hr></hr>
      <Listcomponent
        user_input_list={dataList}
        checkbox_status={dataList.map((data) => {
          return data.checkbox_status;
        })}
      />
    </div>
  );
};

export default Createlist;
