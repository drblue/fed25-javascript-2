import { useReducer, type PropsWithChildren } from "react";
import { StoreContext } from "./StoreContext";
import { initialState, pointsReducer } from "../reducers/pointsReducer";

const StoreContextProvider = ({ children }: PropsWithChildren) => {
	const [state, dispatch] = useReducer(pointsReducer, initialState);

	return (
		<StoreContext.Provider value={{ dispatch, state }}>
			{children}
		</StoreContext.Provider>
	)
}

export default StoreContextProvider;
