import { State, NumRange } from "../lib/types";
import { assertUnreachable } from "./helpers";

type Action =
  | {
      type: "change range";
      payload: NumRange[];
    }
  | {
      type: "roll dice";
    }
  | {
      type: "fail";
    };

export function reducer(reward: () => void) {
  return (state: State, action: Action) => {
    if (action.type === "change range") {
      return restartRange(action.payload);
    }
    if (action.type === "roll dice") {
      return rollDice(state, reward);
    }
    if (action.type === "fail") {
      return {
        ...state,
        failed: true,
      };
    }
    return assertUnreachable(action);
  };
}

export function restartRange(range: NumRange[]): State {
  return {
    range,
    remaining: makeRangesArray(range),
    current: undefined,
    failed: false,
  };
}

function rollDice(state: State, reward: () => void): State {
  if (state.range.length === 0) {
    alert("Select a range of numbers first");
    return state;
  }
  if (state.failed) {
    return rollDice(restartRange(state.range), reward);
  }
  if (!state.remaining.length) {
    reward();
    return restartRange(state.range);
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
