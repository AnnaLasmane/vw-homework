const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`App listening on port ${port}!`));

app.post("/form", (req, res) => {
  console.log(req.headers);
  if (!req.headers["x-api-key"] || req.headers["x-api-key"] !== "letmein") {
    res.status(400).json({ error: "API key not specified" });
    return;
  }

  if (!req.body) {
    res.status(400).json({ error: "Body not specified" });
    return;
  }

  if (!req.body.firstname) {
    res.status(400).json({ error: "No firstname specified" });
    return;
  }

  if (!req.body.lastname) {
    res.status(400).json({ error: "No lastname specified" });
    return;
  }

  if (!req.body.email) {
    res.status(400).json({ error: "No email specified" });
    return;
  }

  if (!req.body.car) {
    res.status(400).json({ error: "No car specified" });
    return;
  }

  if (!req.body.purchasedate) {
    res.status(400).json({ error: "No purchasedate specified" });
    return;
  }

  const id = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  const response = { requestId: id(), ...req.body };
  res.status(200).send(response);
});
