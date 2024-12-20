import { useState } from "react";
import "./App.css";
import { urduNumbers } from "./urdu-numbers";
import ProgressBar from "./components/ProgressBar";
import Select, { SingleValue } from "react-select";
import { useReward } from "react-rewards";
import Review from "./components/Review";
import Modal from "react-modal";
import { toArabic } from "./lib/helpers";
import { useStickyState } from "use-sticky-reducer";
// import Review from "./components/Review";

const ranges = [
  { value: 0, label: "0-99" },
  { value: 1, label: "0-9" },
  { value: 2, label: "10-19" },
  { value: 3, label: "20-29" },
  { value: 4, label: "30-39" },
  { value: 5, label: "40-49" },
  { value: 6, label: "50-59" },
  { value: 7, label: "60-69" },
  { value: 8, label: "70-79" },
  { value: 9, label: "80-89" },
  { value: 10, label: "90-99" },
];

const width = "20rem";
const startingR = localStorage.getItem("number-range")
  ? JSON.parse(localStorage.getItem("number-range") || "")
  : ranges[0];
console.log({ startingR });

function App() {
  const [remaining, setRemaining] = useState<number[]>(
    makeFullArray(startingR.value)
  );
  const [currentNum, setCurrentNum] = useState<number | undefined>(undefined);
  const [questioned, setQuestioned] = useState<boolean>(false);
  const { reward } = useReward("rewardId", "confetti", {
    elementCount: 250,
    zIndex: 9999999,
  });
  const [range, setRange] = useStickyState<{ value: number; label: string }>(
    {
      value: 0,
      label: "0-99",
    },
    "number-range"
  );
  const [showReview, setShowReview] = useState<boolean>(false);
  const [showHelp, setShowingHelp] = useState<boolean>(false);
  function handleAdvance() {
    if (remaining.length === 0) {
      reward();
    }
    if (questioned) {
      setQuestioned(false);
    }
    if (remaining.length === 0) {
      setRemaining(makeFullArray(range.value));
      setCurrentNum(undefined);
      return;
    }
    const index = getRandomInt(remaining.length);
    const nextNum = remaining[index];
    const newRem = removeItem(remaining, index);
    setRemaining(newRem);
    setCurrentNum(nextNum);
  }
  function adjustRange(dir: 1 | -1) {
    return () => {
      const newRange =
        dir === -1 && range.value === 0
          ? 10
          : (range.value + dir) % ranges.length;
      changeRange(newRange);
      setRange(ranges.find((r) => r.value === newRange) || ranges[0]);
    };
  }
  function handleQuestion() {
    if (currentNum === undefined) {
      setShowingHelp(true);
      return;
    }
    setQuestioned(true);
    setRemaining(makeFullArray(range.value));
    // setCurrentNum(0);
  }
  function changeRange(r: number) {
    if (questioned) {
      setQuestioned(false);
    }
    const newRem = makeFullArray(r);
    setRange(ranges.find((rng) => rng.value === r) || ranges[0]);
    setRemaining(newRem);
    setCurrentNum(undefined);
  }
  function handleChangeMode(
    e: SingleValue<{
      value: number;
      label: string;
    }>
  ) {
    if (e) {
      changeRange(e.value);
    }
  }
  const progress =
    100 - Math.floor((remaining.length / (range.value === 0 ? 100 : 10)) * 100);
  function RangeButton({ dir }: { dir: 1 | -1 }) {
    return (
      <div>
        <button onClick={adjustRange(dir)}>{dir === 1 ? "➡️" : "⬅️"}</button>
      </div>
    );
  }
  return (
    <>
      <span id="rewardId" />
      <ProgressBar progress={progress} />
      <div style={{ position: "absolute", top: "0.5rem", width }}>
        <h1>Urdu Number Trainer</h1>
        <div style={{ marginTop: "-1rem", marginBottom: "1rem" }}>
          by <a href="https://www.lingdocs.com/">LingDocs</a>
        </div>
        <div
          style={{
            textAlign: "left",
            marginTop: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <RangeButton dir={-1} />
          <div style={{ width: "50%" }}>
            <Select
              options={ranges}
              onChange={handleChangeMode}
              value={range}
            />
          </div>
          <RangeButton dir={1} />
        </div>
      </div>
      {showHelp && (
        <Modal
          isOpen={showHelp}
          onRequestClose={() => setShowingHelp(false)}
          style={{
            content: {
              maxWidth: "20rem",
              margin: "0 auto",
              height: "25rem",
            },
          }}
          // contentLabel="Example Modal"
        >
          <h3>How to Use</h3>
          <p>
            This will give you all the numbers randomly, so you can practice
            reviewing them.
          </p>
          <ol>
            <li>Press '➡️' to get the next number.</li>
            <li>
              See if you can say the number. If you don't know it, press '?' to
              get the answer.
            </li>
            <li>
              See if you can say all the numbers confidently without checking!
            </li>
          </ol>
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <button onClick={() => setShowingHelp(false)}>close</button>
          </div>
        </Modal>
      )}
      <Modal
        isOpen={showReview}
        onRequestClose={() => setShowReview(false)}
        style={{
          content: {
            maxWidth: "20rem",
            margin: "0 auto",
          },
        }}
        // contentLabel="Example Modal"
      >
        <Review range={range.value} />
        <div
          style={{
            marginTop: "2.5rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <RangeButton dir={-1} />
          </div>
          <button onClick={() => setShowReview(false)}>close</button>
          <div>
            <RangeButton dir={1} />
          </div>
        </div>
      </Modal>
      {!questioned ? (
        <h2
          className="urdu"
          style={{
            width,
            fontSize: "4rem",
          }}
          onClick={handleAdvance}
        >
          {currentNum === undefined ? "شروع" : toArabic(currentNum)}
        </h2>
      ) : currentNum !== undefined ? (
        <div style={{ width }}>
          <h2 className="urdu" style={{ fontSize: "3rem" }}>
            {toArabic(currentNum)} - {currentNum}
          </h2>
          <h2>
            <div
              className="urdu"
              style={{
                marginBottom: "2rem",
                fontSize: "2.1rem",
              }}
            >
              {urduNumbers[currentNum][0]}
            </div>
            <div style={{ fontSize: "1.8rem" }}>
              {urduNumbers[currentNum][1]}
            </div>
          </h2>
        </div>
      ) : (
        <div>ERROR</div>
      )}
      {progress === 0 && (
        <div style={{ marginTop: questioned ? "1.5rem" : "6rem" }}>
          <button onClick={() => setShowReview(true)}>review</button>
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
            style={{ width: progress === 0 && !questioned ? "8rem" : "6rem" }}
            onClick={handleQuestion}
          >
            {progress === 0 && !questioned ? "Help" : "?"}
          </button>
        </h3>
        <h3>
          <button style={{ width: "6rem" }} onClick={handleAdvance}>
            🎲
          </button>
        </h3>
      </div>
    </>
  );
}

function makeFullArray(range: number): number[] {
  const a = Array.from(Array(100).keys());
  if (range === 0) {
    return a;
  }
  const offset = (range - 1) * 10;
  return a.slice(offset, offset + 10);
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function removeItem<T>(arr: T[], index: number) {
  const a = [...arr];
  a.splice(index, 1);
  return a;
}

export default App;
