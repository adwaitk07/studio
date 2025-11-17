'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Download, Info, Play, Loader2 } from 'lucide-react';

type ParameterControlsProps = {
  distribution: string;
  setDistribution: (value: string) => void;
  n: number;
  setN: (value: number) => void;
  p: number;
  setP: (value: number) => void;
  runSimulation: () => void;
  exportData: () => void;
  aiSuggestion: string;
  isSimulating: boolean;
};

export default function ParameterControls({
  distribution,
  setDistribution,
  n,
  setN,
  p,
  setP,
  runSimulation,
  exportData,
  aiSuggestion,
  isSimulating,
}: ParameterControlsProps) {
  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle>Control Panel</CardTitle>
        <CardDescription>
          Adjust parameters to see how they affect the distributions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="distribution">Distribution Type</Label>
          <Select value={distribution} onValueChange={setDistribution}>
            <SelectTrigger id="distribution">
              <SelectValue placeholder="Select a distribution" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="binomial">Binomial</SelectItem>
              <SelectItem value="bernoulli">Bernoulli</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {distribution === 'binomial' && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="n-slider">Number of Trials (n)</Label>
              <span className="text-sm font-medium text-foreground">{n}</span>
            </div>
            <Slider
              id="n-slider"
              min={1}
              max={200}
              step={1}
              value={[n]}
              onValueChange={(val) => setN(val[0])}
            />
          </div>
        )}

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="p-slider">Probability of Success (p)</Label>
            <span className="text-sm font-medium text-foreground">{p.toFixed(2)}</span>
          </div>
          <Slider
            id="p-slider"
            min={0}
            max={1}
            step={0.01}
            value={[p]}
            onValueChange={(val) => setP(val[0])}
          />
        </div>
        
        {aiSuggestion && (
           <Alert>
             <Info className="h-4 w-4" />
             <AlertTitle>AI Suggestion</AlertTitle>
             <AlertDescription>{aiSuggestion}</AlertDescription>
           </Alert>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2">
        <Button onClick={runSimulation} disabled={isSimulating} className="w-full">
          {isSimulating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Play className="mr-2 h-4 w-4" />
          )}
          Run Simulation
        </Button>
        <Button onClick={exportData} variant="outline" className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </CardFooter>
    </Card>
  );
}
