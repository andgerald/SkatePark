import { skatersController } from "../controllers/index.js";
import { verifyToken } from "../middleware/jwt.js";
import { Router } from "express";
const router = Router();

//ruta get para  vistas de handlebars
router.get("/", skatersController.home);
router.get("/admin", skatersController.admin);
router.get("/registro", skatersController.registro);
router.get("/login", skatersController.login);
router.get("/perfil", verifyToken, skatersController.perfil);
//ruta para login
router.post("/login", skatersController.loginSkaters);

//ruta get para traer todos los skaters desde la base de datos
router.get("/skaters", skatersController.findAll);
//ruta delete para eliminar un skaters por su id
router.delete("/skaters/:id", skatersController.remove);
//ruta para actulizar datos de skaterk
router.put("/skaters", skatersController.update);
//ruta para actulizar el estado
router.put("/skaters/status/:id", skatersController.updateState);

export default router;
