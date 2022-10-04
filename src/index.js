const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { engine } = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
// const urlMiddleware = require("./middleware/urlMiddleware");

require("dotenv").config();
const app = express();
// const route = require("./routes/index");
const route = require("./routes/index.js");

// HTTP request logger middleware for node.js
const morgan = require("morgan");

// Do request gui len dang json nen can bien doi no
app.use(express.json());
// app.use(express.urlencoded());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// middleware tuỳ chỉnh
// app.use(urlMiddleware);

// connect db
const connectDB = require("./connectDB/index");

// create logger when has request
app.use(morgan("common"));

// lien ket thu muc public lay ra anh img
app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => res.send("hello world"));

// tạo cookies va gán cookies
app.use(cookieParser());

app.engine(
  ".hbs",
  engine({
    defaultLayout: "mainLayout",
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      //   link: (url) => {
      //     const types = ''
      //     return `<a href="/user/_id=id">
      //         Thông tin cá nhân
      //       </a>`;
      //   },
    },
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "public/views/"));
const PORT = process.env.PORT || 3000;

connectDB.connect();
route(app);

app.listen(PORT, () => console.log(`app listenning port ${PORT}`));
