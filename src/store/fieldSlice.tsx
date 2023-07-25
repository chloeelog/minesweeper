import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Field } from "@types";

type State = {
  field: Field;
};

type FieldAction = PayloadAction<Field>;
type FlagCountAction = PayloadAction<number>;

const initialState: State = {
  field: {} as Field,
};

export const fieldSlice = createSlice({
  name: "field",
  initialState,
  reducers: {
    updateField: (state, action: FieldAction) => {
      state.field = action.payload;
    },
    updateFlagCount: (state, action: FlagCountAction) => {
      state.field.meta.flagCount += action.payload;
    },
  },
});

export const { updateField } = fieldSlice.actions;

export default fieldSlice.reducer;
