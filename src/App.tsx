import "./App.css";
import { useStickyReducer } from "use-sticky-reducer";
import ProgressBar from "./components/ProgressBar";
import { useReward } from "react-rewards";
import { getProgress, toArabic } from "./lib/helpers";
import { reducer, restartRange } from "./lib/reducer";
import { RangeSelect } from "./components/RangeSelect";
import FailDisplay from "./components/FailDisplay";
import { width } from "./lib/width";

const initialState = restartRange("all");

function App() {
  const { reward } = useReward("rewardId", "confetti", {
    zIndex: 9999999,
  });
  const [state, dispatch] = useStickyReducer(
    reducer(reward),
    initialState,
    "numbers-state-1"
  );
  function handleQuestion() {
    alert(
      "Press '➡️' to get the next number. See if you can say the number. If you don't know it, press '?' to get the answer. See if you can say all the numbers confidently without checking!"
    );
  }
  const progress = getProgress(state);
  return (
    <>
      <span id="rewardId" />
      <ProgressBar progress={progress} />
      <div style={{ position: "absolute", top: "3rem", width }}>
        <h1>Urdu Number Trainer</h1>
        <div style={{ marginTop: "-1rem", marginBottom: "1rem" }}>
          by <a href="https://www.lingdocs.com/">LingDocs</a>
        </div>
        <RangeSelect
          value={state.range}
          handleChange={(range) =>
            dispatch({ type: "change range", payload: range })
          }
        />
      </div>
      {state.failed ? (
        <FailDisplay current={state.current} />
      ) : (
        <div
          className="urdu"
          style={{
            width,
            fontSize: "6rem",
          }}
        >
          {state.current === undefined ? "شروع" : toArabic(state.current)}
        </div>
      )}
      <div
        style={{
          position: "absolute",
          bottom: "3rem",
          display: "flex",
          width,
          justifyContent: "space-between",
        }}
      >
        <h3>
          <button
            style={{ width: "6rem" }}
            onClick={
              progress === 0 ? handleQuestion : () => dispatch({ type: "fail" })
            }
          >
            ?
          </button>
        </h3>
        <h3>
          <button
            style={{ width: "6rem" }}
            onClick={() => dispatch({ type: "roll dice" })}
          >
            🎲
          </button>
        </h3>
      </div>
    </>
  );
}

export default App;
