import { getRepository, Repository } from "typeorm";
import { Profile } from "../entities/Profile";

export class ProfileRepo {
    private repo: Repository<Profile>;

    constructor() {
        this.repo = getRepository(Profile);
    }

    async search(data: any) {
        return await this.repo.createQueryBuilder("profile").orderBy("profile.updatedOn", "DESC").where(data).getMany();
    }

    async save(item: Profile) {
        return this.repo.save(item);
    }

    async findById(id: any) {
        return await this.repo.findOne(id);
    }

    async findByAny(data: any) {
        return this.repo.findOne(data);
    }
}
