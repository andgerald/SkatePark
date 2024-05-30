import { skatersController } from "../controllers/index.js";
import { Router } from "express";

const router = Router();

//ruta get para handlebars
router.get("/", skatersController.home);
router.get("/admin", skatersController.admin);

//ruta get para traer todos los skaters desde la base de datos
router.delete("/skaters/:id", skatersController.remove);
//ruta delete para eliminar un skaters por su id

export default router;
