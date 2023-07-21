import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Cell, Field } from "@types";

type State = {
  field: Field;
};

type FieldAction = PayloadAction<Field>;
type CellAction = PayloadAction<Cell>;

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
    updateCell: (state, action: CellAction) => {
      state.field.info[action.payload.x][action.payload.y] = action.payload;
    },
  },
});

export const { updateField, updateCell } = fieldSlice.actions;

export default fieldSlice.reducer;
