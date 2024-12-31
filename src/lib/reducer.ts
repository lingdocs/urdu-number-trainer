import { State, NumRange } from "../lib/types";
import { assertUnreachable } from "./helpers";

// BIG LOGIC PROBLEM! What to do when you remove the last bit of the range and you are in
// reading mode !!
// WHAT TO DO WHEN CHANGING THE RANGE ON READ MODE
// Solution -- I think we need to have a شروع screen for the reading mode as well, with a begin button and instructions
// Take away the auto advance

// on the shuru screen there should be instructions for each mode!
// (instead of the help button - get rid of that)
// Ie. for the say mode
//   "roll the dice for a random number, try to say it. If you can't say it, press the ? button"
//   "Read the Urdu number and type the number below"

// fail screen on read mode is nudged up the wrong direction

export type Action =
  | {
      type: "change range";
      payload: NumRange[];
    }
  | {
      type: "roll dice";
    }
  | {
      type: "fail";
    }
  | {
      type: "change mode";
      payload: State["mode"];
    }
  | {
      type: "check number";
      payload: number | "";
    }
  | {
      type: "restart read";
    }
  | {
      type: "start read";
    };

export function reducer(reward: () => void) {
  return (state: State, action: Action) => {
    if (action.type === "change range") {
      return restartRange({
        ...state,
        range: action.payload,
      });
    }
    if (action.type === "roll dice") {
      return rollDice(state, reward);
    }
    if (action.type === "fail") {
      return fail(state);
    }
    if (action.type === "change mode") {
      const s = restartRange({
        ...state,
        mode: action.payload,
      });
      return s;
    }
    if (action.type === "check number") {
      return checkNumber(state, action.payload, reward);
    }
    if (action.type === "restart read") {
      return advance(restartRange(state), reward);
    }
    if (action.type === "start read") {
      return advance(state, reward);
    }
    return assertUnreachable(action);
  };
}

function checkNumber(
  state: State,
  number: number | "",
  reward: () => void
): State {
  if (number === "") {
    return state;
  }
  if (state.range.length === 0) {
    alert("Select a range of numbers first");
    return state;
  }
  if (state.mode !== "read") {
    return state;
  }
  if (number !== state.current) {
    return fail(state);
  }
  return advance(state, reward);
}

function fail(state: State): State {
  return {
    ...state,
    failed: true,
  };
}

export function restartRange(state: State): State {
  return {
    ...state,
    remaining: makeRangesArray(state.range),
    current: undefined,
    failed: false,
  };
}

function advance(state: State, reward: () => void): State {
  if (!state.remaining.length) {
    reward();
    return restartRange(state);
  }
  if (state.failed) {
    return advance(restartRange(state), reward);
  }
  const toRemove = getRandomInt(state.remaining.length);
  const current = state.remaining[toRemove];
  const remaining = removeItem(state.remaining, toRemove);
  return {
    ...state,
    remaining,
    current,
  };
}

function rollDice(state: State, reward: () => void): State {
  if (state.range.length === 0) {
    alert("Select a range of numbers first");
    return state;
  }
  return advance(state, reward);
}

function makeRangesArray(range: NumRange[]): number[] {
  return range.flatMap(arrayFromTo);
}

/**
 * creates an array from integers 'start' to 'end' inclusive
 */
function arrayFromTo(range: NumRange): number[] {
  return Array.from(Array(range.end + 1).keys()).slice(range.start);
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function removeItem<T>(arr: T[], index: number) {
  const a = [...arr];
  a.splice(index, 1);
  return a;
}
