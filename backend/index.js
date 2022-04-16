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

// --- запросы на сервер ---
// app.get();
// app.post();
// app.put();
// app.patch();
// app.delete();

// ===>  http://localhost:3001/names

app.get("/", (req, res)=>{
  console.log("ROOT")
  res.send("<h1>OK</h1>")
})

app.get("/names/:id", (req, res)=>{
  const additiveName = req.params.id.toUpperCase();

  // *** находим совпадение по имени (additiveName) в базе названий элементов (names) ***
  const additiveId = names.filter((element)=>{
    return element["names"].find((item)=>{return item.toUpperCase() === additiveName})
  })

  // *** находим обьект в базе ингридиентов (harmful) по найденому имени (additiveId) из базы названий (names)   ***
  if (additiveId && additiveId.length) {
    const harmfulObject = harmful.find((item)=>item.name === additiveId[0].id)
    res.send(harmfulObject)
  } else {
    res.send('Not found')
  }
})

// http://localhost:3001 -- наш хост

app.listen(3001, () => {
  console.log("servak start");
});
