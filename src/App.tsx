import { useState } from "react";
import "./App.css";
import { urduNumbers } from "./urdu-numbers";
import ProgressBar from "./components/ProgressBar";

// TODO: make a pool of stuff that you withdraw from to get all 100 numbers

const width = "18rem";

function App() {
  const [remaining, setRemaining] = useState<number[]>(makeFullArray());
  const [currentNum, setCurrentNum] = useState<number>(0);
  const [questioned, setQuestioned] = useState<boolean>(false);
  function handleAdvance() {
    if (questioned) {
      setQuestioned(false);
    }
    if (remaining.length === 0) {
      setRemaining(makeFullArray());
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
    setRemaining(makeFullArray());
    // setCurrentNum(0);
  }
  const progress = 100 - Math.floor((remaining.length / 100) * 100) - 1;
  return (
    <>
      <ProgressBar progress={progress} />
      <div style={{ position: "absolute", top: "3rem", width }}>
        <h1>Urdu Number Trainer</h1>
        <div>
          by <a href="https://www.lingdocs.com/">LingDocs</a>
        </div>
      </div>
      {!questioned ? (
        <h2>
          <button
            style={{
              width,
              fontSize: "3rem",
            }}
            onClick={handleAdvance}
          >
            {currentNum === 0 ? "شروع" : toArabic(currentNum)}
          </button>
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

function makeFullArray() {
  return Array.from(Array(100).keys()).slice(1);
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
