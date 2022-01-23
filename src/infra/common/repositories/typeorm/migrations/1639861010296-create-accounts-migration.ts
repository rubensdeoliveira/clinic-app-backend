import { MigrationInterface, QueryRunner, Table } from 'typeorm'

import { AccountType } from '../../../../../domain/authentication/constants'

export class createAccountsMigration1639861010296
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'accounts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'type',
            type: 'enum',
            enumName: 'account_types',
            enum: Object.values(AccountType),
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'admin_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_account_admin',
            referencedTableName: 'accounts',
            referencedColumnNames: ['id'],
            columnNames: ['admin_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('accounts', 'fk_account_admin')
    await queryRunner.dropTable('accounts')
  }
}
