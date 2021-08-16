import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

const TABLE_NAME = "chats";
const id = new TableColumn({
  name: "id",
  generationStrategy: "increment",
  isPrimary: true,
  isGenerated: true,
  type: "integer",
});
const label = new TableColumn({
  name: "label",
  type: "varchar",
  isNullable: false,
  length: "64",
});
const description = new TableColumn({
  name: "description",
  type: "text",
  isNullable: true,
  default: null,
});
const ownerId = new TableColumn({
  name: "ownerId",
  type: "integer",
  isNullable: false,
});
const createdAt = new TableColumn({
  name: "created_at",
  type: "timestamp",
  isNullable: false,
  default: "CURRENT_TIMESTAMP",
});
const updatedAt = new TableColumn({
  name: "updated_at",
  type: "timestamp",
  isNullable: false,
  default: "CURRENT_TIMESTAMP",
});
const chatsTable = new Table({
  name: TABLE_NAME,
  columns: [id, label, description, ownerId, createdAt, updatedAt],
});
const ownerIdToUserForeignKey = new TableForeignKey({
  name: TABLE_NAME,
  columnNames: ["ownerId"],
  referencedTableName: "users",
  referencedColumnNames: ["id"],
  onDelete: "cascade",
});
export class createChat1629016630140 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(chatsTable);
    await queryRunner.createForeignKey(chatsTable, ownerIdToUserForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(chatsTable);
  }
}
