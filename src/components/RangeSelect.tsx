import Select from "react-select";
import { State } from "../lib/types";

const options: { value: State["range"]; label: string }[] = [
  { value: "all", label: "0-99" },
  { value: 0, label: "0-9" },
  { value: 1, label: "10-19" },
  { value: 2, label: "20-29" },
  { value: 3, label: "30-39" },
  { value: 4, label: "40-49" },
  { value: 5, label: "50-59" },
  { value: 6, label: "60-69" },
  { value: 7, label: "70-79" },
  { value: 8, label: "80-89" },
  { value: 9, label: "90-99" },
];

export function RangeSelect(props: {
  handleChange: (range: State["range"]) => void;
  value: State["range"];
}) {
  return (
    <div style={{ textAlign: "left", marginTop: "0.5rem" }}>
      <Select
        options={options}
        onChange={(e) => props.handleChange(e?.value ?? "all")}
        value={options.find((o) => o.value === props.value)}
      />
    </div>
  );
}
