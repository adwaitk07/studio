'use client';

import { useState, useEffect, useMemo } from 'react';
import IntroAnimation from './intro-animation';
import ParameterControls from './parameter-controls';
import ProbabilityChart from './probability-chart';
import { useDebounce } from '@/lib/hooks/use-debounce';
import { suggestOptimalParameters } from '@/app/actions';
import {
  binomialPmf,
  bernoulliPmf,
  poissonPmf,
  normalPdf,
} from '@/lib/calculations';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type ChartDataPoint = {
  k: number;
  pmf: number;
  simulation?: number;
  normal?: number;
  poisson?: number;
};

export default function ProbabilityExplorer() {
  const [isMounted, setIsMounted] = useState(false);
  const [distribution, setDistribution] = useState('binomial');
  const [n, setN] = useState(10);
  const [p, setP] = useState(0.5);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  
  const debouncedN = useDebounce(n, 500);
  const debouncedP = useDebounce(p, 500);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (distribution === 'binomial') {
      const getSuggestion = async () => {
        const suggestion = await suggestOptimalParameters({ n: debouncedN, p: debouncedP });
        setAiSuggestion(suggestion);
      };
      getSuggestion();
    } else {
      setAiSuggestion('');
    }
  }, [debouncedN, debouncedP, distribution]);
  
  const theoreticalData = useMemo(() => {
    const data: ChartDataPoint[] = [];
    if (distribution === 'bernoulli') {
      for (let k = 0; k <= 1; k++) {
        data.push({ k, pmf: bernoulliPmf(k, p) });
      }
    } else {
      const lambda = n * p;
      const mu = n * p;
      const sigma = Math.sqrt(n * p * (1 - p));

      for (let k = 0; k <= n; k++) {
        data.push({
          k,
          pmf: binomialPmf(k, n, p),
          normal: normalPdf(k, mu, sigma),
          poisson: poissonPmf(k, lambda),
        });
      }
    }
    return data;
  }, [n, p, distribution]);

  useEffect(() => {
    setChartData(theoreticalData);
  }, [theoreticalData]);
  
  const handleRunSimulation = () => {
    setIsSimulating(true);
    // Use setTimeout to avoid blocking the main thread and allow UI to update
    setTimeout(() => {
        const simulationCount = 1000;
        const outcomes: { [key: number]: number } = {};

        for(let k = 0; k <= (distribution === 'binomial' ? n : 1); k++) {
            outcomes[k] = 0;
        }

        if (distribution === 'bernoulli') {
            for (let i = 0; i < simulationCount; i++) {
                if (Math.random() < p) outcomes[1]++;
                else outcomes[0]++;
            }
        } else { // Binomial
            for (let i = 0; i < simulationCount; i++) {
                let successes = 0;
                for (let j = 0; j < n; j++) {
                    if (Math.random() < p) successes++;
                }
                if(outcomes[successes] !== undefined) {
                    outcomes[successes]++;
                }
            }
        }

        const simulatedData = theoreticalData.map(d => ({
            ...d,
            simulation: (outcomes[d.k] || 0) / simulationCount
        }));

        setChartData(simulatedData);
        setIsSimulating(false);
        toast({
            title: 'Simulation Complete',
            description: `Ran ${simulationCount} trials successfully.`,
        });
    }, 50);
  };

  const handleExport = () => {
    if (chartData.length === 0) {
      toast({
        title: 'No Data to Export',
        description: 'Generate some data before exporting.',
        variant: 'destructive',
      });
      return;
    }
    const headers = ['k', 'theoretical_pmf', 'simulation', 'normal_approx', 'poisson_approx'];
    const csvContent = [
      headers.join(','),
      ...chartData.map(row => [row.k, row.pmf, row.simulation || 0, row.normal || 0, row.poisson || 0].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `probability_data_${distribution}_n${n}_p${p.toFixed(2)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: 'Export Successful', description: 'Your data has been downloaded.' });
  };

  if (!isMounted) return <IntroAnimation />;

  return (
    <>
      <IntroAnimation />
      <div className="min-h-screen w-full px-4 py-8 md:px-8 lg:py-12">
        <div className="mx-auto max-w-7xl">
            <header className="text-center mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
                Probability Explorer
              </h1>
              <p className="mt-4 text-lg text-foreground/80">
                Interactively explore Bernoulli and Binomial distributions.
              </p>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 space-y-8 lg:space-y-0">
                <div className="lg:col-span-1">
                    <ParameterControls
                        distribution={distribution}
                        setDistribution={setDistribution}
                        n={n}
                        setN={setN}
                        p={p}
                        setP={setP}
                        runSimulation={handleRunSimulation}
                        exportData={handleExport}
                        aiSuggestion={aiSuggestion}
                        isSimulating={isSimulating}
                    />
                </div>
                <div className="lg:col-span-2">
                    <ProbabilityChart data={chartData} distribution={distribution} />
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
