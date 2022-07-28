/*
  Warnings:

  - You are about to drop the column `enderecoId` on the `Conta` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Conta" DROP CONSTRAINT "Conta_enderecoId_fkey";

-- AlterTable
ALTER TABLE "Conta" DROP COLUMN "enderecoId";

-- AlterTable
ALTER TABLE "Endereco" ADD COLUMN     "contaId" INTEGER;

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "Conta"("id") ON DELETE SET NULL ON UPDATE CASCADE;
