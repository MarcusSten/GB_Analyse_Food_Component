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

var composition = "";

// --- запросы на сервер ---
// app.get();
// app.post();
// app.put();
// app.patch();
// app.delete();

// ===>  http://localhost:3001/test
app.get("/test", (req, res) => {
  console.log(harmful);
  //   res.send(harmful);
  //   res.json(harmful);
});

app.post("/test", (req, res) => {
  const newStr = req.body;
  if (newStr === String) {
    composition = newObj;
    res.json(composition);
  }
  res.sendStatus(400);
});

// http://localhost:3001 -- наш хост

app.listen(3001, () => {
  console.log("servak start");
});
