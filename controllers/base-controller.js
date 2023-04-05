const baseController = {}

baseController.buildHome = async function(req, res){
  res.render("index", {title: "Home"})
}

baseController.buildPokewar = async function(req, res){
  res.render("pokemon-views/pokewar", {title: "Home"})
}

module.exports = baseController