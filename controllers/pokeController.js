const accountModel = require("../models/account-model")
const utilities = require("../utilities/")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const controller = {}

/* ***************************
 *  Build pokemon selection view
 * ************************** */
controller.getPokewar = async function(req, res, next){
    res.render("./pokemon-views/pokewar.ejs", {title: "I Choose You!", message:null})
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
    const accountData = await accountModel.checkClient(
        client_email,
        client_password,
      )
      if (accountData) {
          try {
            const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
            res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
            let pokemon1 = null;
            let pokemon2 = null;
            let pokemon3 = null;
            let pokemon4 = null;
            const team = await accountModel.getTeamById(accountData.client_id)
            const client_dada = await accountModel.getClientById(accountData.client_id)
            if(team.length == 0){
                pokemon1 = null;
                pokemon2 = null;
                pokemon3 = null;
                pokemon4 = null;
            }else if(team.length == 1){
                pokemon1 = team[0].pokemon_img
                pokemon2 = null;
                pokemon3 = null;
                pokemon4 = null;
            }else if(team.length == 2){
                pokemon1 = team[0].pokemon_img
                pokemon2 = team[1].pokemon_img
                pokemon3 = null;
                pokemon4 = null;
            }else if(team.length == 3){
                pokemon1 = team[0].pokemon_img
                pokemon2 = team[1].pokemon_img
                pokemon3 = team[2].pokemon_img
                pokemon4 = null;
            }else if(team.length == 4){
                pokemon1 = team[0].pokemon_img
                pokemon2 = team[1].pokemon_img
                pokemon3 = team[2].pokemon_img
                pokemon4 = team[3].pokemon_img
            }

            return res.render("./pokemon-views/team", {
                title: "Your Team",
                pokemon1,
                pokemon2,
                pokemon3,
                pokemon4,
                client_team: client_dada.client_team
              })
            }
            catch (error) {
            return new Error('Access Forbidden')
           }
      } else {
        const message = "Sorry, we couldn't log you in try to create a new account."
        res.status(501).render("./pokemon-views/sign-up", {
          title: "Sign-up",
          message,
        })
      }
    }

/* ****************************************
*  Logs out the client
**************************************** */

controller.logoutClient = async function (req, res) {
    res.clearCookie("jwt")
    return res.redirect("/")
  }


/* ****************************************
*  Delivers the battle view
**************************************** */
controller.getBattleView = async function(req, res, next){

    const client_id = res.locals.accountData.client_id
    let pokemon1 = null;
    let pokemon2 = null;
    let pokemon3 = null;
    let pokemon4 = null;
    
    let randomPokemon1 = null;
    let randomPokemon2 = null;
    let randomPokemon3 = null;
    let randomPokemon4 = null;
    const team = await accountModel.getTeamById(client_id)
    const client_dada = await accountModel.getClientById(client_id)

    console.log(client_dada)
    if(team.length == 0){
        pokemon1 = null;
        pokemon2 = null;
        pokemon3 = null;
        pokemon4 = null;
    }else if(team.length == 1){
        pokemon1 = team[0].pokemon_img
        pokemon2 = null;
        pokemon3 = null;
        pokemon4 = null;
    }else if(team.length == 2){
        pokemon1 = team[0].pokemon_img
        pokemon2 = team[1].pokemon_img
        pokemon3 = null;
        pokemon4 = null;
    }else if(team.length == 3){
        pokemon1 = team[0].pokemon_img
        pokemon2 = team[1].pokemon_img
        pokemon3 = team[2].pokemon_img
        pokemon4 = null;
    }else if(team.length == 4){
        pokemon1 = team[0].pokemon_img
        pokemon2 = team[1].pokemon_img
        pokemon3 = team[2].pokemon_img
        pokemon4 = team[3].pokemon_img
    }

    function random_item(items)
    {return items[Math.floor(Math.random()*items.length)];}
    
    const clientList = await accountModel.getClientList()
    const randomClient = random_item(clientList)
    console.log("randomClient")
    console.log(randomClient)
    const randomClientData = await accountModel.getClientById(randomClient.client_id)
    console.log("randomClientData");
    console.log(randomClientData);
    const randomTeam = await accountModel.getTeamById(randomClient.client_id)
    console.log("randomTeam")
    console.log(randomTeam)

    if(randomTeam.length == 0){
        randomPokemon1 = null;
        randomPokemon2 = null;
        randomPokemon3 = null;
        randomPokemon4 = null;
    }else if(randomTeam.length == 1){
        randomPokemon1 = randomTeam[0].pokemon_img
        randomPokemon2 = null;
        randomPokemon3 = null;
        randomPokemon4 = null;
    }else if(randomTeam.length == 2){
        randomPokemon1 = randomTeam[0].pokemon_img
        randomPokemon2 = randomTeam[1].pokemon_img
        randomPokemon3 = null;
        randomPokemon4 = null;
    }else if(randomTeam.length == 3){
        randomPokemon1 = randomTeam[0].pokemon_img
        randomPokemon2 = randomTeam[1].pokemon_img
        randomPokemon3 = randomTeam[2].pokemon_img
        randomPokemon4 = null;
    }else if(randomTeam.length == 4){
        randomPokemon1 = randomTeam[0].pokemon_img
        randomPokemon2 = randomTeam[1].pokemon_img
        randomPokemon3 = randomTeam[2].pokemon_img
        randomPokemon4 = randomTeam[3].pokemon_img
    }
  res.render("./pokemon-views/battle.ejs", {
    title: "Lets Battle!",
    pokemon1,
    pokemon2,
    pokemon3,
    pokemon4,
    client_team: client_dada.client_team,
    randomPokemon1,
    randomPokemon2,
    randomPokemon3,
    randomPokemon4,
    randomTeam: randomClientData.client_team
})
}
/* ****************************************
*  adds the pokemon to the user's team
**************************************** */

controller.addToTeam = async function (req, res) {
    const { pokemon_name, pokemon_image, pokemon_id, pokemon_type, } = req.body
        const client_id = res.locals.accountData.client_id
        const pokemon_number = pokemon_id
        const pokemon_img = pokemon_image
    const savePokemon = await accountModel.savePokemon(client_id, pokemon_number, pokemon_name, pokemon_type, pokemon_img)
    if(savePokemon){
        res.render("./pokemon-views/pokewar.ejs", {title: "I Choose You!", message: 'Pokemon saved in your account!'})
    }
  }


module.exports = controller