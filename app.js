const connectToDB = require('./db/connect');
const express = require('express');
const app = express();



const connectionString = "mongodb+srv://airas:12345@express.y1gzl.mongodb.net/TASK-MANAGER?retryWrites=true&w=majority";


app.use(express.json());

const tasksRoute = require("./routes/task");




app.use("/api/v1/task", tasksRoute);


const start = async () => {
  try {
    await connectToDB(connectionString);
    console.log('DB connected');
    app.listen(3000, () => {
      console.log('Server is listening on port 3000....');
    });
  } catch(err) {
    console.log("error", err);
  }

}


start();


