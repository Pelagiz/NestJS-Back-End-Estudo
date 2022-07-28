/*
  Warnings:

  - Added the required column `formaPagamentoId` to the `DadosOrdem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagem` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DadosOrdem" ADD COLUMN     "formaPagamentoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Produto" ADD COLUMN     "imagem" BYTEA NOT NULL;

-- CreateTable
CREATE TABLE "FormaPagamento" (
    "id" SERIAL NOT NULL,
    "formaPagamento" TEXT NOT NULL,

    CONSTRAINT "FormaPagamento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DadosOrdem" ADD CONSTRAINT "DadosOrdem_formaPagamentoId_fkey" FOREIGN KEY ("formaPagamentoId") REFERENCES "FormaPagamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
