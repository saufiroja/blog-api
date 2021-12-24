require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const authRouter = require("./routers/auth.router");
const feedRouter = require("./routers/feed.router");
const userProfiles = require("./routers/userProfiles.router");

const app = express();

// conneted database
require("./models/sequelize");

// middlewawre
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(authRouter);
app.use(feedRouter);
app.use(userProfiles);

// error handling
app.use((err, req, res, next) => {
  const { message, code = 500, error = "internal server error" } = err;

  return res.status(code).json({
    message,
    code,
    error,
  });
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`connect on port http://localhost:${PORT}`);
});
