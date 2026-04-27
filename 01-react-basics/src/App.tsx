import { useState } from "react";
import "./assets/scss/App.scss";

function App() {
	const [counter, setCounter] = useState(0);
	const [msg, setMsg] = useState("Hi mom!");

	const handleBtnClick = () => {
		console.log("Counter before update:", counter);
		setCounter(counter + 1);
		console.log("Counter after update:", counter);
	}

	console.log("App is being rendered, counter is:", counter);

	return (
		<div className="container">
			<h1>01-react-basics</h1>

			<p>{msg}</p>

			<button onClick={ () => setMsg("Hi dad!") } className="btn btn-warning">Hi dad?</button>

			<hr />

			<p>Counter: {counter}</p>

			<button onClick={handleBtnClick} className="btn btn-primary">Click me!</button>
		</div>
	);
}

export default App;
