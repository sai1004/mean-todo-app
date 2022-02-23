import { getRepository, Repository } from "typeorm";
import { TodoItem } from "../entities/TodoItem";

export class TodoItemRepo {
    private dao: Repository<TodoItem>;

    constructor() {
        this.dao = getRepository(TodoItem);
    }

    async save(data: TodoItem) {
        return await this.dao.save(data);
    }

    async findAll(data: any) {
        return await this.dao.find(data);
    }

    async search(profielId: any) {
        return await this.dao
            .createQueryBuilder("todo_item")
            .where(profielId)
            .orderBy("todo_item.updatedOn", "DESC")
            .getMany();
    }

    async findOne(data: any) {
        return await this.dao.findOne(data);
    }

    async findById(id: string) {
        return await this.dao.findOne(id);
    }

    async delete(data: TodoItem) {
        return await this.dao.remove(data);
    }
}
