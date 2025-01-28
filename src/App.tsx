import "./App.css";
import { useStickyReducer } from "use-sticky-reducer";
import ProgressBar from "./components/ProgressBar";
import { useReward } from "react-rewards";
import { getProgress } from "./lib/helpers";
import { reducer, restartRange } from "./lib/reducer";
import { RangeSelect } from "./components/RangeSelect";
import FailDisplay from "./components/FailDisplay";
import { useState } from "react";
import Review from "./components/Review";
import ModalWrapper from "./components/ModalWrapper";
import { State } from "./lib/types";
import ModeSelect from "./components/ModeSelect";
import StartDisplay from "./components/StartDisplay";
import QuestionDisplay from "./components/QuestionDisplay";
import InputSection from "./components/InputSection";

const initialState: State = restartRange({
  range: [{ start: 0, end: 99 }],
  mode: "say",
  failed: false,
  current: 0,
  remaining: [],
});

function App() {
  const { reward } = useReward("rewardId", "confetti", {
    zIndex: 9999999,
  });
  const [showingReview, setShowingReview] = useState<boolean>(false);
  const [state, dispatch] = useStickyReducer(
    reducer(reward),
    initialState,
    "numbers-state-7"
  );
  const progress = getProgress(state);

  return (
    <>
      <ProgressBar progress={progress} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          textAlign: "center",
          height: "95dvh",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "-2rem" }}>
          <h1>Urdu Number Trainer</h1>
          <div style={{ marginTop: "-1rem", marginBottom: "2rem" }}>
            by <a href="https://www.lingdocs.com/">LingDocs</a> - with{" "}
            <a href="https://ankiweb.net/shared/info/558220595">Anki Deck</a>
          </div>
          <ModeSelect mode={state.mode} dispatch={dispatch} />
          <RangeSelect
            value={state.range}
            handleChange={(range) => {
              dispatch({ type: "change range", payload: range });
            }}
          />
        </div>
        <div>
          <span id="rewardId" />
          {state.current === undefined ? (
            <StartDisplay
              mode={state.mode}
              showReview={() => setShowingReview(true)}
            />
          ) : state.failed ? (
            <FailDisplay current={state.current} />
          ) : (
            <QuestionDisplay mode={state.mode} current={state.current} />
          )}
        </div>
        <InputSection state={state} dispatch={dispatch} />
      </div>
      <ModalWrapper
        isOpen={showingReview}
        setShowing={setShowingReview}
        contentLabel="Review Modal"
      >
        <Review range={state.range} />
      </ModalWrapper>
    </>
  );
}

export default App;
