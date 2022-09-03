import "./Statistics.css";
import "chart.js/auto";
import React, { useEffect, useState } from "react";
import { Doughnut ,Line, Bar } from "react-chartjs-2";
import { useUserAuth } from "../../Context/AuthContextProvider";
import { useUserData } from "../../Context/DataContextProvider";

const Statistics = () => {

  // context call
  const { user } = useUserAuth();
  const { getData } = useUserData();

  // used for category check of firestore data
  const category = [
    "Fruit",
    "Vegetable",
    "Dairy",
    "Meat",
    "Spice",
    "Cooking oil",
    "Other",
  ];

  // State variables used for storing relevant data
  const [quantityArray, setQuantityArray] = useState([]);
  const [categoryArray, setCategoryArray] = useState([]);
  const [priceArray, setPriceArray] = useState([]);
  const [day, setDay] = useState([]);
  const [dayExpenditure, setDayExpenditure] = useState([]);
  const [dayQuantity, setDayQuantity] = useState([]);

  // Load State Variable
  const [isLoading,setIsLoading] = useState(true)

  useEffect(() => {
    let subscribed = true;
    const get_data = async () => {
      let quantity_list = [];
      let price_list = [];
      let attribute_list = [];
      let category_valid 
      let day_array = [];
      let day_expenditure_array = [];
      let day_quantity_array = [];
      try
      {
      const userData = await getData(user.uid.toString());
      if (subscribed) {
        if ((userData.data() !== undefined) & (userData.data().data.length !== 0)) {
          const user_data = userData.data().data;
          for (let i = 0; i < user_data.length; i++) {
            if (!day_array.includes(user_data[i].date))
              day_array.push(user_data[i].date);
          }
          for (let i = 0; i < day_array.length; i++) {
            let total_expenditure = 0;
            let total_quantity = 0;
            for (let j = 0; j < user_data.length; j++) {
              if (day_array[i] === user_data[j].date) {
                total_expenditure =
                  total_expenditure + user_data[j].price_per_unit;
                total_quantity = total_quantity + user_data[j].quantity;
              }
            }
            day_expenditure_array.push(total_expenditure);
            day_quantity_array.push(total_quantity);
          }
          setDayExpenditure(day_expenditure_array);
          setDay(day_array);
          setDayQuantity(day_quantity_array);
          for (let i = 0; i < category.length; i++) {
            let quantity_count = 0;
            let price_count = 0;
            for (let j = 0; j < user_data.length; j++) {
              if (user_data[j].category === category[i]) {
                quantity_count = quantity_count + user_data[j].quantity;
                price_count = price_count + user_data[j].price_per_unit;
                category_valid = user_data[j].category;
              }
            }
            if (!attribute_list.includes(category_valid) & category_valid !== undefined )
              attribute_list.push(category_valid);
            if (quantity_count !== 0 || price_count !== 0) {
              quantity_list.push(quantity_count);
              price_list.push(price_count);
            }
            price_count = 0;
            quantity_count = 0;
          }
          setQuantityArray(quantity_list);
          setCategoryArray(attribute_list);
          setPriceArray(price_list);
          
        }
      }

      setIsLoading(false)
    }
    catch (error)
    {
      console.log("Error : ",error.message)
      setIsLoading(false)
    }
    };
    get_data();

    // useEffect cleaning
    return () => {
      subscribed = false;
    };
    // eslint-disable-next-line
  }, []);


  return (
    isLoading ? <div className="Loading-Screen"><h2>LOADING...</h2></div> :     
    <div className="Statistics-page">
      <div className="page-heading">
        <h1>Statistics</h1>
      </div>
      <div className="graph_container">
        <div className="graph-quantity-price">
          <div className="graph_quantity">
            <div className="graph_quantity_heading">Category vs Quantity</div>
            {categoryArray.length === 0 ? (
              <div className="emptyGraph">Nothing to Show</div>
            ) : (
              <Doughnut
                data={{
                  labels: categoryArray,
                  datasets: [
                    {
                      data: quantityArray,
                      backgroundColor: [
                        "#F7682A",
                        "#FA7E49",
                        "#F79A72",
                        "#FAB89C",
                        "#FCCEBA",
                        "#FDE0D4",
                        "#FDEBE3",
                      ],
                    },
                  ],
                }}
                width={"400"}
                height={"400"}
              />
            )}
          </div>
          <div className="graph_price">
            <div className="graph_price_heading">Category vs Price</div>
            {categoryArray.length === 0 ? (
              <div className="emptyGraph">Nothing to Show</div>
            ) : (
              <Doughnut
                data={{
                  labels: categoryArray,
                  datasets: [
                    {
                      data: priceArray,
                      backgroundColor: [
                        "#F7682A",
                        "#FA7E49",
                        "#F79A72",
                        "#FAB89C",
                        "#FCCEBA",
                        "#FDE0D4",
                        "#FDEBE3",
                      ],
                    },
                  ],
                }}
                width={"400"}
                height={"400"}
              />
            )}
          </div>
        </div>
        <div className="graph_price_history">
          <div className="graph_price_history_heading">Day vs Expenditure</div>
          {day.length === 0 ? (
            <div className="emptyGraph">Nothing to Show</div>
          ) : (
            <Line
              data={{
                labels: day,
                datasets: [
                  {
                    label: "Expenditure",
                    data: dayExpenditure,
                    backgroundColor: "orangered",
                  },
                ],
              }}
              width={"200"}
              height={"100"}
            />
          )}
        </div>
        <div className="graph_quantity_history">
          <div className="graph_quantity_history_heading">Day vs Quantity</div>
          {day.length === 0 ? (
            <div className="emptyGraph">Nothing to Show</div>
          ) : (
            <Bar
              data={{
                labels: day,
                datasets: [
                  {
                    label: "Quantity",
                    data: dayQuantity,
                    backgroundColor: "#F27139",
                  },
                ],
              }}
              width={"200"}
              height={"100"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
