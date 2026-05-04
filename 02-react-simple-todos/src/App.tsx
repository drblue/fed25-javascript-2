import { useState } from "react";
import TodoCounter from "./components/TodoCounter";
import TodoListItem from "./components/TodoListItem";
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

	const handleDelete = (todo: Todo) => {
		setTodos(todos.filter(t => t.id !== todo.id));
	}

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

	const completedTodos = todos.filter(todo => todo.completed);
	const uncompletedTodos = todos.filter(todo => !todo.completed);

	return (
		<div className="container py-3">
			<title>{`${uncompletedTodos.length} of ${todos.length} todos left`}</title>
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

			{todos.length > 0 ? (
				<>
					<h2 className="h5">💪🏻 Stuff I got to do</h2>
					<ul className="todolist list-group mb-3">
						{uncompletedTodos.map(todo => (
							<TodoListItem
								key={todo.id}
								onDelete={handleDelete}
								onToggle={handleToggle}
								todo={todo}
							/>
						))}
					</ul>

					<h2 className="h5">🥺 Stuff I've done</h2>
					<ul className="todolist list-group mb-3">
						{completedTodos.map(todo => (
							<TodoListItem
								key={todo.id}
								onDelete={handleDelete}
								onToggle={handleToggle}
								todo={todo}
							/>
						))}
					</ul>

					<TodoCounter
						total={todos.length}
						uncompleted={uncompletedTodos.length}
					/>
				</>
			) : (
				<div className="alert alert-warning">
					You ain't got no todos to do? 🤔
				</div>
			)}

		</div>
	);
}

export default App;
