import MetaData from "../layouts/MetaData";
import { Fragment, useEffect } from "react";
import { validateShipping } from "./Shipping";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutStep";
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
import { createOrder } from "../../actions/orderActions";
import { clearError as clearOrderError } from "../../slices/orderSlice";

export default function ConfirmOrder() {
  const { shippingInfo, items: cartItems } = useSelector(
    (state) => state.cartState
  );
  const { user } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 25;
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  let taxPrice = Number(0.05 * itemsPrice);
  const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
  taxPrice = Number(taxPrice).toFixed(2);
  const { error: orderError } = useSelector((state) => state.orderState);

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };
  console.log({ orderInfo });
  console.log({ order });
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }
  useEffect(() => {
    validateShipping(shippingInfo, navigate);
    if (orderError) {
      toast(orderError, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearOrderError());
        },
      });
      return;
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    if (totalPrice === "") {
      alert("please enter amount");
    } else {
      var options = {
        key: "rzp_test_yvz7nqyO5zzJxm",
        key_secret: "HmlhZnif01JECmZBqMxQFS8e",
        amount: totalPrice * 100,
        currency: "INR",
        name: "Metalmart",
        description: "for testing purpose",
        handler: function (response) {
          if (response.razorpay_payment_id) {
            toast("Payment Success!", {
              type: "success",
              position: toast.POSITION.BOTTOM_CENTER,
            });
            order.paymentInfo = {
              id: response.razorpay_payment_id,
              status: "succeeded",
            };
            order.totalPrice = totalPrice;
            console.log({ order });
            dispatch(orderCompleted());
            dispatch(createOrder(order));

            navigate("/order/success");
          } else {
            toast("Please Try again!", {
              type: "warning",
              position: toast.POSITION.BOTTOM_CENTER,
            });
          }
        },
        prefill: {
          name: "Karthikrajan",
          email: "karthikrajan2k@gmail.com",
          contact: "8344488604",
        },
        notes: {
          address: "Razorpay Corporate office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var pay = new window.Razorpay(options);
      pay.open();
    }
  };
  useEffect(() => {
    validateShipping(shippingInfo, navigate);
  }, []);

  return (
    <Fragment>
      <MetaData title={"Confirm Order"} />
      <CheckoutSteps shipping confirmOrder />
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Shipping Info</h4>
          <p>
            <b>Name:</b> {user.name}
          </p>
          <p>
            <b>Phone:</b> {shippingInfo.phoneNo}
          </p>
          <p className="mb-4">
            <b>Address:</b> {shippingInfo.address}, {shippingInfo.city},{" "}
            {shippingInfo.postalCode}, {shippingInfo.state},{" "}
            {shippingInfo.country}{" "}
          </p>
          <hr />
          <h4 className="mt-4">Your Cart Items:</h4>

          {cartItems.map((item) => (
            <Fragment>
              <div className="cart-item my-1">
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      height="45"
                      width="65"
                    />
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item.quantity} x Rs.{item.price} ={" "}
                      <b>Rs.{item.quantity * item.price}</b>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </Fragment>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal:{" "}
              <span className="order-summary-values">Rs.{itemsPrice}</span>
            </p>
            <p>
              Shipping:{" "}
              <span className="order-summary-values">Rs.{shippingPrice}</span>
            </p>
            <p>
              Tax: <span className="order-summary-values">Rs.{taxPrice}</span>
            </p>

            <hr />

            <p>
              Total:{" "}
              <span className="order-summary-values">Rs.{totalPrice}</span>
            </p>

            <hr />
            <button
              id="checkout_btn"
              onClick={handleSubmit}
              className="btn btn-primary btn-block"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
