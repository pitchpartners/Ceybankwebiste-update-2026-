-- CreateEnum
CREATE TYPE "FundCategory" AS ENUM ('MONEY_MARKET', 'EQUITY');

-- AlterTable
ALTER TABLE "Fund" ADD COLUMN     "category" "FundCategory" NOT NULL,
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "custodianFee" DECIMAL(10,2),
ADD COLUMN     "exitLoad" DECIMAL(10,2),
ADD COLUMN     "frontLoad" DECIMAL(10,2),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "managementFee" DECIMAL(10,2),
ADD COLUMN     "minAdditionalInvestment" DECIMAL(18,2),
ADD COLUMN     "minInitialInvestment" DECIMAL(18,2),
ADD COLUMN     "objective" TEXT NOT NULL,
ADD COLUMN     "restrictions" TEXT NOT NULL,
ADD COLUMN     "riskLevel" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "strategy" TEXT NOT NULL,
ADD COLUMN     "trusteeFee" DECIMAL(10,2),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "MoneyMarketMonthlySnapshot" (
    "id" TEXT NOT NULL,
    "fundId" INTEGER NOT NULL,
    "asOfDate" TIMESTAMP(3) NOT NULL,
    "commentary" TEXT NOT NULL,
    "ytdReturn" DECIMAL(10,4) NOT NULL,
    "oneMonthAnn" DECIMAL(10,4) NOT NULL,
    "threeMonthAnn" DECIMAL(10,4) NOT NULL,
    "currentYield" DECIMAL(10,4) NOT NULL,
    "weightedMaturityMonths" DECIMAL(10,4) NOT NULL,
    "weightedRating" TEXT NOT NULL,
    "fundSizeMillions" DECIMAL(14,2) NOT NULL,
    "unitPrice" DECIMAL(12,4) NOT NULL,
    "unitHolders" INTEGER NOT NULL,
    "creditProfileJson" JSONB NOT NULL,
    "assetAllocationJson" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MoneyMarketMonthlySnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquityMonthlySnapshot" (
    "id" TEXT NOT NULL,
    "fundId" INTEGER NOT NULL,
    "asOfDate" TIMESTAMP(3) NOT NULL,
    "ytdCY" DECIMAL(10,4) NOT NULL,
    "ytdFY" DECIMAL(10,4),
    "threeMonths" DECIMAL(10,4) NOT NULL,
    "sixMonths" DECIMAL(10,4) NOT NULL,
    "oneYear" DECIMAL(10,4) NOT NULL,
    "threeYears" DECIMAL(10,4) NOT NULL,
    "fiveYears" DECIMAL(10,4) NOT NULL,
    "tenYears" DECIMAL(10,4) NOT NULL,
    "fifteenYears" DECIMAL(10,4) NOT NULL,
    "twentyYears" DECIMAL(10,4) NOT NULL,
    "cvFund" DECIMAL(10,4) NOT NULL,
    "cvMarket" DECIMAL(10,4) NOT NULL,
    "beta" DECIMAL(10,4) NOT NULL,
    "rSq" DECIMAL(10,4) NOT NULL,
    "navMillions" DECIMAL(14,2) NOT NULL,
    "sectorAllocationJson" JSONB NOT NULL,
    "topHoldingsJson" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EquityMonthlySnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MoneyMarketMonthlySnapshot_fundId_asOfDate_idx" ON "MoneyMarketMonthlySnapshot"("fundId", "asOfDate");

-- CreateIndex
CREATE UNIQUE INDEX "MoneyMarketMonthlySnapshot_fundId_asOfDate_key" ON "MoneyMarketMonthlySnapshot"("fundId", "asOfDate");

-- CreateIndex
CREATE INDEX "EquityMonthlySnapshot_fundId_asOfDate_idx" ON "EquityMonthlySnapshot"("fundId", "asOfDate");

-- CreateIndex
CREATE UNIQUE INDEX "EquityMonthlySnapshot_fundId_asOfDate_key" ON "EquityMonthlySnapshot"("fundId", "asOfDate");

-- CreateIndex
CREATE UNIQUE INDEX "Fund_slug_key" ON "Fund"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Fund_code_key" ON "Fund"("code");

-- AddForeignKey
ALTER TABLE "MoneyMarketMonthlySnapshot" ADD CONSTRAINT "MoneyMarketMonthlySnapshot_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "Fund"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquityMonthlySnapshot" ADD CONSTRAINT "EquityMonthlySnapshot_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "Fund"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
