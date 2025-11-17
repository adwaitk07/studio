'use client';

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type ProbabilityChartProps = {
  data: any[];
  distribution: string;
};

const chartConfig = {
  pmf: {
    label: 'Theoretical PMF',
    color: 'hsl(var(--chart-1))',
  },
  simulation: {
    label: 'Simulation',
    color: 'hsl(var(--chart-2))',
  },
  normal: {
    label: 'Normal Approx.',
    color: 'hsl(var(--chart-3))',
  },
  poisson: {
    label: 'Poisson Approx.',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

export default function ProbabilityChart({ data, distribution }: ProbabilityChartProps) {
  const showApproximations = distribution === 'binomial' && data.length > 1;

  return (
    <Card>
       <CardHeader>
        <CardTitle>Distribution Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="k" label={{ value: 'Number of Successes (k)', position: 'insideBottom', offset: -25, style: { fontSize: '0.875rem' } }} tick={{ fontSize: '0.75rem' }} />
              <YAxis label={{ value: 'Probability', angle: -90, position: 'insideLeft', offset: -10, style: { textAnchor: 'middle', fontSize: '0.875rem' } }} tick={{ fontSize: '0.75rem' }} />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend wrapperStyle={{paddingTop: '20px'}}/>
              <Bar dataKey="pmf" name="Theoretical PMF" fill="var(--color-pmf)" barSize={20} />
              <Bar dataKey="simulation" name="Simulation" fill="var(--color-simulation)" barSize={20} />
              {showApproximations && <Line type="monotone" dataKey="normal" name="Normal Approx." stroke="var(--color-normal)" strokeWidth={2} dot={false} />}
              {showApproximations && <Line type="monotone" dataKey="poisson" name="Poisson Approx." stroke="var(--color-poisson)" strokeWidth={2} dot={false} />}
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
