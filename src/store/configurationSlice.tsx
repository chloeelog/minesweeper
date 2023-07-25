import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { LEVEL } from "@constants";
import { Level } from "@types";

type State = {
  level: Level;
};

type Action = PayloadAction<Level>;

const initialState: State = {
  level: LEVEL.BEGINNER,
};

export const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    setLevel: (state, action: Action) => {
      state.level = action.payload;
    },
  },
});

export const { setLevel } = configurationSlice.actions;

export default configurationSlice.reducer;
