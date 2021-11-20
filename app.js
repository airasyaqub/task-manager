require('dotenv').config();
const express = require('express');
const app = express();


const connectToDB = require('./db/connect');




app.use(express.json());

const tasksRoute = require("./routes/task");




app.use("/api/v1/task", tasksRoute);


const start = async () => {
  try {
    await connectToDB(process.env.MONGO_URI);
    console.log('DB connected');
    app.listen(3000, () => {
      console.log('Server is listening on port 3000....');
    });
  } catch(err) {
    console.log("error", err);
  }

}


start();


