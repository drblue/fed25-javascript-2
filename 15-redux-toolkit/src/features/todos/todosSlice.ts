import { createSlice } from "@reduxjs/toolkit";
import { dummyTodos } from "./dummyTodos";

const initialState = dummyTodos;

export const todosSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		// 👩‍🍳
	},
});

// Action creators are generated for each reducer function

// Export reducer for this slice
export default todosSlice.reducer;
