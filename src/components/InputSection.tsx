import { useState } from "react";
import { Action } from "../lib/reducer";
import { State } from "../lib/types";
import { Shake } from "reshake";

export default function InputSection({
  state,
  dispatch,
}: {
  state: State;
  dispatch: (a: Action) => void;
}) {
  const [shakingDice, setShakingDice] = useState<boolean>(false);
  const [number, setNumber] = useState<number | "">("");

  function rollDice() {
    setShakingDice(true);
    dispatch({ type: "roll dice" });
    setTimeout(() => {
      setShakingDice(false);
    }, 150);
  }
  if (state.mode === "say") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "0 2rem 1rem 2rem",
        }}
      >
        <div>
          <button
            style={{ width: "6rem", fontSize: "1.5rem" }}
            onClick={() => dispatch({ type: "fail" })}
          >
            ?
          </button>
        </div>
        <div>
          <button
            style={{ width: "6rem", fontSize: "1.5rem" }}
            onClick={rollDice}
          >
            <Shake h={15} v={15} r={30} active={shakingDice} fixed={true}>
              🎲
            </Shake>
          </button>
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "2rem",
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (state.mode === "read" && state.current === undefined) {
            dispatch({ type: "start read" });
            return;
          }
          if (state.mode === "read" && state.failed) {
            dispatch({ type: "restart read" });
            return;
          }
          if (number !== "") {
            dispatch({ type: "check number", payload: number });
            setNumber("");
          }
        }}
      >
        {state.current === undefined ? (
          <button type="submit">Begin</button>
        ) : state.failed ? (
          <button type="submit">Restart</button>
        ) : (
          <div>
            <div>
              <label
                style={{
                  fontSize: "0.75rem",
                  color: "#808080",
                }}
              >
                Enter Number and Enter
              </label>
            </div>
            <input
              type="number"
              style={{ width: "8rem" }}
              value={number}
              onChange={(e) => setNumber(parseInt(e.target.value))}
            />
          </div>
        )}
      </form>
    </div>
  );
}
