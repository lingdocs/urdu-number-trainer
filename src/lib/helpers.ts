import { State } from "./types";

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
  const total = state.range.end - state.range.start + 1;
  return 100 - Math.floor((state.remaining.length / total) * 100);
}
