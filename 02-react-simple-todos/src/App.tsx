import { useState } from "react";
import type { Todo } from "./types/Todo";
import "./assets/scss/App.scss";

function App() {
	const [todos, setTodos] = useState<Todo[]>([
		{ id: 1, title: "Make coffee", completed: true },
		{ id: 2, title: "Drink coffee", completed: false },
		{ id: 3, title: "Drink MOAR coffee", completed: false },
		{ id: 4, title: "Drink ALL ZE coffee", completed: false },
	]);
	const [inputTodoTitle, setInputTodoTitle] = useState("");


	const handleSubmit = (e: React.SubmitEvent) => {
		e.preventDefault();

		// Create new todo and set a new list of todos as the state consisting
		// of the old todos + the new todo
		setTodos([...todos, {
			id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
			title: inputTodoTitle,
			completed: false,
		}]);

		// Clear input field
		setInputTodoTitle("");
	}

	const handleToggle = (todo: Todo) => {
		todo.completed = !todo.completed;
		setTodos([...todos]);
	}

	return (
		<div className="container py-3">
			<h1>React Simple Todos</h1>

			<form onSubmit={handleSubmit} className="mb-3">
				<div className="input-group mb-3">
					<input
						aria-label="New todo title"
						className="form-control"
						onChange={(e) => setInputTodoTitle(e.target.value)}
						placeholder="Learn about GTD"
						type="text"
						value={inputTodoTitle}
						required
					/>

					<button className="btn btn-success" type="submit">👶🏻</button>
				</div>
			</form>

			<ul className="todolist list-group">
				{todos.map(todo => (
					<li
						key={todo.id}
						className={todo.completed ? "completed list-group-item" : "list-group-item"}
					>
						<span className="todo-title">{todo.title}</span>

						<div>
							<button
								className="btn btn-secondary btn-sm"
								onClick={() => handleToggle(todo)}
							>
								{todo.completed ? "🥺" : "🎉"}
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
