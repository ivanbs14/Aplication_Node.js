/* imports */
const { Router } = require("express");

const TagsController = require("../controllers/TagsController");

/* instanciando rota na memoria */
const tagsRoutes = Router();

const tagsController = new TagsController();

/* utilizando metodo GET receber as tags do users*/
tagsRoutes.get("/:user_id", tagsController.index);

/* exportando o userRoutes */
module.exports = tagsRoutes;