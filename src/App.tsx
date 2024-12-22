import "./App.css";
import { useStickyReducer } from "use-sticky-reducer";
import ProgressBar from "./components/ProgressBar";
import { useReward } from "react-rewards";
import { getProgress, toArabic } from "./lib/helpers";
import { reducer, restartRange } from "./lib/reducer";
import { RangeSelect } from "./components/RangeSelect";
import FailDisplay from "./components/FailDisplay";
import Modal from "react-modal";
import { width } from "./lib/width";
import { useState } from "react";
import Review from "./components/Review";

const initialState = restartRange("all");

function App() {
  const { reward } = useReward("rewardId", "confetti", {
    zIndex: 9999999,
  });
  const [showingReview, setShowingReview] = useState<boolean>(false);
  const [showingHelp, setShowingHelp] = useState<boolean>(false);
  const [state, dispatch] = useStickyReducer(
    reducer(reward),
    initialState,
    "numbers-state-1"
  );
  const progress = getProgress(state);
  return (
    <>
      <span id="rewardId" />
      <ProgressBar progress={progress} />
      <div style={{ position: "absolute", top: "2rem", width }}>
        <h1>Urdu Number Trainer</h1>
        <div style={{ marginTop: "-1rem", marginBottom: "2rem" }}>
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
        <div>
          <div
            className="urdu"
            style={{
              width,
              fontSize: "6rem",
            }}
          >
            {state.current === undefined ? (
              <div style={{ margin: "2rem 0" }}>شروع</div>
            ) : (
              toArabic(state.current)
            )}
          </div>
        </div>
      )}
      {(progress === 0 || state.failed) && (
        <button onClick={() => setShowingReview(true)}>review</button>
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
              progress === 0
                ? () => setShowingHelp(true)
                : () => dispatch({ type: "fail" })
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
        <Modal
          isOpen={showingReview}
          onRequestClose={() => setShowingReview(false)}
          style={{
            content: {
              maxWidth: "20rem",
              margin: "0 auto",
            },
          }}
          ariaHideApp={false}
          contentLabel="Review Modal"
        >
          <Review range={state.range} />
          <div style={{ margin: "0.75rem 0", textAlign: "center" }}>
            <button onClick={() => setShowingReview(false)}>close</button>
          </div>
        </Modal>
        <Modal
          isOpen={showingHelp}
          onRequestClose={() => setShowingHelp(false)}
          style={{
            content: {
              maxWidth: "20rem",
              margin: "0 auto",
            },
          }}
          ariaHideApp={false}
          contentLabel="Review Modal"
        >
          <h3>Urdu Number Trainer</h3>
          <p>
            This app will help you review Urdu numbers by giving you all the
            numbers randomly.
          </p>
          <h4>How to use:</h4>
          <ul>
            <li>Choose a range of numbers you want to work on.</li>
            <li>Press '🎲' to get the next number.</li>
            <li>See if you can say the number.</li>
            <li>If you don't know it, press '?' to get the answer.</li>
            <li>
              See if you can say all the numbers quickly and confidently without
              checking!
            </li>
          </ul>
          <div style={{ margin: "1.5rem 0", textAlign: "center" }}>
            <button onClick={() => setShowingHelp(false)}>close</button>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default App;
