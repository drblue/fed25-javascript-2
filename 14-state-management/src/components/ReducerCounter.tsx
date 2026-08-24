import { useReducer } from "react";
import Button from "react-bootstrap/Button";

enum PointsActionType {
	DECREMENT = "decrement",
	INCREMENT = "increment",
}

type PointsAction = {
	type: PointsActionType
}

type PointsState = {
	game: string;
	points: number;
}

const initialState: PointsState = {
	game: "Hackers vs n00bs",
	points: 0,
}

const pointsReducer = (state: PointsState, action: PointsAction) => {
	// state = current state
	// action = { type: "increment" } | { type: "decrement" }
	console.log("Received action:", action, state);

	switch (action.type) {
		case PointsActionType.DECREMENT:
			// Return a new version of the state where points have been decreased
			return {
				...state,
				points: state.points - 1,
			}

		case PointsActionType.INCREMENT:
			// Return a new version of the state where points have been increased
			return {
				...state,
				points: state.points + 1,
			}

		default:
			console.error("Unknown action:", action);
			throw new Error("Unknown action", {
				cause: action,
			});
	}
}

const ReducerCounter = () => {
	const [state, dispatch] = useReducer(pointsReducer, initialState);

	return (
		<div className="counter">
			<Button variant="warning" onClick={() => dispatch({ type: PointsActionType.DECREMENT })}>-</Button>

			<span className="points">{state.points}</span>

			<Button variant="success" onClick={() => dispatch({ type: PointsActionType.INCREMENT })}>+</Button>
		</div>
	);
};

export default ReducerCounter;
