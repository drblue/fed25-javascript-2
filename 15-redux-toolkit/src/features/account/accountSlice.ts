import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Account } from "./Account.types";

const initialState: Account = {
	balance: 42,
}

export const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		deposit: (state, action: PayloadAction<number>) => {
			state.balance += action.payload;
		},

		withdraw: (state, action: PayloadAction<number>) => {
			state.balance -= action.payload;
		},
	},
});

// Action creators are generated for each reducer function
export const { deposit, withdraw } = accountSlice.actions;

// Export reducer for this slice
export default accountSlice.reducer;
