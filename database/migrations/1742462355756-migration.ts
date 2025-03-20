import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1742462355756 implements MigrationInterface {
  name = 'Migration1742462355756';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "delivery_fee_requests" ALTER COLUMN "addressFrom" TYPE geometry`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_fee_requests" ALTER COLUMN "addressTo" TYPE geometry`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_delivery_fee_requests_userUuid" ON "delivery_fee_requests" ("userUuid") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_delivery_fee_requests_userUuid"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_fee_requests" ALTER COLUMN "addressTo" TYPE geometry(GEOMETRY,0)`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_fee_requests" ALTER COLUMN "addressFrom" TYPE geometry(GEOMETRY,0)`,
    );
  }
}
