const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();
const app = express();

var corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.set("trust proxy", "127.0.0.1");

// app.use(
//   "/app",
//   createProxyMiddleware({
//     target: "http://localhost:8345",
//     changeOrigin: true,
//   })
// );

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello Servers!!!" });
});

require("./app/routes/server.routes.js")(app);
// require("./app/routes/user.routes.js")("app");

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
