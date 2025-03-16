import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1742122792081 implements MigrationInterface {
  name = 'Migration1742122792081';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "delivery_fee" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP WITH TIME ZONE,
                "originalFee" numeric(10,2) NOT NULL,
                "newFee" numeric(10,2) NOT NULL,
                "deliveryTime" numeric(20,2) NOT NULL,
                "distanceMeters" numeric(20,2) NOT NULL,
                "message" text,
                CONSTRAINT "PK_772d745d744de09d4ddb9837fd7" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "delivery_fee"`);
  }
}
