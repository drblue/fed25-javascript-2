import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../features/account/accountSlice";

export const store = configureStore({
	reducer: {
		account: accountReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// type AppStore = typeof store.getState;
// export type RootState = ReturnType<AppStore>;
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: { account: AccountState, todo: TodoState }
export type AppDispatch = typeof store.dispatch;
