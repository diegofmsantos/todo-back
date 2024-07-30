/*
  Warnings:

  - Changed the type of `category` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('pessoal', 'estudo', 'trabalho');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL;
