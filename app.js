require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

class App {
  constructor() {
    this.app = express();
    this.dbConnection();
    const Model = this.dbModel();
    //this.insertDatatest(Model);
    //this.selectDatatest(Model);
    //this.selectDatatest(Model, { hit: 2 });
    //this.updateDatatest(Model);
    //this.deleteDatatest(Model);
  }

  dbConnection() {
    mongoose.Promise = global.Promise;

    mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then(() => console.log("Successfully connected to mongodb"))
      .catch((e) => console.error(e));
  }

  dbModel() {
    const TestsSchema = mongoose.Schema(
      {
        writer: {
          type: String,
          required: [true, "필수값 체크."],
        },
        hit: Number,
        content: String,
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
      { collection: "Tests" }
    );
    return mongoose.model("Tests", TestsSchema);
  }

  async insertDatatest(Model) {
    let query = [
      {
        title: "Hello",
        content: "첫번째글입니다.",
        writer: "admin",
        hit: 2,
      },
      {
        title: "Hi",
        content: "두번째 글입니다.",
        writer: "admin",
        hit: 23,
      },
      {
        title: "test",
        content: "세번째 글입니다.",
        writer: "test",
        hit: 10,
      },
    ];

    await Model.create(query);
  }

  async selectDatatest(Model, where) {
    let result = await Model.find(where);
    console.log(`find`);
    console.log(result);

    result = await Model.findOne(where);
    console.log(`findOne`);
    console.log(result);
  }

  async updateDatatest(Model) {
    //Model.update( 조건 , 변경 데이터);
    let set = { hit: 2000 };
    let where = { writer: "admin" };
    let result = await Model.update(where, set);
    console.log(result);
  }

  async deleteDatatest(Model) {
    //Model.remove( 조건 );
    let where = { writer: "admin" };
    let result = await Model.remove(where);
    console.log(result);
  }
}

module.exports = new App().app;
