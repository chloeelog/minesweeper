import { createSlice } from "@reduxjs/toolkit";

// TODO: Timer 옵션 추가시 "paused" 상태도 추가할 것!
export type GameState = "ready" | "playing" | "clear" | "over";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    gameState: "ready" as GameState,
    startsAt: null,
  },
  reducers: {
    startGame: (state, { payload }) => {
      state.gameState = "playing";
      state.startsAt = payload;
    },
    clearGame: (state) => {
      state.gameState = "clear";
      state.startsAt = null;
    },
    overGame: (state) => {
      state.gameState = "over";
      state.startsAt = null;
    },
    initializeGame: (state) => {
      state.gameState = "ready";
      state.startsAt = null;
    },
  },
});

export const { startGame, clearGame, overGame, initializeGame } =
  gameSlice.actions;

export default gameSlice.reducer;
