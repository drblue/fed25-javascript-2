import { createContext } from "react";
import type { PointsAction, PointsState } from "../reducers/pointsReducer";

interface StoreContextValue {
	state: PointsState;
	dispatch: React.ActionDispatch<[action: PointsAction]>;
}

export const StoreContext = createContext<StoreContextValue | null>(null);
