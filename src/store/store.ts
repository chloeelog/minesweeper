import { configureStore } from "@reduxjs/toolkit";

import gameSlice from "./gameSlice";
import configurationSlice from "./configurationSlice";
import fieldSlice from "./fieldSlice";

export const store = configureStore({
  reducer: { gameSlice, configurationSlice, fieldSlice },
});
