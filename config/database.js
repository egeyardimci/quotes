const { default: mongoose } = require("mongoose");

const connectDB = async () => {
    try {
      const dbURI = process.env.DB_URI; // Load DB URI from environment variable
      await mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Error connecting to the database:", error);
      process.exit(1); // Exit the process if the connection fails
    }
  };

module.exports = connectDB;