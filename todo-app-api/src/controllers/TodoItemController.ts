import { Router } from "express";
import { TodoItem } from "../entities/TodoItem";
import { TodoItemService } from "../services/TodoItemService";
import { App } from "../utils/App";

export class TodoItemController {
    private router: Router = Router();
    private service = new TodoItemService();

    getRouter(): Router {
        this.router.get("/list", App.verifyToken, async (request: any, response: any) => {
            try {
                let reqData: any;
                reqData = request.query ? request.query : {};
                let result: TodoItem = null;
                result = await this.service.findAll(reqData);
                response.send({ status: 1, data: result });
            } catch (error) {
                throw error;
            }
        });

        this.router.get("/item", App.verifyToken, async (request: any, response: any) => {
            try {
                let reqData: any;
                reqData = request.query ? request.query : {};
                let result: TodoItem = null;
                result = await this.service.findOne(reqData.id);
                response.send({ status: 1, data: result });
            } catch (error) {
                throw error;
            }
        });

        this.router.post("/save", App.verifyToken, async (request: any, response: any) => {
            try {
                let reqData: any = {};
                reqData = request.body ? request.body.data : {};
                let result = null;
                result = await this.service.save(reqData);
                response.send({ status: 1, data: result });
            } catch (error) {
                response.send({ status: 0, error: error });
            }
        });

        this.router.delete("/:id", App.verifyToken, async (req: any, res: any) => {
            try {
                let reqData: any;
                let result = null;
                reqData = req.params.id;
                if (reqData) {
                    result = await this.service.delete(reqData);
                } else {
                    throw new Error("Somthing went worng please try again");
                }
                res.send({ status: 1, data: result });
            } catch (error) {
                res.send({ status: 0, error: error });
            }
        });

        return this.router;
    }
}
