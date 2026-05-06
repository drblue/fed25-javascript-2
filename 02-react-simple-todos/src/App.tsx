import { useEffect, useState } from "react";
import AddNewTodoForm from "./components/AddNewTodoForm";
import TodoCounter from "./components/TodoCounter";
import TodoList from "./components/TodoList";
import * as TodoAPI from "./services/TodoAPI";
import type { CreateTodoPayload, Todo } from "./types/Todo";
import "./assets/scss/App.scss";

function App() {
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(false);
	const [todos, setTodos] = useState<Todo[]>([]);

	const getTodos = async () => {
		// reset state
		setError(false);
		setIsLoading(true);
		setTodos([]);

		// make request to api
		try {
			const data = await TodoAPI.getTodos();
			setTodos(data);
		} catch (err) {
			console.error("Error thrown when fetching todos:", err);
			setError(err instanceof Error ? err.message : "It's not me, it's you");
		} finally {
			setIsLoading(false);
		}
	}

	const handleAddTodo = async (title: string) => {
		const payload: CreateTodoPayload = {
			title,
			completed: false,
		}
		await TodoAPI.createTodo(payload);
		await getTodos();
	}

	const handleDelete = async (todo: Todo) => {
		await TodoAPI.deleteTodo(todo.id);
		await getTodos();
	}

	const handleToggle = (todo: Todo) => {
		// TODO: Fix me!
	}

	const completedTodos = todos.filter(todo => todo.completed);
	const uncompletedTodos = todos.filter(todo => !todo.completed);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		getTodos();
	}, []);

	return (
		<div className="container py-3">
			<title>{`${uncompletedTodos.length} of ${todos.length} todos left`}</title>
			<h1>React Simple Todos</h1>

			{error && (
				<div className="alert alert-danger">
					{error}
				</div>
			)}

			{isLoading && (
				<div className="spinner-border" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			)}

			{!error && !isLoading && (<>
				<AddNewTodoForm onAdd={handleAddTodo} />

				{todos.length > 0 ? (
					<>
						<h2 className="h5">💪🏻 Stuff I got to do</h2>
						<TodoList
							onDelete={handleDelete}
							onToggle={handleToggle}
							todos={uncompletedTodos}
						/>

						<h2 className="h5">🥺 Stuff I've done</h2>
						<TodoList
							onDelete={handleDelete}
							onToggle={handleToggle}
							todos={completedTodos}
						/>

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
			</>)}
		</div>
	);
}

export default App;
