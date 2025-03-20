export const DecimalTransformer =
  (decimals: number = 2) =>
  ({ value }): number =>
    Number((Math.round(value * 100) / 100).toFixed(decimals) ?? value);
