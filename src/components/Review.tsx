import { toArabic } from "../lib/helpers";
import { NumRange } from "../lib/types";
import { urduNumbers } from "../urdu-numbers";

export default function Review({ range }: { range: NumRange[] }) {
  const numbers = range
    .flatMap((r) =>
      urduNumbers
        .slice(r.start, r.end + 1)
        .map((x, i) => [i + r.start, ...x] as const)
    )
    .sort((a, b) => a[0] - b[0]);
  return (
    <table style={{ fontSize: "1.2rem" }}>
      <tbody>
        {numbers.map(([n, urdu, ph]) => {
          return (
            <tr key={n}>
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
