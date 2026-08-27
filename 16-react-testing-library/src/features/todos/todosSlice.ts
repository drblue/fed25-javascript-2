import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { dummyTodos } from "./dummyTodos";
import type { Todo, TodoFormData } from "./Todo.types";

const initialState = dummyTodos;

export const todosSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		// 👩‍🍳
		add: (state, action: PayloadAction<TodoFormData>) => {
			state.push({
				...action.payload,
				id: uuid(),
			});
		},

		// ✅
		toggle: (state, action: PayloadAction<Todo["id"]>) => {
			const todo = state.find(todo => todo.id === action.payload);
			if (todo) {
				todo.completed = !todo.completed;
			}
		},

		// 🧹
		remove: (state, action: PayloadAction<Todo["id"]>) => {
			return state.filter(todo => todo.id !== action.payload);
		},
	},
});

// Action creators are generated for each reducer function
export const { add, remove, toggle } = todosSlice.actions;

// Export reducer for this slice
export default todosSlice.reducer;
