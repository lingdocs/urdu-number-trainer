export type NumRange = {
  /** the starting number in a range, inclusive */
  start: number;
  /** the ending number in a range, inclusive */
  end: number;
};

export type State = {
  range: NumRange[];
  remaining: number[];
  current: number | undefined;
  failed: boolean;
  mode: "read" | "say";
};
