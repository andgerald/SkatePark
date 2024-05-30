import "dotenv/config";
import pool from "../database/dbConfig.js";

//Regresa todos los skaters
const findAll = async () => {
  const result = await pool.query("SELECT * FROM skaters");
  return result.rows;
};

export const skatersModel = {
  findAll,
  // create,
  // remove,
  // update,
};
