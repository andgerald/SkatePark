import "dotenv/config";
import pool from "../database/dbConfig.js";

//Regresa todos los skaters
const findAll = async () => {
  const result = await pool.query("SELECT * FROM skaters");
  return result.rows;
};

const remove = async (id) => {
  [id];
  const result = await pool.query(
    "DELETE FROM skaters WHERE id=$1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

export const skatersModel = {
  findAll,
  // create,
  remove,
  // update,
};
