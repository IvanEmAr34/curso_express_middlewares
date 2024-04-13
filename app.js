const debug = require("debug")("app:inicio");
const express = require("express");
// const customLogger = require("./customMIddlewares/logger");
const morgan = require("morgan");
const config = require("config");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use(customLogger);

//Configuracion de entornos
console.log("Application: ", config.get("nombre"));
console.log("DB server: ", config.get("configDB.host"));

//MIddelware de tercero
if (app.get("env") === "development") {
  debug("Morgan esta habilitado");
  app.use(morgan("tiny"));
}
// trabajo con db
debug("conectado con la db");

const users = [
  {
    id: 1,
    name: "Ivan",
  },
];

const port = config.get("port");

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.post("/api/users", (req, res) => {
  let body = req.body;
  if (body.name && body.name !== "") {
    console.log(body);
    const newUser = {
      id: users.length + 1,
      name: body.name,
    };
    users.push(newUser);
    res.json(newUser);
    return;
  }
  res.status(400).send("invalid name");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
