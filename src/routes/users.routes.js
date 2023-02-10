/* imports */
const { Router } = require("express");

const UserController = require("../controllers/UserController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

/* instanciando rota na memoria */
const usersRoutes = Router();

const userController = new UserController();

/* utilizando metodo POST para enviar e receber users*/
usersRoutes.post("/", userController.create);

/* utilizando metodo PUT para updated dados */
usersRoutes.put("/", ensureAuthenticated, userController.update);

/* exportando o userRoutes */
module.exports = usersRoutes;