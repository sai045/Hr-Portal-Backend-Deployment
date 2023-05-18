const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const Error = require("./models/error");

const app = express();

const ApplicantRouter = require("./routes/applicantRouter");
const EmployeeRouter = require("./routes/employeeRouter");
const TravelRouter = require("./routes/TravelRequests-router");
const SalaryRouter = require("./routes/salaryRouter");
const complaintsRouter = require("./routes/complaintRoutes");
const leaveRouter = require("./routes/leaverequests");
const connectDB = require("./config/config");

connectDB();
app.use("*", cors());

app.use(bodyParser.json());

app.use("/api/dashboard", require("./routes/dashboard"));

app.use("/api/applicant", ApplicantRouter);

app.use("/api/employee", EmployeeRouter);

app.use("/api/travel", TravelRouter);

app.use("/api/salary", SalaryRouter);

app.use("/api/complaints", complaintsRouter);

app.use("/api/leave", leaveRouter);

app.use("/api/users", require("./routes/users"));

app.use("/api/profile", require("./routes/profile"));

app.use("/api/auth", require("./routes/auth"));

app.use("/api/", require("./routes/navbar"));

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use((req, res, next) => {
  const error = new Error("Couldn't find this route", 404);
  return next(error);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured " });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`running at ${port}`);
});

module.exports = app