import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkMode: localStorage.getItem("theme") === "dark", // Load initial theme from localStorage
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("theme", state.darkMode ? "dark" : "light"); // Save theme preference
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
