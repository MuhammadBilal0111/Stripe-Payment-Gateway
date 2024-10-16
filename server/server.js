const dotenv = require("dotenv");
const app = require("./app");
dotenv.config({ path: ".env" });

// publishers key goes to the frontend but the secret key goes to the backend
const port = process.env.PORT;
app.listen(port, () => {
  console.log("server has been started on http://localhost:3000");
});
