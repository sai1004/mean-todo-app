const express = require("express");
const app = express();
import { createConnection } from "typeorm";
import * as Config from "./config/config";
import { AuthController } from "./controllers/AuthController";
import { TodoItemController } from "./controllers/TodoItemController";
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const logger = require("morgan");
dotenv.config();

const port = process.env.PORT;

const initServer = async () => {
    try {
        const conn = await createConnection(Config.dbConfig);
        if (conn.isConnected) {
            const todoItemRoutes = new TodoItemController();
            const authRoutes = new AuthController();

            /* ''''''' middlewares ''''''''' */
            app.use(express.urlencoded({ extended: false }));
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(logger("common"));
            app.use(cors());

            /* ''''''' App Routes ''''''''' */
            app.get("/api", (req: any, res: any) => {
                res.json({ message: " Hello App Works!! " });
            });

            app.use("/api/todo", todoItemRoutes.getRouter());
            app.use("/api/auth", authRoutes.getRouter());

            /* ''''''' Start server ''''''''' */
            app.listen(port, (err: any) => {
                if (err) throw err;
                console.log(`
            ++++++++++++++++++++++++++++++++++++++++++++++++
            server is listening on http://127.0.0.1:${port}/api
            ++++++++++++++++++++++++++++++++++++++++++++++++
            `);
            });
        }
    } catch (error) {
        console.log(`Error While Running Server : `, error);
    }
};

initServer();
