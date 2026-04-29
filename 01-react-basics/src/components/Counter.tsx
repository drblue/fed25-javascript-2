import { useState } from "react";

const Counter = () => {
	const [counter, setCounter] = useState(0);

	const handleBtnClick = () => {
		console.log("Counter before update:", counter);
		setCounter((prevCounter) => prevCounter + 1);  // prevCounter 0, return 1

		console.log("Counter between updates:", counter);

		setCounter((prevCounter) => prevCounter + 1);  // prevCounter 1, return 2
		console.log("Counter after update:", counter);
	}

	return (
		<div className="counter">
			<p>Counter: {counter}</p>

			<button onClick={handleBtnClick} className="btn btn-primary">Click me!</button>
		</div>
	)
}

export default Counter;
