const express = require("express")
const path = require("path")

const app = express();
const port = 8000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));


/**Middleware */
const checkHour = function (req, res, next) {
    const date = new Date(Date.now());
    if (date.getDay()!= 0 && date.getDay()!= 6 && date.getHours()> 9 && date.getHours()<17 ) next();
    else res.status(500).render("error");
  }
  
  app.use(checkHour);

app.get("/", (req, res) => {
    res.render("home");
  });
  app.get("/services", (req, res) => {
    res.render("services");
  });
  app.get("/contact", (req, res) => {
    res.render("contact");
  });

  app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });