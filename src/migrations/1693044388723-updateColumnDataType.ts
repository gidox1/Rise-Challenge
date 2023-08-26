import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColumnDataType1693044388723 implements MigrationInterface {
    name = 'UpdateColumnDataType1693044388723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "body"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "body" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "content" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "content" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "body"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "body" character varying NOT NULL`);
    }

}
