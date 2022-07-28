-- DropForeignKey
ALTER TABLE "Conta" DROP CONSTRAINT "Conta_enderecoId_fkey";

-- DropForeignKey
ALTER TABLE "DadosOrdem" DROP CONSTRAINT "DadosOrdem_enderecoId_fkey";

-- AlterTable
ALTER TABLE "Conta" ALTER COLUMN "enderecoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Conta" ADD CONSTRAINT "Conta_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "Endereco"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DadosOrdem" ADD CONSTRAINT "DadosOrdem_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "Endereco"("id") ON DELETE CASCADE ON UPDATE CASCADE;
