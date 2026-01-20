-- AlterTable
ALTER TABLE "Fund" ADD COLUMN     "longDescription" TEXT,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "shortDescription" TEXT;
