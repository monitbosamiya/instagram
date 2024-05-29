const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const { v4: uuidv4 } = require("uuid");

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.listen(port, () => {
  console.log(`Listening on port${port}`);
});

let profiles = [
  {
    id: uuidv4(),
    username: "monit",
    post: 4,
    followers: 100,
    following: 100,
    pp: "images/monit.jpg",
  },
  {
    id: uuidv4(),
    username: "Bhargav",
    post: 54,
    followers: 100,
    following: 100,
    pp: "images/bhargav.jpg",
  },
];

app.get("/profile", (req, res) => {
  res.render("index.ejs", { profiles });
});

app.get("/profile/:id", (req, res) => {
  let { id } = req.params;
  let profile = profiles.find((p) => id === p.id);
  res.render("profile.ejs", { profile });
});
