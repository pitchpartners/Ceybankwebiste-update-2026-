import { ReactNode } from "react";
import { appRoute } from "./routes";

interface IFundType {
    iconPath: string;
    title: string;
    description: string;
    path: string;
}

interface ICount {
    iconPath: string;
    title: string;
    count: number;
    symbol: string;
}


interface IPhilosophy {
    iconPath: string;
    title: string;
    description: string;
}

interface IBenefit{
    iconPath: string;
    title: string;
    description: string;
}


interface IInsightsAndResearches {
    iconPath: string;
    title: string;
    description: string;
}

interface IOurValue {
    title: string;
    bidPrice: string;
    offerPrice: string;
}

interface IReports {
    thumbnail: string;
    path: string;
    filename: string;
}

interface ITestimonial {
    name: string;
    role: string;
    rating: number;
    message: string;
}

export interface IQuestion {
  question: string;
  answer: ReactNode | string;
}


export const fundTypes: IFundType[] = [
    {
        iconPath: "/icons/fund-5.png",
        title: "Ceybank Gilt Edge Fund",
        description: "Ceybank Gilt Edge Fund are specialized fixed-income unit trusts that invest exclusively in Sri Lankan Government securities, including Treasury Bills, Treasury Bonds, and Repurchase Agreements.",
        path: appRoute.gilt_edge_fund,
    },
    {
        iconPath: "/icons/fund-6.png",
        title: "Ceybank High Yield Fund",
        description: "The Ceybank High Yield Fund is a low to moderate risk open-ended money market fund designed to deliver higher income through investments in high-quality corporate debt and short-term money market instruments in Sri Lanka.",
        path: appRoute.high_yield_fund,
    },
    {
        iconPath: "/icons/fund-2.png",
        title: "Ceybank Century Growth Fund",
        description: "The Ceybank Century Growth Fund is a premier equity unit trust in Sri Lanka, designed for investors seeking long-term capital appreciation through strategic investments in listed equities. Launched in 1997",
        path: appRoute.century_growth_fund,
    },
    {
        iconPath: "/icons/fund-1.png",
        title: "Ceybank Unit Trust Fund",
        description: "Ceybank Unit Trust Fund offer a diverse range of professionally managed investment options for individuals and corporate investors in Sri Lanka.",
        path: appRoute.unit_trust_fund,
    },
    {
        iconPath: "/icons/fund-3.png",
        title: "Ceybank Savings Plus Fund",
        description: "The Ceybank Savings Plus Fund is a low-risk, open-ended Money Market Fund designed for investors seeking capital preservation with higher returns than a traditional savings account.",
        path: appRoute.saving_plus_fund,
    },
    {
        iconPath: "/icons/fund-4.png",
        title: "Ceybank Surakum Fund",
        description: "The Ceybank Surakum Gilt-Edged Fund is a low-risk, open-ended unit trust that invests exclusively in government securities such as Treasury Bills and Treasury Bonds.",
        path: appRoute.surakum_fund,
    },
];

export const counts: ICount[] = [
    {
        iconPath: "/icons/team.png",
        title: "Unit Holders",
        count: 3500,
        symbol: "+",
    },
    {
        iconPath: "/icons/increase.png",
        title: "Total Aum",
        count: 55000,
        symbol: "$",
    },
    {
        iconPath: "/icons/processing.png",
        title: "Total Transaction",
        count: 670,
        symbol: "+",
    },
    {
        iconPath: "/icons/investing.png",
        title: "Total Deposited",
        count: 156980,
        symbol: "$",
    },
];

export const philosophies: IPhilosophy[] = [
    {
        iconPath: "/icons/strategy.png",
        title: "Personalized Strategies",
        description: "Emphasize bespoke financial solutions tailored to individual goals.",
    },
    {
        iconPath: "/icons/consulting.png",
        title: "Expert Advisory",
        description: "Highlight the proficiency of Ceybank's financial advisors in managing substantial wealth.",
    },
    {
        iconPath: "/icons/global-marketing.png",
        title: "Global Reach",
        description: "Showcase access to international markets and diversified investment opportunities.",
    },
];

export const philosophiesPWM: IPhilosophy[] = [
    {
        iconPath: "/icons/strategy.png",
        title: "Personalized Strategies",
        description: "We offer tailored financial solutions that grow, preserve, or generate income  evolving with your goals.",
    },
    {
        iconPath: "/icons/consulting.png",
        title: "Expert Advisory",
        description: "Our expert advisors manage portfolios with discipline, insights, and personalized service for individuals, families, and institutions.",
    },
    // {
    //     iconPath: "/icons/global-marketing.png",
    //     title: "Global Reach",
    //     description: "Access diverse investments in Sri Lanka and abroad with global reach and local expertise — for residents and overseas investors alike.",
    // },
];

