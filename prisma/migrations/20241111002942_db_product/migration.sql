/*
  Warnings:

  - You are about to drop the column `typeId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_typeId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "typeId",
ADD COLUMN     "typeOfProductId" TEXT;

-- DropTable
DROP TABLE "Type";

-- CreateTable
CREATE TABLE "TypeOfProduct" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TypeOfProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_typeOfProductId_fkey" FOREIGN KEY ("typeOfProductId") REFERENCES "TypeOfProduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;
