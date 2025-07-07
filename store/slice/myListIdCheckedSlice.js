import { createSlice } from "@reduxjs/toolkit";

const listIdSlice = createSlice({
  name: "listId",
  initialState: { data: [] },
  reducers: {
    addIdToList(state, action) {
      state.data = [...state.data, action.payload];
    },
    removeIdFromList(state, action) {
      state.data = state.data.filter((id) => id !== action.payload)
    },
  },
});

export const { addIdToList, removeIdFromList } = listIdSlice.actions;

export const getAllAddToListId = (state) => state.myListIdChecked.data

export default listIdSlice.reducer;
