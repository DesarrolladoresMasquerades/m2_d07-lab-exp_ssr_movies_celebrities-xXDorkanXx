// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.post("/movies/:id/delete", (req, res)=>{
    Movie.findByIdAndRemove(req.params.id)
    .then(()=>{res.redirect("/movies")})
    .catch((err)=>{console.log(err)})
})

router.route("/movies/:id/edit")
.get((req, res)=>{
    Movie.findById(req.params.id)
    .populate("cast")
    .then((movie)=>{
        Celebrity.find()
        .then((celebrities)=>{res.render("movies/edit-movie", {movie: movie, celebrities: {celebrities}})})
    })
})
.post((req, res)=>{
    const {title, genre, plot, cast} = req.body;
    Movie.findByIdAndUpdate(req.params.id, {title, genre, plot, cast})
    .then(()=>{res.redirect("/movies/:id")})
    .catch((err)=>{console.log(err)});
})

router.route("/movies/create")
.get((req, res)=>{
    Celebrity.find()
    .then((celebrities)=>{res.render("movies/new-movie", {celebrities})})
})
.post((req, res)=>{
    const {title, genre, plot, cast} = req.body;
    Movie.create({title, genre, plot, cast})
    .then(()=>{res.redirect("/movies")})
})

router.get("/movies/:id", (req, res)=>{
    Movie.findById(req.params.id)
    .populate("cast")
    .then((movie)=>{res.render("movies/movie-details", movie)})
    .catch((err)=>{console.log(err)})
})

router.get("/movies", (req, res)=>{
    Movie.find()
    .then((movies)=>{res.render("movies/movies.hbs", {movies})})
})

module.exports = router;