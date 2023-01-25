/* imports */
require("express-async-errors");

const AppError = require("./utils/appError");
const migrationsRun = require("./database/sqlite/migrations");

const express = require("express");

const routes = require("./routes");

migrationsRun();
/* inicializando express */
const app = express();
/* avisando para o serve qual tipo de requisiçao ele vai receber */
app.use(express.json());

app.use(routes);

/* tratamento de error */
app.use(( error, request, response, next ) => {
    /* error pelo usuario */
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error);

    /* error de servidor/codigo */
    return response.status(500).json({
        status: "error",
        message: "Internal server error",
    });
})

/* criando constante para definir porta onde a API vai ficar observando*/
const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));