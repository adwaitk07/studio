"use server";

import { suggestOptimalParameters as suggest } from '@/ai/flows/suggest-optimal-parameters';
import type { SuggestOptimalParametersInput } from '@/ai/flows/suggest-optimal-parameters';

export async function suggestOptimalParameters(input: SuggestOptimalParametersInput): Promise<string> {
  try {
    const result = await suggest(input);
    return result.suggestion;
  } catch (error) {
    console.error('AI suggestion failed:', error);
    // In case of an error, return a user-friendly message.
    return 'Could not get an AI suggestion at this time. Please try again later.';
  }
}
