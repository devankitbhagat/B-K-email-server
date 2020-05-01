require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const sendEmail = require("./send-email");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 1440 * 60 * 1000, // 1 day
  max: 10 // limit each IP to 100 requests per windowMs
});
 
//  apply to all requests
app.use(limiter);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.json());
app.use(bodyParser.json());

app.post("/sendEmail", async (req, res) => {
  try {
    const { name, mobile, message, email, subject } = req.body;
    await sendEmail(name, mobile, email, message, subject);
    res.json({ status: "OK" });
  } catch (e) {
    res.json({ status: "ERROR" });
  }
});

app.listen(port, () =>
  console.log(`Email server running at http://localhost:${port}`)
);
