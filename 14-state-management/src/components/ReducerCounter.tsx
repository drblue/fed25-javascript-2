import { useReducer } from "react";
import Button from "react-bootstrap/Button";

type PointsAction =
	{ type: "decrement" }
	| { type: "increment" }

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
		case "decrement":
			// Return a new version of the state where points have been decreased
			return {
				...state,
				points: state.points - 1,
			}

		case "increment":
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
			<Button variant="warning" onClick={() => dispatch({ type: "decrement" })}>-</Button>

			<span className="points">{state.points}</span>

			<Button variant="success" onClick={() => dispatch({ type: "increment" })}>+</Button>
		</div>
	);
};

export default ReducerCounter;
