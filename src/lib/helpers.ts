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
  const total = state.range === "all" ? 100 : 10;
  return 100 - Math.floor((state.remaining.length / total) * 100);
}
