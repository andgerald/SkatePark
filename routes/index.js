import { skatersController } from "../controllers/index.js";
import { Router } from "express";

const router = Router();

//ruta get para handlebars
router.get("/", skatersController.home);
//ruta get para traer todos los skaters desde la base de datos
router.get("/skaters", skatersController.findAll);

export default router;
