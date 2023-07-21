import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { LEVEL } from "@constants";

type LevelType = (typeof LEVEL)[keyof typeof LEVEL];

type State = {
  level: LevelType;
  row: number;
  col: number;
  mines: number;
};

type Action = PayloadAction<LevelType>;
type CustomAction = PayloadAction<{ row: number; col: number; mines: number }>;

const initialState: State = {
  level: LEVEL.BEGINNER,
  row: LEVEL.BEGINNER.row,
  col: LEVEL.BEGINNER.col,
  mines: LEVEL.BEGINNER.mines,
};

export const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    setLevel: (state, action: Action) => {
      state.level = action.payload;
      state.row = action.payload.row;
      state.col = action.payload.col;
      state.mines = action.payload.mines;
    },
    setCustomLevel: (state, action: CustomAction) => {
      state.level = LEVEL.CUSTOM;
      state.row = action.payload.row;
      state.col = action.payload.col;
      state.mines = action.payload.mines;
    },
  },
});

export const { setLevel, setCustomLevel } = configurationSlice.actions;

export default configurationSlice.reducer;
