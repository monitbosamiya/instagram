const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const { v4: uuidv4 } = require("uuid");
var methodOverride = require("method-override");

app.use(methodOverride("_method"));

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
    pp: "/images/monit.jpg",
    desc: "either i will WIN or DIE TRYING.",
    p1: "https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067_640.png",
    p2: "https://images.unsplash.com/photo-1503424886307-b090341d25d1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
    p3: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrs_aEH1FTrhzDcQIlGWEbZb-whsoIiRmUPg&s",
    p4: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS9uckMZDyN8Dqg0XDVq25CoR6b7aAsOZC5w&s",
  },
  {
    id: uuidv4(),
    username: "Bhargav",
    post: 3,
    followers: 100,
    following: 100,
    pp: "/images/bhargav.jpg",
    desc: "",
    p1: "https://i.pinimg.com/736x/d2/6d/2a/d26d2aab2ff63cb48b3a91b0e8e0aa55.jpg",
    p2: "https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/rolls_royce_phantom_top_10.jpg?itok=XjL9f1tx",
    p3: "https://www.autocar.co.uk/sites/autocar.co.uk/files/images/car-reviews/first-drives/legacy/100-best-luxury-cars.jpg",
  },
];

app.get("/profile", (req, res) => {
  res.render("index.ejs", { profiles });
});

app.get("/profile/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/profile/:id", (req, res) => {
  let { id } = req.params;
  let profile = profiles.find((p) => id === p.id);
  res.render("profile.ejs", { profile });
});

app.post("/profile", (req, res) => {
  let { username } = req.body;
  let id = uuidv4();
  let post = 0;
  let followers = 0;
  let following = 0;
  profiles.push({ id, username, post, followers, following });
  res.redirect("/profile");
});

app.delete("/profile/:id", (req, res) => {
  let { id } = req.params;
  profiles = profiles.filter((p) => id !== p.id);
  res.redirect("/profile");
});
