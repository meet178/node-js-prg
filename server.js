const express = require("express")
const router = require("./routes/collection")
const mongoose = require("./config/database")
const bodyparser = require("body-parser");

const app = express()
app.use(bodyparser.json())

mongoose.connection.on(
    "error",
    console.error.bind(console,"MongoDB connection error:")
);
mongoose.connection.on(
    'connected',
    console.error.bind(console, 'MongoDB connection successfull')
  );

app.use("/start_api", router)


let port = 5055

app.listen(port,()=>{
    console.log(`The port is run on ${port}`);
})