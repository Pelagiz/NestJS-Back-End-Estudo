/*
  Warnings:

  - A unique constraint covering the columns `[formaPagamento]` on the table `FormaPagamento` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FormaPagamento_formaPagamento_key" ON "FormaPagamento"("formaPagamento");
