import { createSlice } from "@reduxjs/toolkit";

// TODO: Timer 옵션 추가시 "paused" 상태도 추가할 것!
type GameState = "ready" | "playing" | "clear" | "over";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    _t: "ready" as GameState,
    startsAt: null,
  },
  reducers: {
    startGame: (state, { payload }) => {
      state._t = "playing";
      state.startsAt = payload;
    },
    clearGame: (state) => {
      state._t = "clear";
      state.startsAt = null;
    },
    overGame: (state) => {
      state._t = "over";
      state.startsAt = null;
    },
    initializeGame: (state) => {
      state._t = "ready";
      state.startsAt = null;
    },
  },
});

export const { startGame, clearGame, overGame, initializeGame } =
  gameSlice.actions;

export default gameSlice.reducer;
