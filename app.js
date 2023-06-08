"use strict";

/** Express app for jobly. */

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const morgan = require('morgan')
const { authenticateJWT } = require("./middleware/auth");
const app = express();


const authRoutes = require('./routes/auth');
const listingRoutes = require('./routes/listings')

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);


app.use('/auth', authRoutes);
app.use('/listings', listingRoutes);



/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
