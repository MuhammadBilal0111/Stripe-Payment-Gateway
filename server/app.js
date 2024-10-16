const cors = require("cors");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);
const app = express();

console.log(process.env.STRIPE_SECRET_KEY);
// middleware
app.use(express.json());
app.use(cors()); // cross-origin resource sharing

app.post("/payment", (req, res) => {
  const { product, token } = req.body; // get product details and token from request body
  console.log("PRODUCT", product);
  console.log("PRICE", product.price);
  const idempotencyKey = uuidv4(); // unique idempotency key to avoid duplicate charges

  // 1. Create customer using the provided token
  return (
    stripe.customers
      .create({
        email: token.email, // email from the token
        source: token.id, // card token generated on the frontend
      }) // it will return the created customer

      // 2. After customer creation, create a charge
      .then((customer) => {
        return stripe.charges.create(
          {
            amount: product.price * 100, // convert dollars to cents
            currency: "usd", // use USD as currency
            customer: customer.id, // associate charge with the created customer
            receipt_email: token.email, // send receipt to the provided email
            description: `Purchase of ${product.name}`, // description of the product
            shipping: {
              name: token.card.name, // cardholder's name from the token
              address: {
                country: token.card.address_country, // shipping country from token
              },
            },
          },
          {
            idempotencyKey: idempotencyKey, // ensure idempotency to avoid duplicate charges
          }
        );
      })

      // 3. If charge is successful, send the response back to the frontend
      .then((result) => {
        res.status(200).json({
          status: "success",
          result,
        });
      })

      // 4. Catch any errors that occur during the process
      .catch((err) => {
        console.log("Error", err); // log the error
        res.status(500).json({
          status: "error",
          message: err.message, // send error message to frontend
        });
      })
  );
});

module.exports = app;
