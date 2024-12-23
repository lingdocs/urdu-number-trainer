import { NumRange, State } from "./types";

export function toArabic(n: number) {
  const id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return n.toString().replace(/[0-9]/g, function (w) {
    return id[+w];
  });
}

export function assertUnreachable(x: never): never {
  console.error(x);
  throw new Error("Didn't expect to get here");
}

export function getProgress(state: State): number {
  const getRangeTotal = (r: NumRange) => r.end - r.start + 1;
  const total = state.range.reduce((acc, curr) => acc + getRangeTotal(curr), 0);
  return 100 - Math.floor((state.remaining.length / total) * 100);
}
