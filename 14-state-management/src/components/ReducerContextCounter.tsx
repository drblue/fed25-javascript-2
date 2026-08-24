import Button from "react-bootstrap/Button";
import { decreasePoints, increasePoints } from "../actions/pointsActions";
import useStore from "../hooks/useStore";

const ReducerContextCounter = () => {
	const { dispatch, state } = useStore();

	return (
		<div className="counter">
			<Button variant="warning" onClick={() => dispatch( decreasePoints() )}>-</Button>

			<span className="points">{state.points}</span>

			<Button variant="success" onClick={() => dispatch( increasePoints() )}>+</Button>
		</div>
	);
};

export default ReducerContextCounter;
