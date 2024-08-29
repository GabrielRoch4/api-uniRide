/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cpf` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[CPF]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Bairro` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CEP` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CPF` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Cidade` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Complemento` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DataNasc` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Email` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Estado` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Genero` to the `users` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `Logradouro` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Nome` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Numero` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Senha` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Sobrenome` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Telefone` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_cpf_key";

-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "cpf",
DROP COLUMN "email",
DROP COLUMN "id",
DROP COLUMN "nome",
ADD COLUMN     "Bairro" TEXT NOT NULL,
ADD COLUMN     "CEP" TEXT NOT NULL,
ADD COLUMN     "CPF" TEXT NOT NULL,
ADD COLUMN     "Cidade" TEXT NOT NULL,
ADD COLUMN     "Complemento" TEXT NOT NULL,
ADD COLUMN     "DataNasc" TEXT NOT NULL,
ADD COLUMN     "Email" TEXT NOT NULL,
ADD COLUMN     "Estado" TEXT NOT NULL,
ADD COLUMN     "Genero" TEXT NOT NULL,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "Logradouro" TEXT NOT NULL,
ADD COLUMN     "Nome" TEXT NOT NULL,
ADD COLUMN     "Numero" TEXT NOT NULL,
ADD COLUMN     "Senha" TEXT NOT NULL,
ADD COLUMN     "Sobrenome" TEXT NOT NULL,
ADD COLUMN     "Telefone" TEXT NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("Id");

-- CreateIndex
CREATE UNIQUE INDEX "users_CPF_key" ON "users"("CPF");

-- CreateIndex
CREATE UNIQUE INDEX "users_Email_key" ON "users"("Email");
