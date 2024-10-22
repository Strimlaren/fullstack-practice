/*
  Warnings:

  - You are about to drop the column `companyDescription` on the `Campaign` table. All the data in the column will be lost.
  - Added the required column `campaignDescription` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "companyDescription",
ADD COLUMN     "campaignDescription" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
