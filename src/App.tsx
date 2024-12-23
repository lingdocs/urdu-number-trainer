import "./App.css";
import { useStickyReducer } from "use-sticky-reducer";
import ProgressBar from "./components/ProgressBar";
import { useReward } from "react-rewards";
import { getProgress, toArabic } from "./lib/helpers";
import { reducer, restartRange } from "./lib/reducer";
import { RangeSelect } from "./components/RangeSelect";
import FailDisplay from "./components/FailDisplay";
import { width } from "./lib/width";
import { useState } from "react";
import Review from "./components/Review";
import { Shake } from "reshake";
import Help from "./components/Help";
import ModalWrapper from "./components/ModalWrapper";

const initialState = restartRange([{ start: 0, end: 99 }]);

function App() {
  const { reward } = useReward("rewardId", "confetti", {
    zIndex: 9999999,
  });
  const [showingReview, setShowingReview] = useState<boolean>(false);
  const [showingHelp, setShowingHelp] = useState<boolean>(false);
  const [shakingDice, setShakingDice] = useState<boolean>(false);
  const [state, dispatch] = useStickyReducer(
    reducer(reward),
    initialState,
    "numbers-state-4"
  );
  const progress = getProgress(state);
  function rollDice() {
    setShakingDice(true);
    dispatch({ type: "roll dice" });
    setTimeout(() => {
      setShakingDice(false);
    }, 150);
  }
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
          handleChange={(range) => {
            dispatch({ type: "change range", payload: range });
          }}
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
          <button style={{ width: "6rem" }} onClick={rollDice}>
            <Shake h={15} v={15} r={30} active={shakingDice} fixed={true}>
              🎲
            </Shake>
          </button>
        </h3>
        <ModalWrapper
          isOpen={showingReview}
          close={() => setShowingReview(false)}
          contentLabel="Review Modal"
        >
          <Review range={state.range} />
        </ModalWrapper>
        <ModalWrapper
          isOpen={showingHelp}
          close={() => setShowingHelp(false)}
          contentLabel="Help Modal"
        >
          <Help />
        </ModalWrapper>
      </div>
    </>
  );
}

export default App;
