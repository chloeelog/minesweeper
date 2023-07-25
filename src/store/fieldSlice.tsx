import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Field } from "@types";

type State = {
  field: Field;
};

type FieldAction = PayloadAction<Field>;

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
  },
});

export const { updateField } = fieldSlice.actions;

export default fieldSlice.reducer;
