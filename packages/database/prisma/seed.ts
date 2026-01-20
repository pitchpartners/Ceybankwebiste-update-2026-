import { Fund, FundCategory, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type SeedFund = Omit<
  Fund,
  'id' | 'createdAt' | 'updatedAt'
>;

type MoneyMarketSeed = {
  slug: string;
  asOfDate: Date;
  commentary: string;
  ytdReturn: number;
  oneMonthAnn: number;
  threeMonthAnn: number;
  currentYield: number;
  weightedMaturityMonths: number;
  weightedRating: string;
  fundSizeMillions: number;
  unitPrice: number;
  unitHolders: number;
  creditProfileJson: { label: string; value: number }[];
  assetAllocationJson: { label: string; value: number }[];
};

type EquitySeed = {
  slug: string;
  asOfDate: Date;
  ytdCY: number;
  ytdFY: number | null;
  threeMonths: number;
  sixMonths: number;
  oneYear: number;
  threeYears: number;
  fiveYears: number;
  tenYears: number;
  fifteenYears: number;
  twentyYears: number;
  cvFund: number;
  cvMarket: number;
  beta: number;
  rSq: number;
  navMillions: number;
  sectorAllocationJson: { label: string; value: number }[];
  topHoldingsJson: { name: string; weight?: number | null }[];
};

const funds: SeedFund[] = [
  {
    slug: 'high-yield',
    code: 'CHYF',
    name: 'Ceybank High Yield Fund',
    category: FundCategory.MONEY_MARKET,
    riskLevel: 'Low to Moderate',
    shortDescription:
      'Low-to-moderate risk money market fund targeting higher income via quality corporate debt.',
    longDescription:
      'The Ceybank High Yield Fund focuses on high-quality corporate debt and short-term money market instruments to deliver competitive yields while maintaining liquidity. It is suited for investors seeking enhanced income with disciplined credit selection.',
    order: 2,
    isActive: true,
  },
  {
    slug: 'saving-plus',
    code: 'CSPF',
    name: 'Ceybank SavingsPlus Fund',
    category: FundCategory.MONEY_MARKET,
    riskLevel: 'Low',
    shortDescription:
      'Daily-liquidity savings alternative with a conservative money market mix.',
    longDescription:
      'SavingsPlus emphasizes liquidity and capital preservation through a blend of government securities, repos, and high-quality deposits. It aims to outperform traditional savings while keeping risk low for short-term cash management.',
    order: 6,
    isActive: true,
  },
  {
    slug: 'gilt-edge',
    code: 'CGEF',
    name: 'Ceybank Gilt Edge Fund',
    category: FundCategory.MONEY_MARKET,
    riskLevel: 'Low',
    shortDescription:
      'Government-securities-focused fund for conservative investors.',
    longDescription:
      'The Gilt Edge Fund invests predominantly in Sri Lankan government securities, balancing T-Bills, bonds, and repos to offer stability and predictable income. It targets investors who prioritize safety and consistent returns.',
    order: 1,
    isActive: true,
  },
  {
    slug: 'surakum',
    code: 'CSKF',
    name: 'Ceybank Surakum Fund',
    category: FundCategory.MONEY_MARKET,
    riskLevel: 'Low',
    shortDescription:
      'Capital-preservation fund anchored in government securities.',
    longDescription:
      'Surakum maintains a conservative allocation within government instruments to preserve capital while offering steady income. It is built for investors seeking low volatility and reliable performance.',
    order: 5,
    isActive: true,
  },
  {
    slug: 'unit-trust',
    code: 'CUT',
    name: 'Ceybank Unit Trust Fund',
    category: FundCategory.MONEY_MARKET,
    riskLevel: 'Low to Moderate',
    shortDescription:
      'Diversified money market exposure with selective corporate instruments.',
    longDescription:
      'The Unit Trust Fund balances liquidity with yield by combining government securities and vetted corporate exposure. It suits investors who want daily access to funds with modest risk and diversified money market positioning.',
    order: 4,
    isActive: true,
  },
  {
    slug: 'century-growth',
    code: 'CCGF',
    name: 'Ceybank Century Growth Fund',
    category: FundCategory.EQUITY,
    riskLevel: 'High',
    shortDescription:
      'Flagship equity fund targeting long-term capital appreciation.',
    longDescription:
      'Century Growth invests in a diversified portfolio of Sri Lankan equities with a disciplined, research-led approach. It seeks meaningful long-term capital growth and is suitable for investors with higher risk tolerance and longer horizons.',
    order: 3,
    isActive: true,
  },
];

const moneyMarketSnapshots: MoneyMarketSeed[] = [
  {
    slug: 'high-yield',
    asOfDate: new Date('2025-01-31'),
    commentary:
      'Portfolio kept short duration while adding select high-grade corporate paper as rates eased.',
    ytdReturn: 7.85,
    oneMonthAnn: 7.45,
    threeMonthAnn: 7.68,
    currentYield: 7.92,
    weightedMaturityMonths: 4.6,
    weightedRating: 'A',
    fundSizeMillions: 1250.4,
    unitPrice: 37.49,
    unitHolders: 1750,
    creditProfileJson: [
      { label: 'A and above', value: 62 },
      { label: 'BBB to A', value: 28 },
      { label: 'Cash', value: 10 },
    ],
    assetAllocationJson: [
      { label: 'Commercial Paper', value: 35 },
      { label: 'Treasury Bills', value: 30 },
      { label: 'Debentures', value: 20 },
      { label: 'Repos', value: 15 },
    ],
  },
  {
    slug: 'saving-plus',
    asOfDate: new Date('2025-01-31'),
    commentary:
      'Fund emphasized T-Bills and overnight repos to retain daily liquidity.',
    ytdReturn: 7.12,
    oneMonthAnn: 6.95,
    threeMonthAnn: 7.05,
    currentYield: 7.2,
    weightedMaturityMonths: 3.1,
    weightedRating: 'A+',
    fundSizeMillions: 820.3,
    unitPrice: 18.2631,
    unitHolders: 2400,
    creditProfileJson: [
      { label: 'Government & repos', value: 55 },
      { label: 'A and above', value: 35 },
      { label: 'Cash', value: 10 },
    ],
    assetAllocationJson: [
      { label: 'Repos', value: 30 },
      { label: 'Treasury Bills', value: 40 },
      { label: 'Corporate Debt', value: 20 },
      { label: 'Deposits', value: 10 },
    ],
  },
  {
    slug: 'gilt-edge',
    asOfDate: new Date('2025-01-31'),
    commentary:
      'Fully invested in government securities with duration aligned to rate outlook.',
    ytdReturn: 6.45,
    oneMonthAnn: 6.3,
    threeMonthAnn: 6.38,
    currentYield: 6.52,
    weightedMaturityMonths: 7.3,
    weightedRating: 'Government',
    fundSizeMillions: 980,
    unitPrice: 127.66,
    unitHolders: 950,
    creditProfileJson: [{ label: 'Government', value: 100 }],
    assetAllocationJson: [
      { label: 'Treasury Bonds', value: 45 },
      { label: 'Treasury Bills', value: 35 },
      { label: 'Repos', value: 20 },
    ],
  },
  {
    slug: 'surakum',
    asOfDate: new Date('2025-01-31'),
    commentary:
      'Maintained conservative mix of government securities to preserve capital.',
    ytdReturn: 6.9,
    oneMonthAnn: 6.6,
    threeMonthAnn: 6.75,
    currentYield: 6.88,
    weightedMaturityMonths: 5.8,
    weightedRating: 'Government',
    fundSizeMillions: 410.2,
    unitPrice: 22.3089,
    unitHolders: 670,
    creditProfileJson: [
      { label: 'Government', value: 92 },
      { label: 'Cash', value: 8 },
    ],
    assetAllocationJson: [
      { label: 'Treasury Bills', value: 50 },
      { label: 'Treasury Bonds', value: 32 },
      { label: 'Repos', value: 18 },
    ],
  },
  {
    slug: 'unit-trust',
    asOfDate: new Date('2025-01-31'),
    commentary:
      'Focused on liquid government securities with selective short-term corporate exposure.',
    ytdReturn: 7.3,
    oneMonthAnn: 7.1,
    threeMonthAnn: 7.15,
    currentYield: 7.35,
    weightedMaturityMonths: 4.9,
    weightedRating: 'A',
    fundSizeMillions: 560.7,
    unitPrice: 38.36,
    unitHolders: 1200,
    creditProfileJson: [
      { label: 'Government', value: 40 },
      { label: 'A and above', value: 45 },
      { label: 'Cash', value: 15 },
    ],
    assetAllocationJson: [
      { label: 'Government Securities', value: 40 },
      { label: 'Corporate Debt', value: 35 },
      { label: 'Repos', value: 15 },
      { label: 'Deposits', value: 10 },
    ],
  },
];

const equitySnapshots: EquitySeed[] = [
  {
    slug: 'century-growth',
    asOfDate: new Date('2025-01-31'),
    ytdCY: 12.4,
    ytdFY: 10.2,
    threeMonths: 5.8,
    sixMonths: 9.6,
    oneYear: 18.9,
    threeYears: 42.1,
    fiveYears: 68.3,
    tenYears: 135.4,
    fifteenYears: 210.2,
    twentyYears: 320.5,
    cvFund: 11.5,
    cvMarket: 14.2,
    beta: 0.92,
    rSq: 0.78,
    navMillions: 3560.8,
    sectorAllocationJson: [
      { label: 'Banking & Finance', value: 28 },
      { label: 'Diversified', value: 18 },
      { label: 'Manufacturing', value: 14 },
      { label: 'Telecom', value: 12 },
      { label: 'Consumer', value: 10 },
      { label: 'Cash', value: 18 },
    ],
    topHoldingsJson: [
      { name: 'John Keells Holdings PLC', weight: 9.5 },
      { name: 'Commercial Bank of Ceylon PLC', weight: 9 },
      { name: 'Dialog Axiata PLC', weight: 8.4 },
      { name: 'Melstacorp PLC', weight: 7.8 },
      { name: 'Hemas Holdings PLC', weight: 7.2 },
      { name: 'Hayleys PLC', weight: 6.5 },
      { name: 'Ceylon Tobacco Company PLC', weight: 6.1 },
      { name: 'Access Engineering PLC', weight: 5.4 },
      { name: "People's Leasing & Finance PLC", weight: 5 },
      { name: 'Sampath Bank PLC', weight: 4.9 },
    ],
  },
];

async function main() {
  await prisma.$transaction([
    prisma.fundReport.deleteMany(),
    prisma.fundPrice.deleteMany(),
    prisma.moneyMarketMonthlySnapshot.deleteMany(),
    prisma.equityMonthlySnapshot.deleteMany(),
    prisma.fund.deleteMany(),
  ]);

  const fundRecords: Record<string, Fund> = {};

  for (const fund of funds) {
    const record = await prisma.fund.upsert({
      where: { slug: fund.slug },
      update: {
        ...fund,
      },
      create: fund,
    });

    fundRecords[fund.slug] = record;
  }

  for (const snapshot of moneyMarketSnapshots) {
    const fundId = fundRecords[snapshot.slug]?.id;
    if (!fundId) continue;

    await prisma.moneyMarketMonthlySnapshot.upsert({
      where: {
        fundId_asOfDate: {
          fundId,
          asOfDate: snapshot.asOfDate,
        },
      },
      update: {
        commentary: snapshot.commentary,
        ytdReturn: snapshot.ytdReturn,
        oneMonthAnn: snapshot.oneMonthAnn,
        threeMonthAnn: snapshot.threeMonthAnn,
        currentYield: snapshot.currentYield,
        weightedMaturityMonths: snapshot.weightedMaturityMonths,
        weightedRating: snapshot.weightedRating,
        fundSizeMillions: snapshot.fundSizeMillions,
        unitPrice: snapshot.unitPrice,
        unitHolders: snapshot.unitHolders,
        creditProfileJson: snapshot.creditProfileJson,
        assetAllocationJson: snapshot.assetAllocationJson,
      },
      create: {
        fundId,
        asOfDate: snapshot.asOfDate,
        commentary: snapshot.commentary,
        ytdReturn: snapshot.ytdReturn,
        oneMonthAnn: snapshot.oneMonthAnn,
        threeMonthAnn: snapshot.threeMonthAnn,
        currentYield: snapshot.currentYield,
        weightedMaturityMonths: snapshot.weightedMaturityMonths,
        weightedRating: snapshot.weightedRating,
        fundSizeMillions: snapshot.fundSizeMillions,
        unitPrice: snapshot.unitPrice,
        unitHolders: snapshot.unitHolders,
        creditProfileJson: snapshot.creditProfileJson,
        assetAllocationJson: snapshot.assetAllocationJson,
      },
    });
  }

  for (const snapshot of equitySnapshots) {
    const fundId = fundRecords[snapshot.slug]?.id;
    if (!fundId) continue;

    await prisma.equityMonthlySnapshot.upsert({
      where: {
        fundId_asOfDate: {
          fundId,
          asOfDate: snapshot.asOfDate,
        },
      },
      update: {
        ytdCY: snapshot.ytdCY,
        ytdFY: snapshot.ytdFY,
        threeMonths: snapshot.threeMonths,
        sixMonths: snapshot.sixMonths,
        oneYear: snapshot.oneYear,
        threeYears: snapshot.threeYears,
        fiveYears: snapshot.fiveYears,
        tenYears: snapshot.tenYears,
        fifteenYears: snapshot.fifteenYears,
        twentyYears: snapshot.twentyYears,
        cvFund: snapshot.cvFund,
        cvMarket: snapshot.cvMarket,
        beta: snapshot.beta,
        rSq: snapshot.rSq,
        navMillions: snapshot.navMillions,
        sectorAllocationJson: snapshot.sectorAllocationJson,
        topHoldingsJson: snapshot.topHoldingsJson,
      },
      create: {
        fundId,
        asOfDate: snapshot.asOfDate,
        ytdCY: snapshot.ytdCY,
        ytdFY: snapshot.ytdFY,
        threeMonths: snapshot.threeMonths,
        sixMonths: snapshot.sixMonths,
        oneYear: snapshot.oneYear,
        threeYears: snapshot.threeYears,
        fiveYears: snapshot.fiveYears,
        tenYears: snapshot.tenYears,
        fifteenYears: snapshot.fifteenYears,
        twentyYears: snapshot.twentyYears,
        cvFund: snapshot.cvFund,
        cvMarket: snapshot.cvMarket,
        beta: snapshot.beta,
        rSq: snapshot.rSq,
        navMillions: snapshot.navMillions,
        sectorAllocationJson: snapshot.sectorAllocationJson,
        topHoldingsJson: snapshot.topHoldingsJson,
      },
    });
  }
}

main()
  .catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
