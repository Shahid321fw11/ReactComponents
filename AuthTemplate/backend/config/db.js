const mongoose = require("mongoose");
require("dotenv").config();

const connectionWithMongoose = async () => {
  try {
    await mongoose.connect(process.env.Mongo_URI, {
      useNewUrlParser: true,
    });
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log("err", error);
    throw error;
  }
};

module.exports = connectionWithMongoose;
