import { createSlice } from "@reduxjs/toolkit";

export interface UsserType {
  name: string;
  messages: {
    off: string[];
    on: string[];
    media: string[];
  };
  count: {
    off: number;
    on: number;
    media: number;
    bonus: number;
  };
}

export interface Message {
  fecha: string;
  hora: string;
  mensaje: string;
}

export interface resultsType {
  results: UsserType[];
  ghosts: number;
  selectedUser: UsserType | null;
  isDetailsOpen?: boolean;
}

const initialState: resultsType = {
  results: [],
  ghosts: 0,
  selectedUser: null,
  isDetailsOpen: false,
};

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    updateResults: (state, action) => {
      state.results = action.payload.results;
      state.ghosts = action.payload.ghosts;
    },
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    toggleDetails: (state) => {
      state.isDetailsOpen = !state.isDetailsOpen;
    },
  },
});

export const { updateResults, selectUser, toggleDetails } =
  resultsSlice.actions;

export default resultsSlice.reducer;
