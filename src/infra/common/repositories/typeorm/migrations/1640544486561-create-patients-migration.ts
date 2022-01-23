import { PatientGender } from '../../../../../domain/backoffice/constants'

import { MigrationInterface, QueryRunner, Table, TableUnique } from 'typeorm'

export class createPatientsMigration1640544486561
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'patients',
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
            isNullable: true,
          },
          {
            name: 'gender',
            type: 'enum',
            enumName: 'patient_gender',
            enum: Object.values(PatientGender),
          },
          {
            name: 'birthdate',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'phone',
            type: 'varchar',
          },
          {
            name: 'cpf',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'occupation',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'emergency_contact',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'emergency_phone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'more_info',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'neighborhood',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'state',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'admin_id',
            type: 'uuid',
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
            name: 'fk_patients_accounts',
            referencedTableName: 'accounts',
            referencedColumnNames: ['id'],
            columnNames: ['admin_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
        uniques: [
          new TableUnique({
            name: 'patient_email_admin_id',
            columnNames: ['admin_id', 'email'],
          }),
          new TableUnique({
            name: 'patient_cpf_admin_id',
            columnNames: ['admin_id', 'cpf'],
          }),
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('patients', 'patient_cpf_admin_id')
    await queryRunner.dropUniqueConstraint('patients', 'patient_email_admin_id')
    await queryRunner.dropForeignKey('patients', 'fk_patients_accounts')
    await queryRunner.dropTable('patients')
  }
}
