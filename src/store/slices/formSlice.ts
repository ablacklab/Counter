import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface formType {
  date: string;
  participants: number;
  file: string | null;
  fileName: string | null;
}

const initialState: formType = {
  date: "",
  participants: 0,
  file: null,
  fileName: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateParticipants: (state, action: PayloadAction<number>) => {
      state.participants = action.payload;
    },
    updateDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    updateFile: (
      state,
      action: PayloadAction<{ content: string; name: string }>
    ) => {
      state.file = action.payload.content;
      state.fileName = action.payload.name;
    },
  },
});

export const { updateParticipants, updateDate, updateFile } = formSlice.actions;

export default formSlice.reducer;
