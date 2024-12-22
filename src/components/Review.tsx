import { toArabic } from "../lib/helpers";
import { NumRange } from "../lib/types";
import { urduNumbers } from "../urdu-numbers";

export default function Review({ range }: { range: NumRange }) {
  const offset = range === "all" ? 0 : range * 10;
  const nums = urduNumbers.slice(
    offset,
    range === "all" ? undefined : offset + 10
  );
  return (
    <table style={{ fontSize: "1.2rem" }}>
      <tbody>
        {nums.map(([urdu, ph], i) => {
          const n = range === "all" ? i : i + range * 10;
          return (
            <tr key={i}>
              <td>{n}</td>
              <td className="urdu" style={{ fontSize: "1.9rem" }}>
                {toArabic(n)}
              </td>
              <td className="urdu" style={{ fontSize: "1.7rem" }}>
                {urdu}
              </td>
              <td>{ph}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
