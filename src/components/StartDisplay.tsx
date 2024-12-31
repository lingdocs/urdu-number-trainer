import { State } from "../lib/types";

const explanations: Record<State["mode"], string> = {
  read: "Read the number written in Urdu and type it below. For example, if you see ۵, write '5'",
  say: "Roll the dice to get a random number. Try to say the number in Urdu. If you don't know it, press the '?' button.",
};

export default function StartDisplay({
  mode,
  showReview,
}: {
  mode: State["mode"];
  showReview: () => void;
}) {
  return (
    <div>
      <div
        className="urdu"
        style={{
          fontSize: "6rem",
        }}
      >
        شروع
      </div>
      <div style={{ marginBottom: "2rem", padding: "0 2rem" }}>
        {explanations[mode]}
      </div>
      <div>
        <button onClick={showReview}>Review</button>
      </div>
    </div>
  );
}
