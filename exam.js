const mongoose = require("mongoose");

// 디비 연결
mongoose
  .connect("mongodb://localhost/admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Successfully connected to mongodb"))
  .catch((e) => console.error(e));

// disconnect시 재연결
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("DB connected");
});

// 스키마 설정
const CatSchema = mongoose.Schema(
  { name: String, age: Number },
  { collection: "Cats" } // collection 명칭 지정
);

// 모델 명칭 설정
const Cat = mongoose.model("Kitty", CatSchema);
console.log(Cat);

insert = () => {
  var silence = new Cat({ name: "Silence", age: 3 });
  silence.save();

  var adam = new Cat({ name: "Adam", age: 1 });
  adam.save();

  var ross = new Cat({ name: "Ross", age: 5 });
  ross.save();
};

update = () => {
  Murdock = { name: "Murdock", age: 4 };

  Cat.updateOne({ name: "Ross" }, Murdock, (err, kitties));
  Cat.updateMany({ name: "Ross" }, Murdock, (err, kitties));
};

deleteQeury = () => {
  Cat.remove();
};
