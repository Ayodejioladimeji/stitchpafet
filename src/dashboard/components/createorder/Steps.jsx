import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeComma,
  strictAddComma,
  strictRemoveComma,
} from "comma-separator";

import { useStep } from "react-hooks-helper";
import ServiceDetails from "./servicedetails/ServiceDetails";
import OrderDetails from "./servicedetails/OrderDetails";
import CreateOrder from "./CreateOrder";
import { createdOrder } from "./../../../redux/actions/orderAction";

const steps = [{ id: "stepone" }, { id: "steptwo" }, { id: "stepthree" }];

// The intitial state
const initialState = {
  address: "",
  sellersEmail: "",
  deliveryfee: "",
  err: "",
};

export const Steps = () => {
  const { step, navigation } = useStep({
    steps,
    initialStep: 0,
  });

  const { added_products } = useSelector((state) => state.dashboard);
  const { user, token } = useSelector((state) => state.auth);
  const [subTotal, setSubTotal] = useState(0);
  const [charges, setCharges] = useState(0);
  const [flutterCharges, setFlutterCharges] = useState(0);
  const [data, setData] = useState(initialState);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const calculation = () => {
      const arr = [];
      added_products.filter((item) => {
        return arr.push(
          removeComma(item.product_amount) * removeComma(item.quantity)
        );
      });

      const result = arr.reduceRight((acc, item) => {
        return acc + item;
      }, 0);

      setCharges((2 / 100) * result);
      setFlutterCharges(Math.ceil((1.4 / 100) * result));
      setSubTotal(result);
    };
    calculation();
  }, [added_products]);

  // The handleChange
  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "" });
  };

  const handleChangeFee = (e) => {
    setData((prevState) => ({
      ...prevState,
      deliveryfee: strictAddComma(e.target.value),
      err: "",
    }));
  };

  // create Order method
  const createOrder = (e) => {
    e.preventDefault();

    const newData = {
      sellerEmail: data.sellersEmail,
      buyersName: `${user.first_name} ${user.last_name}`,
      delivery_fee: strictRemoveComma(data.deliveryfee),
      verifibizId: user.user_id,
      address: data.address,
      products: added_products,
    };
    // console.log(newData);
    dispatch(createdOrder(newData, token.token, setLoading, navigation));
  };

  switch (step.id) {
    case "stepone":
      return (
        <CreateOrder
          handleChangeData={handleChangeData}
          handleChangeFee={handleChangeFee}
          navigation={navigation}
          data={data}
          setData={setData}
        />
      );
    case "steptwo":
      return (
        <ServiceDetails
          added_products={added_products}
          subTotal={subTotal}
          charges={charges}
          flutterCharges={flutterCharges}
          navigation={navigation}
          data={data}
          createOrder={createOrder}
          loading={loading}
        />
      );

    case "stepthree":
      return (
        <OrderDetails
          added_products={added_products}
          subTotal={subTotal}
          charges={charges}
          flutterCharges={flutterCharges}
          navigation={navigation}
          data={data}
          user={user}
          token={token}
        />
      );

    default:
      return step;
  }
};
