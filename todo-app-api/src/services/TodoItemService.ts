import { v4 as uuidv4 } from "uuid";
import { TodoItemRepo } from "../repos/TodoItemRepo";
import { TodoItem } from "../entities/TodoItem";

export class TodoItemService {
    private todoItemRepo: TodoItemRepo;

    constructor() {
        this.todoItemRepo = new TodoItemRepo();
    }

    async save(todoItem: TodoItem) {
        try {
            let isValid = await this.validate(todoItem);
            if (isValid) {
                let todoItemsData = await this.todoItemRepo.save(todoItem);
                let returnData = {
                    id: todoItem.id,
                    message: "Saved Successfully!!",
                };
                return returnData;
            } else {
                let returnData = { message: "Please enter valid data" };
                throw returnData;
            }
        } catch (error) {}
    }

    async validate(todoItem: TodoItem) {
        if (!todoItem.id || todoItem.id == "" || todoItem.id == "0") {
            let uid = uuidv4();
            todoItem.id = uid;
        }
        return true;
    }

    async findAll(filter: string) {
        try {
            let data: any = await this.todoItemRepo.search(filter);
            return data;
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: any) {
        try {
            let data: any = await this.todoItemRepo.findById(id);
            return data;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: any) {
        try {
            let data: TodoItem = await this.todoItemRepo.findById(id);

            let result: any = await this.todoItemRepo.delete(data);

            let returnData = { id: id, message: "Removed Successfully" };

            return returnData;
        } catch (error) {
            throw error;
        }
    }
}
