const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const app = require("./app");

// publishers key goes to the frontend but the secret key goes to the backend
const port = process.env.PORT;
app.listen(port, () => {
  console.log("server has been started on http://localhost:3000");
});
