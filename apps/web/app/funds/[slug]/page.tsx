import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeIn from "@/components/fade-in";
import { ChartPieLabel } from "@/components/chart-pie-label";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { appRoute } from "@/constants/routes";
import { fundStaticSectionsBySlug } from "../_components/fund-static-copy";
import HomeReportsSection from "@/components/home-reports";
import { getFundBySlug } from "@/services/fundService";
import { EquitySnapshot, FundAboutResponse, MoneyMarketSnapshot } from "@/types/fund";

const numberFormatter = (value: number | null | undefined, decimals = 2) =>
  value === null || value === undefined
    ? "—"
    : value.toLocaleString("en-LK", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });

const percentFormatter = (value: number | null | undefined, decimals = 2) => {
  if (value === null || value === undefined) return "—";
  return `${numberFormatter(value, decimals)}%`;
};

const currencyFormatter = (
  value: number | null | undefined,
  decimals = 2,
  suffix = "",
) => {
  if (value === null || value === undefined) return "—";
  return `LKR ${numberFormatter(value, decimals)}${suffix}`;
};

const dateFormatter = (value?: string) => {
  if (!value) return "—";
  const date = new Date(value);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

async function getFundAbout(slug: string): Promise<FundAboutResponse> {
  try {
    return await getFundBySlug(slug);
  } catch (error: unknown) {
    if ((error as { status?: number })?.status === 404) {
      notFound();
    }
    throw new Error("Failed to load fund details");
  }
}

function StatCard({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend?: "up" | "down";
}) {
  return (
    <div className="flex flex-col gap-y-2">
      <p className="text-sm text-primary w-[150px] sm:w-auto">{label}</p>
      <p className="text-2xl lg:text-3xl font-semibold text-primary flex items-center gap-x-4">
        {value}
        {trend ? (
          <Image
            alt=""
            width={30}
            height={30}
            src={`/icons/arrow-trend-${trend}.svg`}
          />
        ) : null}
      </p>
    </div>
  );
}

function MoneyMarketSnapshotSection({
  snapshot,
}: {
  snapshot: MoneyMarketSnapshot | null;
}) {
  if (!snapshot) {
    return (
      <FadeIn className="my-12">
        <p className="text-2xl lg:text-3xl font-semibold mt-2 text-primary text-center">
          Fund Snapshot
        </p>
        <p className="text-center text-black/70 mt-2">
          Latest money market data will be published soon.
        </p>
      </FadeIn>
    );
  }

  const rows: { label: string; value: string }[] = [
    { label: "YTD Return", value: percentFormatter(snapshot.ytdReturn) },
    { label: "1 Month (annualized)", value: percentFormatter(snapshot.oneMonthAnn) },
    { label: "3 Months (annualized)", value: percentFormatter(snapshot.threeMonthAnn) },
    { label: "Current Yield", value: percentFormatter(snapshot.currentYield) },
    {
      label: "Weighted Avg Maturity (months)",
      value: numberFormatter(snapshot.weightedMaturityMonths, 2),
    },
    { label: "Weighted Avg Rating", value: snapshot.weightedRating || "—" },
    {
      label: "Fund Size",
      value: currencyFormatter(snapshot.fundSizeMillions, 2, " mn"),
    },
    { label: "Unit Price", value: numberFormatter(snapshot.unitPrice, 4) },
    { label: "Unit Holders", value: numberFormatter(snapshot.unitHolders, 0) },
  ];

  return (
    <FadeIn className="my-12">
      <p className="text-2xl lg:text-3xl font-semibold mt-2 text-primary text-center">
        Fund Snapshot
      </p>
      <p className="text-sm text-center text-black/70 mt-1">
        As of {dateFormatter(snapshot.asOfDate)}
      </p>
      <div className="overflow-x-auto w-full mt-8">
        <Table className="max-w-4xl mx-auto">
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.label}>
                <TableCell className="font-semibold">{row.label}</TableCell>
                <TableCell>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {snapshot.commentary ? (
        <p className="text-center text-black/70 mt-6 max-w-3xl mx-auto">
          {snapshot.commentary}
        </p>
      ) : null}
      <div className="grid gap-10 md:grid-cols-2 mt-12">
        <div>
          <p className="text-xl font-semibold text-primary text-center mb-4">
            Credit Profile
          </p>
          <ChartPieLabel data={snapshot.creditProfile} />
        </div>
        <div>
          <p className="text-xl font-semibold text-primary text-center mb-4">
            Asset Allocation
          </p>
          <ChartPieLabel data={snapshot.assetAllocation} />
        </div>
      </div>
    </FadeIn>
  );
}

