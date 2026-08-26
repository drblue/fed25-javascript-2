import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { dummyTodos } from "./dummyTodos";
import type { Todo } from "./Todo.types";

const initialState = dummyTodos;

export const todosSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		// 👩‍🍳

		// ✅
		toggle: (state, action: PayloadAction<Todo["id"]>) => {
			const todo = state.find(todo => todo.id === action.payload);
			if (todo) {
				todo.completed = !todo.completed;
			}
		},
	},
});

// Action creators are generated for each reducer function
export const { toggle } = todosSlice.actions;

// Export reducer for this slice
export default todosSlice.reducer;
