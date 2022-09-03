import "./Listcomponent.css";
import { MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import UpdateModalComponent from "./UpdateModalComponent";
import React, { useEffect, useState } from "react";
import { useUserData } from "../../Context/DataContextProvider";
import { useUserAuth } from "../../Context/AuthContextProvider";

// used for updation of list rows
let data_to_be_updated = null;
let index_to_be_updated = null;

const Listcomponent = ({ user_input_list, checkbox_status }) => {

  // context call
  const { user } = useUserAuth();
  const { deleteData, updateData } = useUserData();

  // state variable for storing relevant data
  const [data_list, set_data_list] = useState([]);
  const [index, set_index] = useState([]);
  const [checked_status, set_checked_status] = useState([]);
  const [updateModal, set_updateModal] = useState(false);

  // used for total price calculation and component display
  let total_price = 0;
  let view = false;

  useEffect(() => {
    let subscribed = true;
    if (user_input_list.length !== 0) {
      if (subscribed) manipulate_data(user_input_list, checkbox_status);
    }

    // useEffect cleaning
    return () => {
      subscribed = false;
    };
    // eslint-disable-next-line
  }, [user_input_list]);


  // Logic to manipulate positioning of checked and unchecked list rows
  let manipulate_data = (user_input_list, checkbox_status) => {
    let completed_index_list = [];
    let pending__index_list = [];

    let checked = [];
    let unchecked = [];

    let completed_list = [];
    let pending_list = [];

    for (let i = 0; i <= checkbox_status.length; i++) {
      if ((checkbox_status[i] === true) & (user_input_list[i] !== undefined)) {
        checked.push(checkbox_status[i]);
        completed_index_list.push(i);
        completed_list.push(user_input_list[i]);
      } else if (
        (checkbox_status[i] === false) &
        (user_input_list[i] !== undefined)
      ) {
        unchecked.push(checkbox_status[i]);
        pending__index_list.push(i);
        pending_list.push(user_input_list[i]);
      }
    }
    set_data_list(pending_list.concat(completed_list));
    set_index(pending__index_list.concat(completed_index_list));
    set_checked_status(unchecked.concat(checked));
  };

  // handles changes when checkbox value is changes
  let handle_checkbox_change = async (e) => {
    checkbox_status[e.target.value] = e.target.checked;
    user_input_list[e.target.value]["checkbox_status"] = e.target.checked;
    try
    {
      await updateData(user.uid.toString(), user_input_list);
      manipulate_data(user_input_list, checkbox_status);
    }
    catch(error)
    {
      alert(error.message)
      console.log("Error : ",error.message)
    }
  };

  // deletes single list row data
  let handle_delete = async (i) => {
    try
    {
      await deleteData(user.uid.toString(), user_input_list[index[i]]);
      user_input_list.splice(index[i], 1);
      checkbox_status.splice(index[i], 1);
      manipulate_data(user_input_list, checkbox_status);
    }
    catch (error)
    {
      alert(error.message)
      console.log("Error : ",error.message)
    }
  };

  // opens modal for updation of single list row data
  let handle_update = (i) => {
    index_to_be_updated = i;
    data_to_be_updated = user_input_list[index[i]];
    set_updateModal(true);
  };

  // gets and sets updated data received from update modal component
  let get_updated_data = async (updated_object) => {
    user_input_list[index[index_to_be_updated]] = updated_object;
    let temp = data_list;
    temp[index_to_be_updated] = updated_object;
    try
    {
      await updateData(user.uid.toString(), user_input_list);
      set_data_list(temp);
    }
    catch (error)
    {
      alert(error.message)
      console.log("Error : ",error.message)
    }
  };

  // checks if data is available
  if (user_input_list.length !== 0) view = true;

  // total price calculation
  if (view === true)
    for (let i = 0; i < user_input_list.length; i++)
      total_price =
        total_price +
        user_input_list[i].price_per_unit * user_input_list[i].quantity;

  if (view === true)
    return (   
      <>
        <div className="List-view">
          <ul>
            <div className="List-heading">
              <div>Status</div>
              <div>Item</div>
              <div>Total Price</div>
              <div>Category</div>
              <div>Quantity</div>
              <div>Actions</div>
            </div>
            {data_list.map((data, i) => (
              <li
                className={
                  checked_status[i] === true ? "strike-item" : "List-style"
                }
                key={index[i]}
              >
                <div>
                  <input
                    type="checkbox"
                    className="checkbox-design"
                    checked={checked_status[i]}
                    value={index[i]}
                    onChange={handle_checkbox_change}
                  ></input>
                </div>
                <div>{data.item}</div>
                <div>{data.price_per_unit}</div>
                <div>
                  {data.category === "Cooking_oil"
                    ? "Cooking Oil"
                    : data.category}
                </div>
                <div>{data.quantity}</div>
                <div className="action-buttons">
                  <button
                    className="edit-button"
                    onClick={() => {
                      handle_update(i);
                    }}
                  >
                    <MdModeEdit />
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => {
                      handle_delete(i);
                    }}
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <hr></hr>
          <div className="total-price-view">
            <div>Total Amount (in Rupees) :</div>{" "}
            <div className="total-price-value">{total_price}</div>
          </div>
        </div>
        <UpdateModalComponent
          active={updateModal}
          set_active={set_updateModal}
          update_data={data_to_be_updated}
          updated_data_callback={get_updated_data}
        />
      </>
    );
};
export default Listcomponent;
