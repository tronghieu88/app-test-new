export function randomCode(): number {
  return +(Math.random() * (999999 - 100000) + 100000).toFixed(0);
}
