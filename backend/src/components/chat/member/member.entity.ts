import { UserEntity } from "../../user/user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { ChatEntity } from "../chat.entity";

@Entity({
  name: "members",
})
export class MemberEntity {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @OneToOne(() => ChatEntity)
  @JoinColumn({ name: "chatId", referencedColumnName: "id" })
  @Column({
    type: "integer",
    nullable: false,
  })
  readonly chatId!: number;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  @Column({
    type: "integer",
    nullable: false,
  })
  readonly userId!: number;

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
