import { ChatEntity } from "@components/chat/chat.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";

@Entity({
  name: "users",
})
export class UserEntity {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @Column({
    type: "varchar",
    unique: true,
    length: 64,
  })
  readonly email = "";

  @Column({
    type: "varchar",
    length: 64,
  })
  readonly password = "";

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  readonly created_at: Date;

  // @OneToMany(() => ChatEntity, (chat) => chat.ownerId)
  // readonly chats: ChatEntity[];

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  readonly updated_at: Date;
}
