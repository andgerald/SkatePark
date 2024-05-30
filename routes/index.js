import { skatersController } from "../controllers/index.js";
import { Router } from "express";

const router = Router();

//ruta get para handlebars
router.get("/", skatersController.home);
router.get("/admin", skatersController.admin);
router.get("/registro", skatersController.registro);
router.get("/login", skatersController.login);

//ruta get para traer todos los skaters desde la base de datos
router.get("/skaters", skatersController.findAll);
//ruta delete para eliminar un skaters por su id
router.delete("/skaters/:id", skatersController.remove);
//ruta para actulizar el estado
router.put("/skaters/status/:id", skatersController.updateState);

export default router;
