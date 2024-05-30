import "dotenv/config";
import pool from "../database/dbConfig.js";

//Regresa todos los skaters
const findAll = async () => {
  const result = await pool.query("SELECT * FROM skaters");
  return result.rows;
};

const remove = async (id) => {
  const result = await pool.query(
    "DELETE FROM skaters WHERE id=$1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

const updateState = async (id, estado) => {
  const result = await pool.query(
    "UPDATE skaters SET estado= $2 WHERE id= $1 RETURNING *",
    [id, estado]
  );

  return result.rows[0];
};

export const skatersModel = {
  findAll,
  // create,
  remove,
  updateState,
};
