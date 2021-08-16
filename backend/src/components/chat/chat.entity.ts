import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { UserEntity } from "../user/user.entity";
import { MemberEntity } from "./member/member.entity";

@Entity({
  name: "chats",
})
export class ChatEntity {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @Column({
    type: "varchar",
    length: 64,
  })
  readonly label = "";

  @Column({
    type: "text",
    nullable: true,
  })
  readonly description = "";

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "ownerId", referencedColumnName: "id" })
  @Column({
    type: "integer",
    nullable: false,
  })
  readonly ownerId!: number;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  readonly created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  readonly updated_at: Date;
}
