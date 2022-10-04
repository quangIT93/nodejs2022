const mongoose = require("mongoose");

// const { ServerApiVersion } = require("mongoDB");
const { MongoClient, ServerApiVersion } = require("mongodb");
async function connect() {
  try {
    console.log("kiem tra ket noi");
    await mongoose.connect(
      `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@mern-1.yfpitpg.mongodb.net/${process.env.NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
      }
    );
    console.log("ket noi thanh cong");
  } catch (error) {
    console.log("ket noi that bai");
    console.log(error);
    process.exit(1);
  }
}

module.exports = { connect };
