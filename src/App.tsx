import { useState } from "react";
import "./App.css";
import { urduNumbers } from "./urdu-numbers";
import ProgressBar from "./components/ProgressBar";
import Select, { SingleValue } from "react-select";
import { useReward } from "react-rewards";
// import Review from "./components/Review";

const options = [
  { value: 0, label: "1-100" },
  { value: 1, label: "1-9" },
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

// TODO: make a pool of stuff that you withdraw from to get all 100 numbers

const width = "18rem";

function App() {
  const [remaining, setRemaining] = useState<number[]>(makeFullArray(0));
  const [currentNum, setCurrentNum] = useState<number>(0);
  const [questioned, setQuestioned] = useState<boolean>(false);
  const { reward } = useReward("rewardId", "confetti", {
    elementCount: 250,
    zIndex: 9999999,
  });
  const [range, setRange] = useState<{ value: number; label: string }>({
    value: 0,
    label: "1-100",
  });
  // const [mode, setMode] = useState<"quiz" | "review">("quiz");
  function handleAdvance() {
    if (remaining.length === 0) {
      reward();
    }
    if (questioned) {
      setQuestioned(false);
    }
    if (remaining.length === 0) {
      setRemaining(makeFullArray(range.value));
      setCurrentNum(0);
      return;
    }
    const index = getRandomInt(remaining.length);
    const nextNum = remaining[index];
    const newRem = removeItem(remaining, index);
    setRemaining(newRem);
    setCurrentNum(nextNum);
  }
  function handleQuestion() {
    if (currentNum === 0) {
      alert(
        "Press '➡️' to get the next number. See if you can say the number. If you don't know it, press '?' to get the answer. See if you can say all the numbers confidently without checking!"
      );
      return;
    }
    setQuestioned(true);
    setRemaining(makeFullArray(range.value));
    // setCurrentNum(0);
  }
  function handleChangeMode(
    e: SingleValue<{
      value: number;
      label: string;
    }>
  ) {
    if (e) {
      const newRem = makeFullArray(e.value);
      setRange(e);
      setRemaining(newRem);
      setCurrentNum(0);
    }
  }
  const progress =
    100 -
    Math.floor((remaining.length / (range.value === 0 ? 100 : 10)) * 100) -
    (range.value === 0 ? 1 : 0);
  return (
    <>
      <span id="rewardId" />
      <ProgressBar progress={progress} />
      <div style={{ position: "absolute", top: "3rem", width }}>
        <h1>Urdu Number Trainer</h1>
        <div style={{ marginTop: "-1rem", marginBottom: "1rem" }}>
          by <a href="https://www.lingdocs.com/">LingDocs</a>
        </div>
        <div style={{ textAlign: "left", marginTop: "0.5rem" }}>
          <Select options={options} onChange={handleChangeMode} value={range} />
        </div>
      </div>
      {/* <button onClick={() => setMode("review")}>review</button>
      <Review range={range.value} /> */}
      {!questioned ? (
        <h2
          style={{
            width,
            fontSize: "4rem",
          }}
        >
          {currentNum === 0 ? "شروع" : toArabic(currentNum)}
        </h2>
      ) : (
        <div style={{ width }}>
          <h2 style={{ fontSize: "3rem" }}>{toArabic(currentNum)}</h2>
          <h2>
            <div
              style={{
                marginBottom: "2rem",
                fontFamily: "Noto Nastaliq Urdu",
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
          <button style={{ width: "6rem" }} onClick={handleQuestion}>
            ?
          </button>
        </h3>
        <h3>
          <button style={{ width: "6rem" }} onClick={handleAdvance}>
            ➡️
          </button>
        </h3>
      </div>
    </>
  );
}

function makeFullArray(mode: number): number[] {
  const a = Array.from(Array(100).keys()).slice(1);
  if (mode === 0) {
    return a;
  }
  const offset = (mode - 1) * 10;
  return a.slice(mode > 1 ? offset - 1 : 0, offset + 9);
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function toArabic(n: number) {
  const id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return n.toString().replace(/[0-9]/g, function (w) {
    return id[+w];
  });
}

function removeItem<T>(arr: T[], index: number) {
  const a = [...arr];
  a.splice(index, 1);
  return a;
}

export default App;
