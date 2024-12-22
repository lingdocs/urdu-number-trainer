import { State, NumRange } from "../lib/types";
import { assertUnreachable } from "./helpers";

type Action =
  | {
      type: "change range";
      payload: NumRange;
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

export function restartRange(range: NumRange): State {
  const remaining =
    range === "all"
      ? arrayFromTo(0, 99)
      : arrayFromTo(range * 10, range * 10 + 9);
  return {
    range,
    remaining,
    current: undefined,
    failed: false,
  };
}

function rollDice(state: State, reward: () => void): State {
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

/**
 * creates an array from integers 'start' to 'end' inclusive
 *
 * @param start - starting integer of the array
 * @param end - ending integer of the array
 * @returns an array of integers [start, ..., end]
 */
function arrayFromTo(start: number, end: number): number[] {
  return Array.from(Array(end + 1).keys()).slice(start);
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function removeItem<T>(arr: T[], index: number) {
  const a = [...arr];
  a.splice(index, 1);
  return a;
}
