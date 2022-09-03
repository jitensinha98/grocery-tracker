import React, { useState } from "react";
import "./UpdateModalComponent.css";

const UpdateModalComponent = ({
  active,
  set_active,
  update_data,
  updated_data_callback,
}) => {

  // state variable used for validation checks
  const [validatedquantity, setvalidatequantity] = useState(true);
  const [validatedcategory, setvalidatedcategory] = useState(true);
  const [validatedprice_per_unit, setvalidatedprice_per_unit] = useState(true);
  const [validateditem, setvalidateditem] = useState(true);

  // used for storage and initialization of user input object
  let attribute;
  let value;

  // state variable for storing updated data
  const [updated_data,set_updated_data] = useState({})

  // takes and stores object input from update modal 
  let handle_input = (e) => {
    attribute = e.target.name;
    value = e.target.value
    if ( attribute === 'price_per_unit' || attribute === 'quantity')
    value = parseInt(e.target.value)
    update_data[attribute] = value
    set_updated_data(update_data);
    if (attribute === "item") validateItem(value);
    else if (attribute === "price_per_unit") validatePrice_per_unit(value);
    else if (attribute === "category") validateCategory(value);
    else if (attribute === "quantity") validateQuantity(value);
  };


  // creates callback for updated data and closes modal
  let handle_update = () => {
    updated_data_callback(updated_data);
    alert("DATA UPDATED SUCCESSFULLY");
    set_active(false);
  };

  /*----------Input Validation arrow functions----------*/

  let validateQuantity = (quantity) => {
    if (quantity > 0 & quantity !== "") setvalidatequantity(true);
    else setvalidatequantity(false);
  };
  let validateCategory = (category) => {
    if (category !== "") setvalidatedcategory(true);
    else setvalidatedcategory(false);
  };
  let validatePrice_per_unit = (price_per_unit) => {
    if (price_per_unit !== "" & price_per_unit > 0) setvalidatedprice_per_unit(true);
    else setvalidatedprice_per_unit(false);
  };
  let validateItem = (item) => {
    if (item !== "") setvalidateditem(true);
    else setvalidateditem(false);
  };

  /*----------------------------------------------------*/

  if (active === true)
    return (
      <div className="overlay">
        <div className="update-area">
          <h1>UPDATE</h1>
          <div className="input-area">
            <div>
              <label>ENTER ITEM</label>
              <input
                name="item"
                defaultValue={update_data.item}
                onChange={handle_input}
              />
            </div>
            <div>
              <label>PER UNIT COST (in Rupees)</label>
              <input
                type="number"
                min="0"
                name="price_per_unit"
                defaultValue={update_data.price_per_unit}
                onChange={handle_input}
              />
            </div>
            <div>
              <label>ENTER CATEGORY </label>
              <select
                name="category"
                defaultValue={update_data.category}
                onChange={handle_input}
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
                name="quantity"
                type="number"
                defaultValue={update_data.quantity}
                onChange={handle_input}
              />
            </div>
          </div>
          <br></br>
          <div className="button-align">
            <div>
              <button
                className={
                  validatedquantity &
                  validatedcategory &
                  validatedprice_per_unit &
                  validateditem
                    ? "update-button-enable"
                    : "update-button-disable"
                }
                onClick={handle_update}
                disabled={
                  validatedquantity &
                  validatedcategory &
                  validatedprice_per_unit &
                  validateditem
                    ? false
                    : true
                }
              >
                UPDATE
              </button>
            </div>
            <div>
              <button className="cancel" onClick={() => set_active(false)}>
                CANCEL
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default UpdateModalComponent;
