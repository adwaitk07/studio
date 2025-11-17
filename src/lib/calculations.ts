const factorialCache: { [key: number]: number } = {};

export function factorial(n: number): number {
  if (n < 0) {
    return NaN;
  }
  if (n === 0) {
    return 1;
  }
  if (factorialCache[n]) {
    return factorialCache[n];
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  factorialCache[n] = result;
  return result;
}

export function combinations(n: number, k: number): number {
  if (k < 0 || k > n) {
    return 0;
  }
  if (k === 0 || k === n) {
    return 1;
  }
  if (k > n / 2) {
    k = n - k;
  }
  let res = 1;
  for (let i = 1; i <= k; i++) {
    res = (res * (n - i + 1)) / i;
  }
  return res;
}

export function binomialPmf(k: number, n: number, p: number): number {
  if (p < 0 || p > 1 || n < 0) return 0;
  return combinations(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

export function bernoulliPmf(k: number, p: number): number {
  if (k === 1) return p;
  if (k === 0) return 1 - p;
  return 0;
}

export function poissonPmf(k: number, lambda: number): number {
  if (lambda < 0) return 0;
  return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
}

export function normalPdf(x: number, mu: number, sigma: number): number {
  if (sigma <= 0) return 0;
  return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2));
}
