import { toArabic } from "../lib/helpers";
import { urduNumbers } from "../urdu-numbers";

export default function Review({ range }: { range: number }) {
  const offset = range === 0 ? 0 : (range - 1) * 10;
  const nums =
    range === 0
      ? urduNumbers
      : urduNumbers.slice(range > 1 ? offset : 0, offset + 10);
  return (
    <table style={{ fontSize: "1.2rem" }}>
      {/* <tr>
      <th>Company</th>
      <th>Contact</th>
      <th>Country</th>
    </tr> */}
      {nums.map(([urdu, ph], i) => {
        const n = range === 0 ? i : i + (range - 1) * 10;
        return (
          <tr>
            <td style={{ paddingTop: "0.75rem" }}>{n}</td>
            <td className="urdu">{toArabic(n)}</td>
            <td className="urdu">{urdu}</td>
            <td>{ph}</td>
          </tr>
        );
      })}
    </table>
  );
}
