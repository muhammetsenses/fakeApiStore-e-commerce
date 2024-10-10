import { createSlice } from "@reduxjs/toolkit";


interface DarkMode {
    darkMode:boolean
}
const initialState:DarkMode = {
    darkMode: false
}

const themeSlice = createSlice({
    name:"theme",
    initialState,
    reducers:{
        toggleTheme: (state) => {
            state.darkMode = !state.darkMode
        }
    }
})

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;