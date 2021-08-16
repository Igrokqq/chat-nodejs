import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

const TABLE_NAME = "members";
const id = new TableColumn({
  name: "id",
  type: "integer",
  generationStrategy: "increment",
  isGenerated: true,
  isPrimary: true,
});
const userId = new TableColumn({
  name: "userId",
  type: "integer",
  isNullable: false,
});
const chatId = new TableColumn({
  name: "chatId",
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
const membersTable = new Table({
  name: TABLE_NAME,
  columns: [id, userId, chatId, createdAt, updatedAt],
});
export class createMembers1629135941968 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(membersTable);
    await queryRunner.createForeignKey(
      membersTable,
      new TableForeignKey({
        name: `${TABLE_NAME}-chats`,
        referencedTableName: "chats",
        referencedColumnNames: ["id"],
        columnNames: ["chatId"],
        onDelete: "cascade",
      })
    );
    await queryRunner.createForeignKey(
      membersTable,
      new TableForeignKey({
        name: `${TABLE_NAME}-users`,
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["userId"],
        onDelete: "cascade",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(membersTable);
  }
}
