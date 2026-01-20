-- DropForeignKey
ALTER TABLE "EquityMonthlySnapshot" DROP CONSTRAINT "EquityMonthlySnapshot_fundId_fkey";

-- DropForeignKey
ALTER TABLE "FundPrice" DROP CONSTRAINT "FundPrice_fundId_fkey";

-- DropForeignKey
ALTER TABLE "FundReport" DROP CONSTRAINT "FundReport_fundId_fkey";

-- DropForeignKey
ALTER TABLE "MoneyMarketMonthlySnapshot" DROP CONSTRAINT "MoneyMarketMonthlySnapshot_fundId_fkey";

-- AlterTable
ALTER TABLE "EquityMonthlySnapshot" ALTER COLUMN "fundId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Fund" DROP CONSTRAINT "Fund_pkey",
DROP COLUMN "custodianFee",
DROP COLUMN "exitLoad",
DROP COLUMN "frontLoad",
DROP COLUMN "managementFee",
DROP COLUMN "minAdditionalInvestment",
DROP COLUMN "minInitialInvestment",
DROP COLUMN "objective",
DROP COLUMN "restrictions",
DROP COLUMN "strategy",
DROP COLUMN "trusteeFee",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Fund_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Fund_id_seq";

-- AlterTable
ALTER TABLE "FundPrice" ALTER COLUMN "fundId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "FundReport" ALTER COLUMN "fundId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "MoneyMarketMonthlySnapshot" ALTER COLUMN "fundId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "FundPrice" ADD CONSTRAINT "FundPrice_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "Fund"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundReport" ADD CONSTRAINT "FundReport_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "Fund"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoneyMarketMonthlySnapshot" ADD CONSTRAINT "MoneyMarketMonthlySnapshot_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "Fund"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquityMonthlySnapshot" ADD CONSTRAINT "EquityMonthlySnapshot_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "Fund"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

