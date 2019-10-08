const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const db =
  "mongodb+srv://Tunde:506SePBFB2ydMIVi@cluster0-d506y.mongodb.net/test?retryWrites=true&w=majority";
const Recipe = require("./models/recipe");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("mongodb successfully connected"))
  .catch(error => {
    console.log(error);
  });
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//Post route to add recipes
app.post("/api/recipes/", (req, res, next) => {
  const recipe = new Recipe({
    title: req.body.title,
    instructions: req.body.instructions,
    ingredients: req.body.ingredients,
    time: req.body.time,
    difficulty: req.body.difficulty
  });
  recipe
    .save()
    .then(() => {
      res.status(200).json({ message: "Recipe successfully saved" });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//get route for a specific id
app.get("/api/recipes/:id", (req, res, next) => {
  Recipe.findOne({ _id: req.params.id })
    .then(recipe => {
      res.status(200).json(recipe);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//updating route
app.put("/api/recipes/:id", (req, res, next) => {
  const recipe = {
    id: req.body.id,
    title: req.body.title,
    instructions: req.body.instructions,
    ingredients: req.body.ingredients,
    time: req.body.time,
    difficulty: req.body.difficulty
  };

  Recipe.updateOne({ _id: req.params.id }, recipe)
    .then(() => {
      res.status(200).json({ message: "recipe successfully Updated" });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//delete route
app.delete("/api/recipes/:id", (req, res, next) => {
  Recipe.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "recipe successfully deleted" });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//get all recipes route
app.get("/api/recipes/", (req, res, next) => {
  Recipe.find()
    .then(recipes => {
      res.status(200).json(recipes);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});
module.exports = app;
