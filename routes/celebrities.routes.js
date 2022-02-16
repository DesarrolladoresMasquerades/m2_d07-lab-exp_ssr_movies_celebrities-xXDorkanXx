// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.route("/celebrities/create")
.get((req,res)=>{res.render("celebrities/new-celebrity")})
.post((req,res)=>{
    const {name, occupation, catchPhrase} = req.body;
    Celebrity.create({name, occupation, catchPhrase})
    .then(()=>{res.redirect("/celebrities")})
    .catch((err)=>{res.render("celebrities/new-celebrity")});
})

router.get("/celebrities", (req, res)=>{
    Celebrity.find()
    .then((celebrities)=>{res.render("celebrities/celebrities.hbs", {celebrities})})
    .catch((err)=>{console.log(err)});
})

module.exports = router;