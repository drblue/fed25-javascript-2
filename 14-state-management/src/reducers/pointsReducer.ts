export enum PointsActionType {
	DECREMENT = "decrement",
	INCREMENT = "increment",
	RESET = "reset",
}

export type PointsAction = { type: PointsActionType.INCREMENT, payload: { amount: number } }
	| { type: PointsActionType.DECREMENT, payload: { amount: number } }
	| { type: PointsActionType.RESET }

export type PointsState = {
	game: string;
	points: number;
}

export const initialState: PointsState = {
	game: "Hackers vs n00bs",
	points: 5,
}

/**
 * Reduce a new state based on the action and current state
 *
 * @param state Current state
 * @param action Action to take on the state
 * @returns New state
 */
export const pointsReducer = (state: PointsState, action: PointsAction) => {
	// state = current state
	// action = { type: "increment" } | { type: "decrement" }
	console.log("Received action:", action, state);

	switch (action.type) {
		case PointsActionType.DECREMENT:
			// Return a new version of the state where points have been decreased
			return {
				...state,
				points: state.points - action.payload.amount,
			}

		case PointsActionType.INCREMENT:
			// Return a new version of the state where points have been increased
			return {
				...state,
				points: state.points + action.payload.amount,
			}

		case PointsActionType.RESET:
			// Return a new version of the state with the inital value of points
			return {
				...state,
				points: initialState.points,
			}

		default:
			console.error("Unknown action:", action);
			throw new Error("Unknown action", {
				cause: action,
			});
	}
}