function EquitySnapshotSection({ snapshot }: { snapshot: EquitySnapshot | null }) {
  if (!snapshot) {
    return (
      <FadeIn className="my-12">
        <p className="text-2xl lg:text-3xl font-semibold mt-2 text-primary text-center">
          Fund Snapshot
        </p>
        <p className="text-center text-black/70 mt-2">
          Latest equity data will be published soon.
        </p>
      </FadeIn>
    );
  }

  const performanceRows: { label: string; value: string }[] = [
    { label: "YTD (Calendar)", value: percentFormatter(snapshot.ytdCY) },
    { label: "YTD (Financial)", value: percentFormatter(snapshot.ytdFY) },
    { label: "3 Months", value: percentFormatter(snapshot.threeMonths) },
    { label: "6 Months", value: percentFormatter(snapshot.sixMonths) },
    { label: "1 Year", value: percentFormatter(snapshot.oneYear) },
    { label: "3 Years", value: percentFormatter(snapshot.threeYears) },
    { label: "5 Years", value: percentFormatter(snapshot.fiveYears) },
    { label: "10 Years", value: percentFormatter(snapshot.tenYears) },
    { label: "15 Years", value: percentFormatter(snapshot.fifteenYears) },
    { label: "20 Years", value: percentFormatter(snapshot.twentyYears) },
  ];

  const riskStats = [
    { label: "CV (Fund)", value: percentFormatter(snapshot.cvFund) },
    { label: "CV (Market)", value: percentFormatter(snapshot.cvMarket) },
    { label: "Beta", value: numberFormatter(snapshot.beta, 2) },
    { label: "R-Squared", value: numberFormatter(snapshot.rSq, 2) },
    { label: "NAV", value: currencyFormatter(snapshot.navMillions, 2, " mn") },
  ];

  return (
    <FadeIn className="my-12 space-y-10">
      <div>
        <p className="text-2xl lg:text-3xl font-semibold mt-2 text-primary text-center">
          Performance Snapshot
        </p>
        <p className="text-sm text-center text-black/70 mt-1">
          As of {dateFormatter(snapshot.asOfDate)}
        </p>
        <div className="overflow-x-auto w-full mt-8">
          <Table className="max-w-4xl mx-auto">
            <TableBody>
              {performanceRows.map((row) => (
                <TableRow key={row.label}>
                  <TableCell className="font-semibold">{row.label}</TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div>
        <p className="text-2xl lg:text-3xl font-semibold mt-2 text-primary text-center">
          Risk & NAV
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8 max-w-5xl mx-auto">
          {riskStats.map((stat) => (
            <div
              key={stat.label}
              className="border border-border/50 rounded-xl p-4 text-center bg-white"
            >
              <p className="text-sm text-black/60">{stat.label}</p>
              <p className="text-xl font-semibold text-primary mt-1">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-2xl lg:text-3xl font-semibold mt-2 text-primary text-center uppercase">
          Sector Allocation
        </p>
        <div className="mt-8 max-w-3xl mx-auto">
          <ChartPieLabel data={snapshot.sectorAllocation} />
        </div>
      </div>

      <div>
        <p className="text-2xl lg:text-3xl font-semibold mt-2 text-primary text-center">
          Top 10 Holdings
        </p>
        <div className="overflow-x-auto w-full mt-8">
          <Table className="max-w-4xl mx-auto">
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">#</TableHead>
                <TableHead>Holding</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {snapshot.topHoldings.map((holding, index) => (
                <TableRow key={`${holding.name}-${index}`}>
                  <TableCell>{(index + 1).toString().padStart(2, "0")}</TableCell>
                  <TableCell>{holding.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </FadeIn>
  );
}

export default async function FundPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getFundAbout(slug);
  const { fund } = data;

  const snapshotDate = dateFormatter(data.latestSnapshot?.asOfDate);

  const mmSnapshot = data.category === "MONEY_MARKET"
    ? (data.latestSnapshot as MoneyMarketSnapshot | null)
    : null;
  const eqSnapshot = data.category === "EQUITY"
    ? (data.latestSnapshot as EquitySnapshot | null)
    : null;

  const stats: { label: string; value: string; trend?: 'up' | 'down' }[] =
    data.category === "MONEY_MARKET"
      ? [
          {
            label: snapshotDate ? `Unit Price (${snapshotDate})` : "Unit Price",
            value: numberFormatter(mmSnapshot?.unitPrice ?? null, 4),
            trend: mmSnapshot ? "up" : undefined,
          },
          {
            label: "Current Yield",
            value: percentFormatter(mmSnapshot?.currentYield ?? null),
            trend:
              mmSnapshot?.currentYield !== undefined && mmSnapshot?.currentYield !== null
                ? mmSnapshot.currentYield < 0
                  ? "down"
                  : "up"
                : undefined,
          },
        ]
      : [
          {
            label: snapshotDate ? `NAV (${snapshotDate})` : "NAV",
            value: currencyFormatter(
              eqSnapshot?.navMillions ?? null,
              2,
              " mn",
            ),
            trend: eqSnapshot ? "up" : undefined,
          },
          {
            label: "YTD (Calendar)",
            value: percentFormatter(eqSnapshot?.ytdCY ?? null),
            trend:
              eqSnapshot?.ytdCY !== undefined && eqSnapshot?.ytdCY !== null
                ? eqSnapshot.ytdCY < 0
                  ? "down"
                  : "up"
                : undefined,
          },
        ];

  return (
    <div className="flex flex-col">
      {/* breadcrumbs section */}
      <div className="min-h-[200px] lg:min-h-[300px] h-[20vh] flex flex-col items-center justify-center gap-4">
        <p className="text-center font-bold text-2xl lg:text-5xl">{fund.name}</p>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={appRoute.home}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={appRoute.funds}>Funds</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{fund.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {/* about us */}
      <div className="bg-background">
        <div className="container pt-16">
          <FadeIn className="w-full">
            <div className="flex items-center gap-2">
              <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
              <p className="lg:text-2xl uppercase font-bold text-primary">{fund.name}</p>
              <span className="rounded-full bg-primary/10 text-primary text-xs px-3 py-1">
                {fund.riskLevel}
              </span>
            </div>
            <div className="flex flex-wrap justify-between sm:justify-start items-center sm:gap-x-8 gap-y-6 mt-8">
              {stats.map((stat) => (
                <StatCard
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                  trend={stat.trend}
                />
              ))}
              <Button type="submit" variant={"secondary"} asChild>
                <Link href={appRoute.invest_now} target="_blank">Invest Now</Link>
              </Button>
            </div>
          </FadeIn>
          {fundStaticSectionsBySlug[slug] ? (
            <section className="mt-8">{fundStaticSectionsBySlug[slug]}</section>
          ) : null}

          {data.category === "MONEY_MARKET" ? (
            <MoneyMarketSnapshotSection snapshot={data.latestSnapshot} />
          ) : (
            <EquitySnapshotSection snapshot={data.latestSnapshot} />
          )}
{/* 
          <FadeIn className="my-12">
            <p className="text-2xl lg:text-3xl font-semibold mt-2 text-primary text-center">
              Performance Commentary
            </p>
            <div className="mt-6 flex flex-col items-center gap-4">
              <p className="text-center text-black/70 max-w-4xl">
                Detailed line charts from monthly fact sheets will be added soon.
              </p>
              <ComingSoon variant="secondary">View Charts</ComingSoon>
            </div>
          </FadeIn> */}
        </div>
      </div>
      {/* reports */}
      <HomeReportsSection />
    </div>
  );
}
