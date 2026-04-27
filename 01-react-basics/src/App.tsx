import { useState } from "react";
import "./assets/scss/App.scss";

interface Post {
	id: number;
	title: string;
	likes: number;
}

function App() {
	const [counter, setCounter] = useState(0);
	const [msg, setMsg] = useState("Hi mom!");
	const [posts, setPosts] = useState<Post[]>([
		{ id: 1, title: "React Rocks 🎸", likes: 1337 },
		{ id: 2, title: "JSX Rocks Even Moar 🤘🏻", likes: 42 },
		{ id: 3, title: "Got State?", likes: 3 },
	]);
	const [salary, setSalary] = useState(10);
	const [showSalary, setShowSalary] = useState(false);

	const handleBtnClick = () => {
		console.log("Counter before update:", counter);
		setCounter((prevCounter) => prevCounter + 1);  // prevCounter 0, return 1

		console.log("Counter between updates:", counter);

		setCounter((prevCounter) => prevCounter + 1);  // prevCounter 1, return 2
		console.log("Counter after update:", counter);
	}

	const handleChangeSalary = (amount: number) => {
		if (salary + amount < 5) {
			setSalary(5);
			return;
		}
		setSalary(salary + amount);
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

			<hr />

			<button
				className={showSalary ? "btn btn-success mb-3" : "btn btn-danger mb-3"}
				onClick={() => setShowSalary(!showSalary)}
			>
				{showSalary ? "Hide salary" : "Show salary"}
			</button>

			{showSalary && (
				<>
					<h2>Salary</h2>

					<p>Salary per hour: {salary} &euro;</p>

					{salary < 10 && (
						<div className="alert alert-warning">
							You might want to change job?
						</div>
					)}

					<div className="buttons">
						<div className="mb-1">
							<button
								className="btn btn-primary btn-lg"
								onClick={() => handleChangeSalary(1)}
							>
								Raise 1 &euro; 🤑
							</button>
							<button
								className="btn btn-warning btn-lg"
								onClick={() => handleChangeSalary(-1)}
							>
								Decrease 1 &euro; 😢
							</button>
						</div>

						<div className="mb-1">
							<button
								className="btn btn-primary btn-lg"
								onClick={() => handleChangeSalary(5)}
							>
								Raise 5 &euro; 🤑🤑🤑
							</button>
							<button
								className="btn btn-warning btn-lg"
								onClick={() => handleChangeSalary(-5)}
							>
								Decrease 5 &euro; 😢😢😢
							</button>
						</div>
					</div>
				</>
			)}

			<hr />

			<h2>Posts</h2>

			<ul>
				{posts.map(post =>
					<li key={post.id}>
						{post.title} ({post.likes} likes)
					</li>
				)}
			</ul>
		</div>
	);
}

export default App;
