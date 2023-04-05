const pool = require("../database/")

/* ***************************
 *  Get all accounts data
 * ************************** */
async function getAccounts(){
    return await pool.query("SELECT * FROM public.user ORDER BY classification_name")
  }
  
  module.exports = {getAccounts}