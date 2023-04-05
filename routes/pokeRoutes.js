// Needed Resources 
const express = require("express")
const router = new express.Router() 
const pokeController = require("../controllers/pokeController")

router.get("/pokewar", pokeController.getPokewar);


module.exports = router; 