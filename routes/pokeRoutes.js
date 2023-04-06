// Needed Resources 
const express = require("express")
const router = new express.Router() 
const pokeController = require("../controllers/pokeController")

/* ***************************
 *  Deliver pokewar view
 * ************************** */
router.get("/pokewar", pokeController.getPokewar);

/* ***************************
 *  Deliver login view
 * ************************** */
router.get("/login", pokeController.getLogin);

/* ***************************
 *  Process the login
 * ************************** */
router.post("/login/", pokeController.login);

/* ***************************
 *  Process the logout
 * ************************** */
router.get("/logout", pokeController.logoutClient);

/* ***************************
 *  Deliver sign-up view
 * ************************** */
router.get("/sign-up", pokeController.getSignUp);

/* ***************************
 *  Process the Sign-up request
 * ************************** */
router.post("/sign-up/", pokeController.signUp);


module.exports = router; 