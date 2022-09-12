const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  fs.readFile(
    path.join(__dirname, "./data/data.json"),
    { encoding: "utf-8" },
    (err, data) => {
      if (!err) {
        console.log(data, req);
        res.send(data);
      } else {
        console.log(err);
      }
    }
  );
});

app.post("/signup", async function (req, res) {
  const fetchedDataJSON = await fs.promises.readFile(
    path.join(__dirname, "./data/data.json"),
    { encoding: "utf-8" }
  );
  const fetchedData = JSON.parse(fetchedDataJSON);
  fetchedData[req.body.email] = req.body.password;
  console.log(fetchedData);
  const writeFile = await fs.promises.writeFile(
    path.join(__dirname, "./data/data.json"),
    JSON.stringify(fetchedData),
    { encoding: "utf-8" }
  );

  writeFile.then(
    (response) => {
      console.log(response);
      res.send({ success: true });
    },
    (err) => {
      console.log(err);
      res.send({ success: false });
    }
  );
});

app.post("/login", async function (req, res) {
  const fetchedDataJSON = await fs.promises.readFile(
    path.join(__dirname, "./data/data.json"),
    { encoding: "utf-8" }
  );
  const fetchedData = JSON.parse(fetchedDataJSON);
  if (
    fetchedData[req.body.email] &&
    fetchedData[req.body.email] === req.body.password
  ) {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
