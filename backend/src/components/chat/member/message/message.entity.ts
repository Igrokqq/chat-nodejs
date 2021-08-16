import { ChatEntity } from "../../chat.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity({
  name: "messages",
})
export class MessageEntity {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @Column({
    type: "text",
    nullable: false,
  })
  readonly body = "";

  @ManyToOne(() => ChatEntity)
  @JoinColumn({ name: "fromUserId", referencedColumnName: "id" })
  readonly fromUserId!: number;

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
