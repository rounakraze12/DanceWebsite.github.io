const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/DanceContatct");
}
//define mongoose schema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  Email: String,
  Adress: String,
  desc: String,
});
const contact = mongoose.model("Contact", contactSchema);

//express specific stuff
app.use("/static", express.static("static"));
app.use(express.urlencoded());

//pug related stuff
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//ENDPOINT
app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("index.pug", params);
});
app.get("/contact", (req, res) => {
  const params = {};
  res.status(200).render("contactus.pug", params);
});
app.post("/contact", (req, res) => {
  const myData = new contact(req.body);
  myData
    .save()
    .then(() => {
      res.send("this item hasbeen save to the database");
    })
    .catch(() => {
      res.status(400).send("item was not save try again!");
    });

  //res.status(200).render("contactus.pug");
});
//START THE SERVER
app.listen(port, () => {
  console.log(`the application started successfully on port ${port}`);
});
