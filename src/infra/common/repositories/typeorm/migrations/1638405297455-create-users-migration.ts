import { UserStatusModel, UserTypeModel } from '@/domain/authentication'
import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createUsersMigration1638405297455 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'password',
            type: 'varchar'
          },
          {
            name: 'type',
            type: 'enum',
            enumName: 'user_types',
            enum: [
              UserTypeModel.administrator,
              UserTypeModel.professional,
              UserTypeModel.secretary
            ]
          },
          {
            name: 'status',
            type: 'enum',
            enumName: 'user_status',
            enum: [
              UserStatusModel.Active,
              UserStatusModel.Blocked,
              UserStatusModel.Inactive
            ],
            default: `'${UserStatusModel.Active}'`
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
