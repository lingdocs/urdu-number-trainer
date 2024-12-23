import Select from "react-select";
import { NumRange, State } from "../lib/types";

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
  handleChange: (range: State["range"]) => void;
  value: State["range"];
}) {
  return (
    <div style={{ textAlign: "left", marginTop: "0.5rem" }}>
      <Select
        options={options}
        isSearchable={false}
        onChange={(e) => props.handleChange(e?.value ?? { start: 0, end: 99 })}
        value={options.find((o) => numRangeEqual(o.value, props.value))}
      />
    </div>
  );
}

function numRangeEqual(a: NumRange, b: NumRange): boolean {
  return a.start === b.start && a.start === b.start;
}
