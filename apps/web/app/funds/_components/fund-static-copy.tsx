import FadeIn from "@/components/fade-in";
import { FundStaticSection } from "./fund-static-section";
import { ReactNode } from "react";

type FundStaticCopyMap = Record<string, ReactNode>;

export const fundStaticSectionsBySlug: FundStaticCopyMap = {
  "high-yield": (
    <FadeIn className="w-full mt-8 space-y-8">
      <FundStaticSection title="Investment Objective">
        <p>
          Maximise short term current income whilst ensuring
          ease of liquidity by Investing in Money Market
          Instruments, Government and Corporate Debt
          securities, with maturities less than 397 days.
        </p>
      </FundStaticSection>
      <FundStaticSection title="Investment Strategy">
        <p>The fund invests in short-term debt instruments such as:</p>
        <ol className="mt-2 list-disc ms-3">
          <li>Commercial Papers</li>
          <li>Treasury Bills</li>
          <li>Asset-Backed Securities</li>
          <li>Bank Deposits</li>
          <li>Debentures & Repurchase Agreements</li>
        </ol>
        <p className="mt-2">
          The fund does not invest in listed or unlisted equity securities.
        </p>
      </FundStaticSection>
      <FundStaticSection title="Investment Risks">
        <p>
          Although the fund is classified as low-risk, it is subject to:
        </p>
        <ol className="mt-2 list-disc ms-3">
          <li>Interest rate fluctuations</li>
          <li>Regulatory & liquidity risks</li>
          <li>Reinvestment risk</li>
          <li>Monetary policy impact</li>
          <li>Currency risk for non-LKR investors</li>
        </ol>
        <p className="mt-2">
          The price of units and dividends may rise or fall, and returns are not guaranteed.
        </p>
      </FundStaticSection>
    </FadeIn>
  ),

  "saving-plus": (
    <FadeIn className="w-full mt-8 space-y-8">
      <FundStaticSection title="Investment Objective">
        <p>
          Maximise short term current income whilst ensuring
          ease of liquidity, by Investing in Money Market
          instruments, Government and Corporate Debt
          securities, with maturities less than 397 days.
        </p>
      </FundStaticSection>
      <FundStaticSection title="Investment Strategy">
        <p>
          Ceybank SavingsPlus follows a low-risk, conservative strategy,
          investing only in short-term money market instruments such as:
        </p>
        <ol className="mt-2 list-disc ms-3">
          <li>Large-cap, high-growth companies</li>
          <li>Diversification across economic sectors to mitigate risk</li>
          <li>Strategic asset allocation to capitalize on market trends</li>
        </ol>
      </FundStaticSection>
      <FundStaticSection title="Risks & Considerations">
        <p>Investing in equities carries inherent market risks, including</p>
        <ol className="mt-2 list-disc ms-3">
          <li>Treasury Bills &amp; Bonds</li>
          <li>Bank Fixed Deposits</li>
          <li>Repurchase Agreements</li>
          <li>Corporate Debentures (Maturity &lt; 1 year)</li>
        </ol>
        <p className="mt-2">
          This fund is not exposed to equity market risks, making it a preferred
          choice for risk-averse investors seeking stable returns and high
          liquidity.
        </p>
      </FundStaticSection>
      <FundStaticSection title="Why Choose Ceybank SavingsPlus?">
        <ol className="mt-2 list-disc ms-3">
          <li>Low-risk, stable returns</li>
          <li>High liquidity with no exit fees</li>
          <li>Not exposed to stock market volatility</li>
          <li>Daily NAV publication and transparent reporting</li>
          <li>Managed by Ceybank Asset Management with decades of expertise</li>
        </ol>
      </FundStaticSection>
    </FadeIn>
  ),

  surakum: (
    <FadeIn className="w-full mt-8 space-y-8">
      <FundStaticSection title="Investment Objective">
        <p>
          Maximise current income whilst ensuring ease of
          liquidity. The Fund invests in Government and
          Government guaranteed securities.
        </p>
      </FundStaticSection>
      <FundStaticSection title="Tax & Risk Considerations">
        <ol className="mt-2 list-disc ms-3">
          <li>Investment returns may fluctuate with market interest rates</li>
          <li>Returns are not guaranteed (unlike fixed deposits)</li>
          <li> Investors in foreign currencies bear currency risk</li>
          <li>Taxation as per prevailing Sri Lankan government policy</li>
        </ol>
      </FundStaticSection>
      <FundStaticSection title="Why Invest in Ceybank Surakum?">
        <ol className="mt-2 list-disc ms-3">
          <li>Secure investments backed by the Government of Sri Lanka</li>
          <li>Low-risk returns ideal for conservative investors</li>
          <li>Stable NAV growth driven by interest-bearing securities</li>
          <li>No front-end or exit fees</li>
          <li>Daily valuation and professional fund management</li>
        </ol>
      </FundStaticSection>
      {/* <FundStaticSection title="Get Started Today">
        <p>
          Secure your capital and earn steady returns with Sri Lanka&apos;s
          trusted gilt-edged fund. Minimum Investment: Rs. 1,000/- Only
        </p>
      </FundStaticSection> */}
    </FadeIn>
  ),

  "unit-trust": (
    <FadeIn className="w-full mt-8 space-y-8">
      <FundStaticSection title="Investment Objective">
        <p>
          The fund seeks long-term capital appreciation while enhancing income
          through a diversified mix of undervalued equities and secure fixed
          income securities, including government and corporate debt instruments.
        </p>
      </FundStaticSection>
      <FundStaticSection title="Investment Strategy">
        <p>Our active portfolio strategy is designed to:</p>
        <ol className="mt-2 list-disc ms-3">
          <li>Target high-growth equities</li>
          <li>Invest in government bonds, corporate debt, and cash equivalents</li>
          <li>Reduce risk via sectoral diversification</li>
        </ol>
      </FundStaticSection>
      <FundStaticSection title="Why Invest in Ceybank Unit Trust?">
        <ol className="mt-2 list-disc ms-3">
          <li>Ideal for moderate-risk investors</li>
          <li>More stable than investing in individual stocks</li>
          <li>Easy entry and exit with no lock-in period</li>
          <li>Backed by decades of fund management expertise</li>
        </ol>
      </FundStaticSection>
      {/* <FundStaticSection title="Get Started Today">
        <p>
          Start building your financial future with just LKR 1,000. For more
          details, performance updates, and fund documents, contact Ceybank
          Asset Management Ltd or visit your nearest Bank of Ceylon branch.
        </p>
      </FundStaticSection> */}
    </FadeIn>
  ),

  "gilt-edge": (
    <FadeIn className="w-full mt-8 space-y-8">
      <FundStaticSection title="Investment Objective">
        <p>
          Maximise short term current income whilst ensuring
          ease of liquidity. Fund invests in Government
          securities and Repos backed by Government securities,
          with maturities less than 397 days.
        </p>
      </FundStaticSection>
      <FundStaticSection title="Investment Strategy">
        <p>This open-ended income fund primarily invests in:</p>
        <ol className="mt-2 list-disc ms-3">
          <li>Treasury Bills</li>
          <li>Treasury Bonds</li>
          <li>Repurchase Agreements</li>
        </ol>
        <p className="mt-2">
          All investments are Sri Lankan government-backed securities, ensuring
          high credit quality and low default risk.
        </p>
      </FundStaticSection>
      <FundStaticSection title="Risk Factors">
        <ol className="mt-2 list-disc ms-3">
          <li>Unit prices and dividend payouts may fluctuate due to market interest rate changes</li>
          <li>No guaranteed returns, unlike fixed deposits</li>
          <li>Currency risk for non-LKR investors</li>
          <li>Subject to inflation, liquidity, and reinvestment risks</li>
        </ol>
        <p className="mt-2">
          However, the fund&apos;s exclusive focus on gilt-edged securities
          significantly reduces credit risk
        </p>
      </FundStaticSection>
      {/* <FundStaticSection title="Reporting & Taxation">
        <ol className="mt-2 list-disc ms-3">
          <li><b>Valuation:</b> Daily</li>
          <li><b>Reports:</b> Annual &amp; Half-Yearly</li>
          <li><b>Taxation:</b> Based on prevailing Government policy</li>
        </ol>
      </FundStaticSection> */}
    </FadeIn>
  ),

  "century-growth": (
    <FadeIn className="w-full mt-8 space-y-8">
      <FundStaticSection title="Investment Objective">
        <p>
          To achieve long-term capital growth by investing in a broad range of
          equity securities of fundamentally strong companies with solid growth
          potential.
        </p>
      </FundStaticSection>

      <FundStaticSection title="Investment Strategy">
        <p>The Fund adopts an active portfolio management approach, focusing on:</p>
        <ol className="mt-2 list-disc ms-3">
          <li>Large-cap, high-growth companies</li>
          <li>Diversification across economic sectors to mitigate risk</li>
          <li>Strategic asset allocation to capitalize on market trends</li>
        </ol>
      </FundStaticSection>

      <FundStaticSection title="Risks & Considerations">
        <p>Investing in equities carries inherent market risks, including</p>
        <ol className="mt-2 list-disc ms-3">
          <li>Market volatility</li>
          <li>Political and economic factors unique to Sri Lanka</li>
          <li>Currency fluctuations (for foreign investors)</li>
        </ol>
        <p className="mt-2">
          It is advisable to consult a licensed financial advisor before investing.
        </p>
      </FundStaticSection>
    </FadeIn>
  ),
};
