"use client";

import { Pie, PieChart } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const palette = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

type ChartSlice = { label: string; value: number };

interface ChartPieLabelProps {
  data: ChartSlice[];
}

export function ChartPieLabel({ data }: ChartPieLabelProps) {
  if (!data?.length) {
    return (
      <Card className="flex flex-col border-0 p-0 w-full">
        <CardContent className="pb-6 pt-6 text-center text-muted-foreground">
          Data will be published soon.
        </CardContent>
      </Card>
    );
  }

  const chartConfig = data.reduce<ChartConfig>(
    (acc, item, index) => {
      const color = palette[index % palette.length];
      acc[item.label] = { label: item.label, color };
      return acc;
    },
    { value: { label: "Value" } },
  );

  const chartData = data.map((item, index) => ({
    name: item.label,
    value: item.value,
    fill: palette[index % palette.length],
  }));

  return (
    <Card className="flex flex-col border-0 p-0 w-full">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-primary mx-auto aspect-square w-full md:w-4/5 xl:w-2/3 h-auto pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="value" label nameKey="name" />
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
