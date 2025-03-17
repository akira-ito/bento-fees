import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1742201998103 implements MigrationInterface {
  name = 'Migration1742201998103';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "delivery_fee_requests" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP WITH TIME ZONE,
                "originalFee" numeric(10,2) NOT NULL,
                "newFee" numeric(10,2) NOT NULL,
                "deliveryTime" numeric(20,2) NOT NULL,
                "distanceMeters" numeric(20,2) NOT NULL,
                "message" text,
                "addressFrom" geometry NOT NULL,
                "addressTo" geometry NOT NULL,
                "userUuid" character varying(255) NOT NULL,
                "merchantUuid" character varying(255) NOT NULL,
                "userAgent" character varying(255) NOT NULL,
                CONSTRAINT "PK_5bde0e2631c1eac1aa0e29181cc" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "delivery_fee_requests"`);
  }
}
