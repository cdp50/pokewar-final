const pool = require("../database/")

/* ***************************
 *  Get all accounts data
 * ************************** */
async function getAccounts(){
    return await pool.query("SELECT * FROM public.user ORDER BY classification_name")
  }

/* ***************************
 *  Register new client
 * ************************** */
async function registerClient(
  client_firstname,
  client_lastname,
  client_email,
  client_password,
  client_team,
) {
  try {
      const sql = 
      "INSERT INTO public.client (client_firstname, client_lastname, client_email, client_password, client_team) VALUES ($1, $2, $3, $4, $5) RETURNING *"
      return await pool.query(sql, [
          client_firstname,
          client_lastname,
          client_email,
          client_password,
          client_team,
      ])
  } catch (error) {
      return error.message
  }
}

/* ***************************
 *  Check client 
 * ************************** */
async function checkClient(
  client_email,
  client_password,
) {
  try {
      const sql = 
      "SELECT * FROM public.client WHERE client_email = $1"
      const result = await pool.query(sql, [client_email])
      if(result.rows[0].client_password == client_password){
        return result.rows[0]
      }else{
        return null
      }
  } catch (error) {
      return error.message
  }
}

/* ***************************
 *  get all the pokemons of the client by id
 * ************************** */
async function getTeamById(
  client_id
) {
  try {
      const sql = 
      "SELECT * FROM public.pokemon WHERE client_id = $1"
      const result = await pool.query(sql, [client_id])
      return result.rows
  } catch (error) {
      return error.message
  }
}

/* ***************************
 *  save pokemon
 * ************************** */
async function savePokemon(
  client_id,
  pokemon_number,
  pokemon_name,
  pokemon_type,
  pokemon_img
) {
  try {
      const sql = 
      "INSERT INTO public.pokemon (client_id, pokemon_number, pokemon_name, pokemon_type, pokemon_img) VALUES ($1, $2, $3, $4, $5) RETURNING *"
      const result = await pool.query(sql, [client_id, pokemon_number, pokemon_name, pokemon_type, pokemon_img])
      return result.rows[0]
  } catch (error) {
      return error.message
  }
}
  
  module.exports = {getAccounts, registerClient, checkClient, getTeamById, savePokemon}