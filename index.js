const bodyParser = require("body-parser");
const express    = require("express");
const nodemailer = require("nodemailer");
const app        = express();

app.use(bodyParser.urlencoded({ extended: false  }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "khansservicenode@gmail.com",
    pass: "khansservice"
  }
});

app.get("/:email", (req, res) => {
  const { email } = req.params;
  const mailOptions = {
    from:    "youremail@gmail.com",
    to:      email,
    subject: "Sending emails from node.",
    text:    "You have been attacked!"
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if(err) {
      console.log(err);
    } else {
      res.status(200).json({ "status": "Mail sent!" })
    }
  });
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
