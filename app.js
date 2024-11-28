require("dotenv").config();
const express = require("express");
const path = require("path");
const quoteRoutes = require("./routes/quotesRoutes.js"); // Import routes
const userRoutes = require("./routes/userRoutes.js"); // Import routes
const profileRoutes = require("./routes/profileRoutes.js"); // Import routes
const connectDB = require("./config/database");

//Setup
const app = express();
app.use(express.static("build"));
app.use(express.urlencoded());
app.use(express.json());

//DB conncetion
connectDB();

//Routes
app.use("/api/quotes",quoteRoutes)
app.use("/api/user",userRoutes)
app.use("/api/profile",profileRoutes)

app.use((req, res) => {
    res.sendFile(path.join(__dirname, ".", "build" , "index.html"));
  });

app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT || 5000} `));