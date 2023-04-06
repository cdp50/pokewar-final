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
      console.log("this is the result from the database")
      console.log(result.rows[0])
      if(result.rows[0].client_password == client_password){
        return result.rows[0]
      }else{
        return null
      }
  } catch (error) {
      return error.message
  }
}
  
  module.exports = {getAccounts, registerClient, checkClient}