const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const { populate } = require("dotenv");
require('dotenv').config();
const app= express();


app.use( bodyParser.urlencoded({ extended: true }) );
app.use(express.static("public"));
app.set("view engine", "ejs");

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', async function(){
    console.log("SErver up")
})

var ansSchema = new mongoose.Schema({
  
    empid: {type: String,},
    q1: {type: String,},
    q2: {type: String},
    q3: {type: String},
    q4: {type: String},
    q5: {type: String},
    q6: {type: String,},
    q7: {type: String},
    q8: {type: String},
    q9: {type: String},
    q10: {type: String},
    q11: {type: String},
    q12: {type: String,},
    q13: {type: String},
    q14: {type: String},
    q15: {type: String},
    q16: {type: String},
    q17: {type: String},
    q18: {type: String,},
    q19: {type: String},
    q20: {type: String},
    q21: {type: String},
    q22: {type: String},
    q23: {type: String},
    q24: {type: String,},
    q25: {type: String},
    q26: {type: String},
    q27: {type: String},
    q28: {type: String},
    q29: {type: String},
    q30: {type: String},
    q31: {type: String},
    q32: {type: String},
    q33: {type: String},
    q34: {type: String},
    q35: {type: String},
    q36: {type: String},
    q37: {type: String},
    q38: {type: String},
    q39: {type: String},
    q40: {type: String},
    q41: {type: String},
    gender: {type: String},
    years: {type: String},
    age: {type: String},
    location: {type: String},
    unit: {type: String},
    band: {type: String},
});

var Ans = mongoose.model("Ans", ansSchema);





app.get('/', function(req, res) {
    res.render("index", {redirect: "/consent?"+req.url.split("?")[1]});
});

app.get("/consent", function(req, res) {
    var link = req.url.split("?")[1];
    res.render("consent", {sonata_form: "/sonata_form?"+link, parity_form: "/parity_form?"+link, accept:"/survey?"+link, decline:"/thankno?"+link});
});

app.get("/sonata_form", function(req, res) {
    res.render("sonata_form", {backtosurvey: "/consent?"+req.url.split("?")[1]})
});

app.get("/parity_form", function(req, res) {
    res.render("parity_form", {backtosurvey: "/consent?"+req.url.split("?")[1]})
});


app.get("/indexnext", function (req, res) {
    res.render("consent");
});

app.get("/tnc", function(req, res) {
    res.render("survey")
})

app.get("/cnt", function(req, res) {
    res.send("ok")
})



app.get("/survey", function(req, res) {
    const URL = req.url;
  const uri = (URL.split("?")[1])
  console.log(uri);
  var something = "/submit?"+uri;
    res.render("survey",{hello: something});
});

app.get("/thankno", function(req, res) {
    res.render("thankno");
});

app.get("/thank", function(req, res) {
    res.render("thank");
});

app.post("/submit", async function (req, res) {

    const url = req.url
    const uri =(url.split("?")[1])

    const ans = new Ans({
    empid: uri,
    q1: req.body.q1,
    q2: req.body.q2,
    q3: req.body.q3,
    q4: req.body.q4,
    q5: req.body.q5,
    q6: req.body.q6,
    q7: req.body.q7,
    q8: req.body.q8,
    q9: req.body.q9,
    q10: req.body.q10,
    q11: req.body.q11,
    q12: req.body.q12,
    q13: req.body.q13,
    q14: req.body.q14,
    q15: req.body.q15,
    q16: req.body.q16,
    q17: req.body.q17,
    q18: req.body.q18,
    q19: req.body.q19,
    q20: req.body.q20,
    q21: req.body.q21,
    q22: req.body.q22,
    q23: req.body.q23,
    q24: req.body.q24,
    q25: req.body.q25,
    q26: req.body.q26,
    q27: req.body.q27,
    q28: req.body.q28,
    q29: req.body.q29,
    q30: req.body.q30,
    q31: req.body.q31,
    q32: req.body.q32,
    q33: req.body.q33,
    q34: req.body.q34,
    q35: req.body.q35,
    q36: req.body.q36,
    q37: req.body.q37,
    q38: req.body.q38,
    q39: req.body.q39,
    q40: req.body.q40,
    q41: req.body.q41,
    gender: req.body.gender,
    years: req.body.years,
    age: req.body.age,
    location: req.body.location,
    unit: req.body.unit,
    band: req.body.band,

});
  await ans.save();
  res.redirect("/thank?"+uri);
});


app.listen("5000", () => {
    console.log('Server started at http://localhost:5000');
});
