'use server';

/**
 * @fileOverview AI-powered suggestions for optimal parameter ranges (n and p) in Bernoulli and Binomial distributions.
 *
 * - suggestOptimalParameters - A function that suggests optimal parameter ranges for n and p.
 * - SuggestOptimalParametersInput - The input type for the suggestOptimalParameters function.
 * - SuggestOptimalParametersOutput - The return type for the suggestOptimalParameters function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestOptimalParametersInputSchema = z.object({
  n: z.number().describe('The number of trials in the Binomial distribution.'),
  p: z.number().describe('The probability of success in the Binomial distribution.'),
});
export type SuggestOptimalParametersInput = z.infer<
  typeof SuggestOptimalParametersInputSchema
>;

const SuggestOptimalParametersOutputSchema = z.object({
  suggestion: z
    .string()
    .describe(
      'A suggestion for more appropriate parameter ranges (n and p) for better normal/poisson approximations, if needed. If the parameters are suitable, return an empty string.'
    ),
});
export type SuggestOptimalParametersOutput = z.infer<
  typeof SuggestOptimalParametersOutputSchema
>;

export async function suggestOptimalParameters(
  input: SuggestOptimalParametersInput
): Promise<SuggestOptimalParametersOutput> {
  return suggestOptimalParametersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestOptimalParametersPrompt',
  input: {schema: SuggestOptimalParametersInputSchema},
  output: {schema: SuggestOptimalParametersOutputSchema},
  prompt: `You are an expert in probability distributions, specifically the Binomial distribution and its Normal and Poisson approximations.

  A user has selected n = {{{n}}} and p = {{{p}}} for a Binomial distribution.

  Determine if the Normal or Poisson approximations would be accurate for these parameters. If either approximation would be inaccurate, suggest alternative values for n and p that would result in more accurate approximations.

  If the parameters are already suitable for approximations, respond with an empty string.

  Provide a concise suggestion, focusing on how to adjust n and p to improve approximation accuracy.

  Consider these rules for the accuracy of the approximations:
  - The normal approximation to the binomial distribution is accurate when n is large, and p is not too close to 0 or 1 (np > 5 and n(1 − p) > 5)
  - The Poisson approximation to the binomial distribution is accurate when n is large and p is small (n ≥ 20 and p ≤ 0.05).`,
});

const suggestOptimalParametersFlow = ai.defineFlow(
  {
    name: 'suggestOptimalParametersFlow',
    inputSchema: SuggestOptimalParametersInputSchema,
    outputSchema: SuggestOptimalParametersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
