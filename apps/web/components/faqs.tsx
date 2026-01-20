import { IQuestion } from "@/constants/content";

export const questions: IQuestion[] = [
  {
    question: "1. What is a Unit Trust Fund?",
    answer: (
      <div className="space-y-2">
        <p>
          A Unit Trust Fund is a trust which pools money from like-minded investors and invests in a diversified
          portfolio of securities. There are various schemes that address different needs of investors. The pool of
          money thus collected is then invested by the Asset Management Company (AMC) in different types of securities.
          These could include shares, debentures, Treasury and Money Market instruments, based on the investment
          objective of a particular scheme. Such objective is clearly laid down in the Prospectus of that scheme.
        </p>
        <p>
          The fund generates the income for the investors by way of dividend, interest and capital gains. This is
          distributed to the unitholders in proportion to the number of units they own.
        </p>
      </div>
    ),
  },
  {
    question: "2. What is an Asset Management Company (AMC)?",
    answer: (
      <div className="space-y-2">
        <p>
          The main responsibility of an AMC is to manage the fund investments according to its objectives. It also is
          involved in the daily administration and selling units to investors and cancelling units when investors
          divest them. An asset management company is promoted by a sponsor which usually is a reputed corporate entity
          with sound record of profits.
        </p>
        <p>An AMC typically has three departments:</p>
        <ul className="list-disc list-inside">
          <li>Fund Management</li>
          <li>Sales & Marketing</li>
          <li>Operations & Accounting</li>
        </ul>
        <p>
          <strong>Eg:</strong> Asset Management Company for Ceybank Unit Trust Funds is The Ceybank Asset Management
          Limited.
        </p>
      </div>
    ),
  },
  {
    question: "3. Trustee",
    answer: (
      <div className="space-y-2">
        <p>
          They are an institution independent from managers who monitor the manager&apos;s conformance with the trust deed
          and regulatory requirements. They also create and cancel units at the request of managers, have custody of
          trust assets and also ensure registration of unit/shareholder.
        </p>
        <p>
          <strong>Eg:</strong> National Savings Bank is the Trustee for Ceybank Unit Trust Funds
        </p>
      </div>
    ),
  },
  {
    question: "4. What are the different types of Unit Trust Fund schemes?",
    answer: (
      <div className="space-y-4">
        <div>
          <strong>By Structure</strong>
          <ul className="list-disc list-inside mt-1">
            <li>
              <strong>Open-end funds:</strong> Available for subscription on an ongoing basis. These do not have a fixed
              maturity. Investors can conveniently buy and sell units at Net Asset Value (&ldquo;NAV&rdquo;) related prices.
            </li>
            <li>
              <strong>Closed-end funds:</strong> Have a fixed maturity. Investors can only invest during the initial
              offer period (IPO).
            </li>
          </ul>
        </div>

        <div>
          <strong>By Investment Objective</strong>
          <ul className="list-disc list-inside mt-1">
            <li>
              <strong>Growth Funds:</strong> Aim to provide capital appreciation over the medium to long term, investing
              mainly in equities. Ideal for long-term investors seeking growth.
            </li>
            <li>
              <strong>Balanced Funds:</strong> Provide both growth and regular income. Invest in equities and fixed
              income securities. Ideal for those seeking income and moderate growth.
            </li>
            <li>
              <strong>Income Funds:</strong> Aim to provide current income at low risk. Suitable for regular income
              seekers.
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    question: "5. What is a Prospectus?",
    answer: (
      <div className="space-y-2">
        <p>
          It is a document which provides investors with important information about the fund. Investors should read it
          carefully before investing.
        </p>
        <p>A prospectus contains descriptions of:</p>
        <ul className="list-disc list-inside">
          <li>Nature of the Fund</li>
          <li>Fees and charges</li>
          <li>Investment Objective of the Fund</li>
          <li>The AMC and Trustee</li>
          <li>Investment Strategies and Restrictions</li>
          <li>Risk Factors and Description</li>
          <li>Investment Management and Compensation</li>
          <li>Dividend Distributions</li>
          <li>Rights of the Unitholder</li>
          <li>Other Services</li>
        </ul>
      </div>
    ),
  },
  {
    question: "6. What is the Net Asset Value (NAV)?",
    answer: (
      <div className="space-y-2">
        <p>
          The net asset value (NAV) is the market value of the Fund&apos;s assets net of all costs. It is calculated at the
          end of each trading day.
        </p>
        <p>
          The price (value) of a unit is calculated based on the NAV and published daily. Units are bought and sold
          based on these prices.
        </p>
      </div>
    ),
  },
  {
    question: "7. What are Dividends?",
    answer: (
      <div className="space-y-2">
        <p>
          A Unit Trust Fund may receive dividend or interest income as well as trading profits from the securities it
          owns; this income in turn is distributed to unitholders as dividend.
        </p>
        <p>
          Most open-end Funds offer an option to purchase additional units with the dividends. Dividends are often made
          annually.
        </p>
      </div>
    ),
  },
  {
    question: "8. Are investments in Unit Trust Fund units safe?",
    answer: (
      <div className="space-y-2">
        <p>
          Different funds have different risk profiles, which are stated in their objectives. Funds that categorize
          themselves as low risk invest generally in debt, which is less risky than equity.
        </p>
        <p>
          Stock market-related investments cannot be termed safe with certainty; they are inherently risky. Investors
          should choose their fund depending on the amount of risk they are willing to tolerate.
        </p>
      </div>
    ),
  },
  {
    question: "9. What are the Risks in a Unit Trust Fund?",
    answer: (
      <div className="space-y-2">
        <p>
          Equity Funds are open to market risk—i.e., there is a possibility that the price of the stocks in which the
          Fund has invested may decrease. Of course, the prices may also go up, making it possible for the Fund to earn
          profits.
        </p>
      </div>
    ),
  },
  {
    question: "10. What are the benefits of a Unit Trust Fund?",
    answer: (
      <ul className="list-disc list-inside space-y-1">
        <li>Your money is managed by experienced and skilled professionals</li>
        <li>
          Your investment is automatically diversified over a large number of companies and industries, thus reducing
          the element of risk
        </li>
        <li>Your money is very liquid – can be withdrawn easily</li>
        <li>
          The potential to provide a good return at appropriate risk levels over the medium to long term is better in a
          wide range of securities
        </li>
        <li>
          The costs of research and investing directly in the individual securities are spread over a large corpus and
          thousands of investors thus minimizing individual share
        </li>
        <li>
          There is a high degree of transparency in the operation of a Unit Trust Fund, so you can take investment
          decisions based on more information
        </li>
        <li>You have a choice of schemes to suit your needs</li>
        <li>The industry is well regulated with many measures oriented towards investor protection</li>
      </ul>
    ),
  },
  {
    question: "11. Do Unit Trust Funds Assure Returns?",
    answer: (
      <p>It is not possible to assure returns in a volatile market.</p>
    ),
  },
  {
    question: "12. How do you make money in a Unit Trust Fund?",
    answer: (
      <ul className="list-disc list-inside space-y-1">
        <li>Dividends</li>
        <li>Appreciation of the unit price</li>
      </ul>
    ),
  },
  {
    question: "13. What are the Tax Benefits for investing in Unit Trust Funds?",
    answer: (
      <p>Both dividend and capital gains are exempt from tax.</p>
    ),
  },
  {
    question: "14. Who should invest in Unit Trust Funds?",
    answer: (
      <div className="space-y-2">
        <p>
          Unit Trust Funds can meet the investment objectives of almost all types of investors. Younger investors who
          can take some risk while aiming for substantial growth of capital in the long term will find Growth Schemes
          (i.e. Funds which invest in stocks) an ideal option.
        </p>
        <p>
          Older investors who are risk-averse and prefer a steady income in the medium term can invest in Balanced
          Schemes (i.e. funds which invest in Stocks and Money market instruments).
        </p>
        <p>
          Investors in middle age can allocate their savings between Income Funds and Growth Funds and achieve both
          income and capital growth.
        </p>
      </div>
    ),
  },
  {
    question: "15. Are Unit Trust Fund schemes suitable for small investors?",
    answer: (
      <div className="space-y-2">
        <p>
          Unit Trust Funds are meant for small investors. The prime reason is that successful investments in financial
          markets require careful analysis which is not possible for a small investor.
        </p>
        <p>
          Unit Trust Funds are usually equipped to carry out thorough analysis and can provide superior return.
        </p>
      </div>
    ),
  },
];

