import Select from "react-select";
import { NumRange } from "../lib/types";

const options: { value: NumRange; label: string }[] = [
  { value: { start: 0, end: 99 }, label: "0-99" },
  { value: { start: 0, end: 9 }, label: "0-9" },
  { value: { start: 10, end: 19 }, label: "10-19" },
  { value: { start: 20, end: 29 }, label: "20-29" },
  { value: { start: 30, end: 39 }, label: "30-39" },
  { value: { start: 40, end: 49 }, label: "40-49" },
  { value: { start: 50, end: 59 }, label: "50-59" },
  { value: { start: 60, end: 69 }, label: "60-69" },
  { value: { start: 70, end: 79 }, label: "70-79" },
  { value: { start: 80, end: 89 }, label: "80-89" },
  { value: { start: 90, end: 99 }, label: "90-99" },
];

export function RangeSelect(props: {
  handleChange: (range: NumRange[]) => void;
  value: NumRange[];
}) {
  const value = props.value.flatMap((x) => {
    const found = options.find((o) => numRangeEqual(o.value, x));
    return found ? [found] : [];
  });
  return (
    <div style={{ textAlign: "left", marginTop: "0.5rem" }}>
      <Select
        isMulti
        options={options}
        isSearchable={false}
        isClearable={false}
        onChange={(e) => {
          const range = [...e.values()].map((x) => x.value);
          const hasFullRange = range.some(isFullRange);
          if (
            (hasFullRange && !props.value.some(isFullRange)) ||
            (!hasFullRange && range.length === 10)
          ) {
            return props.handleChange([{ start: 0, end: 99 }]);
          }
          props.handleChange(
            range
              .filter((x) => !isFullRange(x))
              .sort((a, b) => a.start - b.start)
          );
        }}
        value={value}
      />
    </div>
  );
}

function isFullRange(a: NumRange): boolean {
  return a.start === 0 && a.end === 99;
}

function numRangeEqual(a: NumRange, b: NumRange): boolean {
  return a.start === b.start && a.end === b.end;
}
