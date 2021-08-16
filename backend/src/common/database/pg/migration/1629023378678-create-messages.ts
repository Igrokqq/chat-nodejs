import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

const TABLE_NAME = "messages";
const id = new TableColumn({
  name: "id",
  type: "integer",
  generationStrategy: "increment",
  isNullable: false,
  isPrimary: true,
  isGenerated: true,
});
const body = new TableColumn({
  name: "body",
  type: "varchar",
  isNullable: false,
});
const fromUserId = new TableColumn({
  name: "fromUserId",
  type: "integer",
  isNullable: false,
});
const createdAt = new TableColumn({
  name: "created_at",
  type: "timestamp",
  default: "CURRENT_TIMESTAMP",
  isNullable: false,
});
const updatedAt = new TableColumn({
  name: "updated_at",
  type: "timestamp",
  isNullable: false,
  default: "CURRENT_TIMESTAMP",
});
const messagesTable = new Table({
  name: TABLE_NAME,
  columns: [id, body, fromUserId, createdAt, updatedAt],
});
export class createMessages1629023378678 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(messagesTable);
    await queryRunner.createForeignKey(
      messagesTable,
      new TableForeignKey({
        columnNames: ["fromUserId"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        onDelete: "cascade",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(messagesTable);
  }
}
