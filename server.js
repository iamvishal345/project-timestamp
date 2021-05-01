import express from "express";
const app = express();
import { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date", function (req, res) {
  const date = req.params.date;
  let resDate;
  if (!date) {
    resDate = new Date();
  } else {
    if (!isNaN(date)) {
      resDate = new Date(parseInt(date));
    } else {
      resDate = new Date(date);
    }
  }
  if (resDate.toString === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: resDate.getTime(), utc: resDate.toUTCString() });
  }
});

// listen for requests :)
const listener = app.listen(8080, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
