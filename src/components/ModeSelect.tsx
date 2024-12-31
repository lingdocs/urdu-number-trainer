import { Action } from "../lib/reducer";
import { State } from "../lib/types";

export default function ModeSelect(props: {
  mode: State["mode"];
  dispatch: (a: Action) => void;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
      <button
        className={props.mode === "say" ? "selected" : ""}
        onClick={() => props.dispatch({ type: "change mode", payload: "say" })}
      >
        Say
      </button>
      <button
        className={props.mode === "read" ? "selected" : ""}
        onClick={() => props.dispatch({ type: "change mode", payload: "read" })}
      >
        Read
      </button>
    </div>
  );
}
