const accountModel = require("../models/account-model")
const utilities = require("../utilities/")


const controller = {}

/* ***************************
 *  Build pokemon selection view
 * ************************** */
controller.getPokewar = async function(req, res, next){
    res.render("./pokemon-views/pokewar.ejs", {title: "I Choose You!"})
}

/* ***************************
 *  Build Login view
 * ************************** */
controller.getLogin = async function(req, res, next){
    res.render("./pokemon-views/login", {title: "Login", message: null})
}

/* ***************************
 *  Build Sign-up view
 * ************************** */
controller.getSignUp = async function(req, res, next){
    res.render("./pokemon-views/sign-up", {title: "Sign-up", message: null})
}

/* ***************************
 *  Process account registration 
 *  and return login view
 * ************************** */
controller.signUp = async function(req, res, next){
    const { client_firstname, client_lastname, client_team, client_email, client_password } =
    req.body
    const regResult = await accountModel.registerClient(
        client_firstname,
        client_lastname,
        client_email,
        client_password,
        client_team,
      )
      if (regResult) {
        res.status(201).render("./pokemon-views/login", {
          title: "Login",
          message: `Congratulations, you\'re registered ${client_firstname} ${client_lastname}. Please log in.`,
        })
      } else {
        const message = "Sorry, the registration failed."
        res.status(501).render("./pokemon-views/sign-up", {
          title: "Sign-up",
          message,
        })
      }
    }

/* ***************************
 *  Process login
 *  and return the Team view
 * ************************** */
controller.login = async function(req, res, next){
    const { client_email, client_password } = req.body
    console.log("this is the email from the login view displayed from the controller")
    console.log(client_email)
    const regResult = await accountModel.checkClient(
        client_email,
        client_password,
      )
      if (regResult == true) {
        res.status(201).render("./pokemon-views/team", {
          title: "Your Team",
        })
      } else {
        const message = "Sorry, we couldn't log you in try to create a new account."
        res.status(501).render("./pokemon-views/sign-up", {
          title: "Sign-up",
          message,
        })
      }
    }

module.exports = controller