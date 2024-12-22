export type NumRange = "all" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type State = {
  range: NumRange;
  remaining: number[];
  current: number | undefined;
  failed: boolean;
  customRange: [0, 99];
};
