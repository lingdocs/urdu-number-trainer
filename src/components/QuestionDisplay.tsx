import { toArabic } from "../lib/helpers";
import { State } from "../lib/types";
import { urduNumbers } from "../urdu-numbers";

export default function QuestionDisplay({
  mode,
  current,
}: {
  mode: State["mode"];
  current: number;
}) {
  return (
    <div>
      <div
        className="urdu"
        style={{
          fontSize: "6rem",
        }}
      >
        {mode === "say" ? (
          toArabic(current)
        ) : (
          <div style={{ fontSize: "4rem" }}>{urduNumbers[current][0]}</div>
        )}
      </div>
    </div>
  );
}
