const accountModel = require("../models/account-model")
const utilities = require("../utilities/")


const controller = {}

/* ***************************
 *  Build pokemon selection view
 * ************************** */

controller.getPokewar = async function(req, res, next){
    utilities.buildPokewar();
    utilities.renderPokeModal();
    res.render("./pokemon-view/pokewar.ejs")
}

module.exports = controller