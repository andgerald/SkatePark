import "dotenv/config";
import pool from "../database/dbConfig.js";

//Regresa todos los skaters
const findAll = async () => {
  const result = await pool.query("SELECT * FROM skaters");
  return result.rows;
};

//Se elimina un skater segun su id
const remove = async (id) => {
  const result = await pool.query(
    "DELETE FROM skaters WHERE id=$1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

// se actulizan datos
const update = async (nombre, anos_experiencia, especialidad, id) => {
  const result = await pool.query(
    "UPDATE skaters SET nombre =$1, anos_experiencia = $2, especialidad= $3 WHERE id= $4 RETURNING *",
    [nombre, anos_experiencia, especialidad, id]
  );
  return result.rows[0];
};

//se actuliza el estado
const updateState = async (id, estado) => {
  const result = await pool.query(
    "UPDATE skaters SET estado= $2 WHERE id= $1 RETURNING *",
    [id, estado]
  );

  return result.rows[0];
};

const loginSkaters = async (email, password) => {
  const result = await pool.query(
    "SELECT email, password FROM skaters WHERE email=$1 AND password = $2",
    [email, password]
  );
  console.log(email);
  return result.rows[0];
};

export const skatersModel = {
  findAll,
  // create,
  remove,
  update,
  updateState,
  loginSkaters,
};
