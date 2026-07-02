const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to Database");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    throw err;
  }
};

module.exports = connectToDB;