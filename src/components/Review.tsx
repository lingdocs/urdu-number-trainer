import { toArabic } from "../lib/helpers";
import { NumRange } from "../lib/types";
import { urduNumbers } from "../urdu-numbers";

export default function Review({ range }: { range: NumRange }) {
  const nums = urduNumbers.slice(range.start, range.end + 1);
  return (
    <table style={{ fontSize: "1.2rem" }}>
      <tbody>
        {nums.map(([urdu, ph], i) => {
          const n = i + range.start;
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
