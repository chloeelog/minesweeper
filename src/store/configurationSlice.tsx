import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { LEVEL } from "@constants";
import { FieldMeta, LevelValue } from "@types";

type State = {
  level: LevelValue;
} & FieldMeta;

type Action = PayloadAction<LevelValue>;
type CustomAction = PayloadAction<FieldMeta>;

const initialState: State = {
  level: LEVEL.BEGINNER,
  row: LEVEL.BEGINNER.row,
  col: LEVEL.BEGINNER.col,
  mineCount: LEVEL.BEGINNER.mineCount,
};

export const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    setLevel: (state, action: Action) => {
      state.level = action.payload;
      state.row = action.payload.row;
      state.col = action.payload.col;
      state.mineCount = action.payload.mineCount;
    },
    setCustomLevel: (state, action: CustomAction) => {
      state.level = LEVEL.CUSTOM;
      state.row = action.payload.row;
      state.col = action.payload.col;
      state.mineCount = action.payload.mineCount;
    },
  },
});

export const { setLevel, setCustomLevel } = configurationSlice.actions;

export default configurationSlice.reducer;
