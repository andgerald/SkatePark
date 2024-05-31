import jwt from "jsonwebtoken";
import "dotenv/config";

const { SECRET_KEY } = process.env;
export const verifyToken = (req, res, next) => {
  const token = req.query.token;
  if (!token) {
    return res.status(401).send("No hay token, no esta Autorizado");
  } else {
    jwt.verify(token, SECRET_KEY, (err, data) => {
      if (err) {
        res.status(403).send("Token inválido o ha expirado");
      }
      req.skaters = data;
      next();
    });
  }
};
