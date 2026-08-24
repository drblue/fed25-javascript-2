import { useReducer } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

enum PointsActionType {
	DECREMENT = "decrement",
	INCREMENT = "increment",
	RESET = "reset",
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
	points: 3,
}

/**
 * Reduce a new state based on the action and current state
 *
 * @param state Current state
 * @param action Action to take on the state
 * @returns New state
 */
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

// Action Creator for decreasing points
const decreasePoints = () => {
	return { type: PointsActionType.DECREMENT }
}

// Action Creator for increasing points
const increasePoints = () => {
	return { type: PointsActionType.INCREMENT }
}

// Action Creator for resetting points to initial value
const resetPoints = () => {
	return { type: PointsActionType.RESET }
}

const ReducerCounter = () => {
	const [state, dispatch] = useReducer(pointsReducer, initialState);

	return (
		<div className="counter">
			{/* Decrease points */}
			<ButtonGroup>
				<Button
					onClick={() => null}
					variant="warning"
				>-10</Button>
				<Button
					onClick={() => null}
					variant="warning"
				>-5</Button>
				<Button
					onClick={() => dispatch( decreasePoints() )}
					variant="warning"
				>-</Button>
			</ButtonGroup>

			{/* Current points */}
			<span className="points">{state.points}</span>

			{/* Increase points */}
			<ButtonGroup>
				<Button
					onClick={() => dispatch( increasePoints() )}
					variant="success"
				>+</Button>
				<Button
					onClick={() => null}
					variant="success"
				>+5</Button>
				<Button
					onClick={() => null}
					variant="success"
				>+10</Button>
			</ButtonGroup>

			<Button
				className="ms-3"
				onClick={() => dispatch( resetPoints() )}
				variant="danger"
			>
				<span role="img" aria-description="broom">🧹</span>
			</Button>
		</div>
	);
};

export default ReducerCounter;
