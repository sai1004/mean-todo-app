import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Profile } from "./Profile";

@Entity("todo_item")
export class TodoItem {
    @PrimaryColumn({ name: "id" })
    id: string;

    @Column({ name: "title" })
    title: string;

    @Column({ name: "description" })
    description: string;

    @JoinColumn({ name: "profile_id" })
    @ManyToOne((type) => Profile)
    profileId: Profile;

    @Column({ name: "status" })
    status: string;

    @Column({ name: "created_by" })
    createdBy: string;

    @Column({ name: "created_on" })
    createdOn: Date;

    @Column({ name: "updated_by" })
    updatedBy: string;

    @Column({ name: "updated_on" })
    updatedOn: Date;
}
