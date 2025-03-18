import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1742257339528 implements MigrationInterface {
  name = 'Migration1742257339528';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "delivery_fee_configurations" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP WITH TIME ZONE,
                "type" character varying(255) NOT NULL,
                "value" numeric(10,2) NOT NULL,
                CONSTRAINT "UQ_02b05bcb7733baa988604c1f4da" UNIQUE ("type"),
                CONSTRAINT "PK_2e6b22a2e43df6541f9e687ec22" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            INSERT INTO "delivery_fee_configurations" (type, value)
            VALUES ('MARGIN_FEE', 13)
        `);

    await queryRunner.query(`
            ALTER TABLE "delivery_fee_requests"
            ALTER COLUMN "addressFrom" TYPE geometry
        `);

    await queryRunner.query(`
            ALTER TABLE "delivery_fee_requests"
            ALTER COLUMN "addressTo" TYPE geometry
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "delivery_fee_requests"
            ALTER COLUMN "addressTo" TYPE geometry(GEOMETRY,0)
        `);

    await queryRunner.query(`
            ALTER TABLE "delivery_fee_requests"
            ALTER COLUMN "addressFrom" TYPE geometry(GEOMETRY,0)
        `);

    await queryRunner.query(`
            DROP TABLE "delivery_fee_configurations"
        `);
  }
}
