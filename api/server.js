const express = require("express");
const app = express();
const authRoute = require("./routes/auth");


//Database Connection
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://EOlaw146:Olawalee_.146@cluster0.4wv68hn.mongodb.net/TVShow?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.use(express.json());


app.use("/api/auth", authRoute)



//Server configuration
app.listen(3000, () => {
    console.log("Backend server is running....")
})