import { toArabic } from "../lib/helpers";
import { urduNumbers } from "../urdu-numbers";

export default function FailDisplay({
  current,
}: {
  current: number | undefined;
}) {
  if (current === undefined) {
    return null;
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="urdu" style={{ fontSize: "5rem" }}>
          {toArabic(current)}
        </div>
        <div
          style={{
            fontSize: "3rem",
            marginBottom: "1.3rem",
            marginLeft: "1rem",
          }}
        >
          / {current}
        </div>
      </div>
      <div
        className="urdu"
        style={{
          fontSize: "4rem",
        }}
      >
        {urduNumbers[current][0]}
      </div>
      <div style={{ fontSize: "2rem" }}>{urduNumbers[current][1]}</div>
    </div>
  );
}
