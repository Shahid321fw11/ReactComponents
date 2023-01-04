const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./config/db");
const user = require("./routes/user");
const cors = require("cors");

// database connection
connection();

const app = express();
app.use(cors());

//middleware
app.use(bodyParser.json());

// PORT
const PORT = process.env.port || 8000;

app.get("/", (req, res) => {
  res.json({ message: "working fine " });
});

// routes
app.use("/user", user);

app.listen(PORT, (req, res) => {
  console.log(`server is running....${PORT}`);
});
