/*
  Warnings:

  - A unique constraint covering the columns `[role]` on the table `Roles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roleId` to the `Conta` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pedido" DROP CONSTRAINT "Pedido_dadosOrdemId_fkey";

-- AlterTable
ALTER TABLE "Conta" ADD COLUMN     "roleId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Roles_role_key" ON "Roles"("role");

-- AddForeignKey
ALTER TABLE "Conta" ADD CONSTRAINT "Conta_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_dadosOrdemId_fkey" FOREIGN KEY ("dadosOrdemId") REFERENCES "DadosOrdem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