export const benefits: IBenefit[] = [
    {
        iconPath: "/icons/strategy.png",
        title: "Seamless Digital Onboarding",
        description: "Open your investment account fully online. Complete KYC, upload documents, and start investing without visiting a branch.",
    },
    {
        iconPath: "/icons/consulting.png",
        title: "Real-Time Portfolio Access",
        description: "Track your investments anytime. View fund performance, allocations, dividends, and statements through a secure dashboard.",
    },
    {
        iconPath: "/icons/global-marketing.png",
        title: "Diverse Investment Options",
        description: "Access Ceybank Unit Trust Funds, fixed income products, government securities, and more — all in one place for growth, income, or capital preservation.",
    },
];


export const insightsAndResearches: IInsightsAndResearches[] = [
    {
        iconPath: "/icons/insight.png",
        title: "Insights & Research",
        description: "Timely updates and forecasts on financial markets, macroeconomic shifts, and investment opportunities.",
    },
    {
        iconPath: "/icons/thought-leadership.png",
        title: "Thought Leadership",
        description: "Exclusive publications, investment outlooks, and whitepapers from our wealth management experts.",
    },
    {
        iconPath: "/icons/script.png",
        title: "Client Stories",
        description: "Real-life narratives from investors who have achieved their financial milestones with Ceybank.",
    },
];

export const ourValues: IOurValue[] = [
    {
        title: "Ceybank Unit Trust Fund",
        bidPrice: "38.36",
        offerPrice: "38.44",
    },
    {
        title: "Ceybank Century Growth Fund",
        bidPrice: "121.07",
        offerPrice: "127.53",
    },
    {
        title: "Ceybank Saving Plus Fund",
        bidPrice: "18.2631",
        offerPrice: "18.2631",
    },
    {
        title: "Ceybank Surakum Fund",
        bidPrice: "22.3089",
        offerPrice: "22.3089",
    },
    {
        title: "Ceybank Glit Edge (A Series) Fund",
        bidPrice: "22.9085",
        offerPrice: "22.9085",
    },
    {
        title: "Ceybank Hight Yield Fund",
        bidPrice: "23.8243",
        offerPrice: "23.8243",
    },
];

export const annualReports: IReports[] = [
    {
        path: "abc",
        filename: "CEYBANK CENTURY GROWTH FUND ANNUAL REPORT  2023/2024",
        thumbnail: "/images/reports/thumbnail.png",
    },
    {
        path: "abc",
        filename: "CEYBANK CENTURY GROWTH FUND ANNUAL REPORT  2023/2024",
        thumbnail: "/images/reports/thumbnail.png",
    },
    {
        path: "abc",
        filename: "CEYBANK CENTURY GROWTH FUND ANNUAL REPORT  2023/2024",
        thumbnail: "/images/reports/thumbnail.png",
    },
    {
        path: "abc",
        filename: "CEYBANK CENTURY GROWTH FUND ANNUAL REPORT  2023/2024",
        thumbnail: "/images/reports/thumbnail.png",
    },
    {
        path: "abc",
        filename: "CEYBANK CENTURY GROWTH FUND ANNUAL REPORT  2023/2024",
        thumbnail: "/images/reports/thumbnail.png",
    },
    {
        path: "abc",
        filename: "CEYBANK CENTURY GROWTH FUND ANNUAL REPORT  2023/2024",
        thumbnail: "/images/reports/thumbnail.png",
    },
    {
        path: "abc",
        filename: "CEYBANK CENTURY GROWTH FUND ANNUAL REPORT  2023/2024",
        thumbnail: "/images/reports/thumbnail.png",
    },
    {
        path: "abc",
        filename: "CEYBANK CENTURY GROWTH FUND ANNUAL REPORT  2023/2024",
        thumbnail: "/images/reports/thumbnail.png",
    },
];

export const testimonials: ITestimonial[] = [
    {
        name: "Tharindu S.",
        role: "Colombo",
        rating: 5,
        message: "I started small with the Ceybank High Yield Fund, and the returns exceeded my expectations. It’s a great option for managing short-term savings.",
    },
    {
        name: "Nadeeka R.",
        role: "Kandy",
        rating: 4,
        message: "As a retiree, the Gilt Edge Fund gives me peace of mind. My capital feels safe, and I receive regular income.",
    },
    {
        name: "Imran F.",
        role: "Negombo",
        rating: 5,
        message: "Their online support and reporting tools are easy to use and transparent. Ceybank has earned my long-term trust.",
    },
];

