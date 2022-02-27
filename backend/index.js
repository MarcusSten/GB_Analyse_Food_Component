const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();

// app.set();
app.use(logger("dev")); // мидлвап, который выводит все логи в консоль
app.use(cors()); // обходит политику безопасности браузера
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const harmful = require("./files/harmful.json");
const names = require("./files/names.json");

var additiveInfo = null;

// --- запросы на сервер ---
// app.get();
// app.post();
// app.put();
// app.patch();
// app.delete();

// ===>  http://localhost:3001/names
app.get("/names", (req, res) => {
  console.log("go-go-go Names List");
  res.send(names);
  //   res.json(harmful);
});

app.post("/info", (req, res) => {
  console.log("post", req.body.name);
  const newStr = req.body.name;
  if (typeof newStr === "string") {
    additiveInfo = harmful.find((item) => item.name === newStr);
    res.send(additiveInfo);
  } else {
    res.sendStatus(400);
  }
});

// http://localhost:3001 -- наш хост

app.listen(3001, () => {
  console.log("servak start");
});
