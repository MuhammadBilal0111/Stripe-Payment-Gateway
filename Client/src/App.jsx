import { useState } from "react";
import reactLogo from "./assets/react.svg";
import StripeCheckout from "react-stripe-checkout"; // only component that we need
import "./App.css";

function App() {
  const [product, setProduct] = useState({
    name: "React from FB",
    price: 10,
    productBy: "facebook", // you can pass as many info as possible. In the backend we will process this info
  });
  // token is automatically generated
  const makePayment = async (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      //stripe only works on https not on http
      const response = await fetch(`http://localhost:3000/payment`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Response Data", data);
        const { status } = data;
        console.log("STATUS", status);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Payment system Integration</h1>
      <p className="read-the-docs"></p>
      {/* there are multiple props to pass in StripeCheckout components */}
      {/* it can render childers as well */}
      <StripeCheckout
        stripeKey={import.meta.env.VITE_APP_KEY}
        token={makePayment}
        name="Buy React"
        amount={product.price * 100}
        shippingAddress
        billingAddress
      >
        <button>Buy react in just {product.price} dollars</button>
      </StripeCheckout>
    </>
  );
}

export default App;
