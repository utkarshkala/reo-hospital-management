const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authenticationRoutes = require("./Routes/authenication");
const appointmentRoutes = require("./Routes/appointments");
// const { getSlotsForPatients, fake } = require("./utils");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoURI = process.env.MONGODB_URI || "mongodb+srv://shantanu:N2l1Pnxb3q5aBfkK@hospital.wg1gr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(
  mongoURI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use("/authentication", authenticationRoutes);
app.use("/appointments", appointmentRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

if (require.main === module) {
  const port = process.env.PORT || 5001;
  app.listen(port, () => {
    console.log(`Connected on port ${port}`);
    // console.log(getSlotsForPatients(fake));
  });
}

module.exports = app;
