import { createSlice } from "@reduxjs/toolkit";
import type { Account } from "./Account.types";

const initialState: Account = {
	balance: 42,
}

export const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		deposit: (state) => {
			state.balance += 1;
		},

		withdraw: (state) => {
			state.balance -= 1;
		},
	},
});

// Action creators are generated for each reducer function
export const { deposit, withdraw } = accountSlice.actions;

// Export reducer for this slice
export default accountSlice.reducer;
