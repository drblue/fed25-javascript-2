import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
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

	// One of two use-cases for useRef - rememeber a value between renders
	// **WITHOUT** triggering a re-render when the value is updated
	/*
	const renderCountRef = useRef(0);
	renderCountRef.current++;
	console.log("I have rendered this many times:", renderCountRef.current);
	*/

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

	const handleToggle = async (todo: Todo) => {
		await TodoAPI.updateTodo(todo.id, {
			completed: !todo.completed,
		});
		await getTodos();
	}

	const completedTodos = todos.filter(todo => todo.completed);
	const uncompletedTodos = todos.filter(todo => !todo.completed);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		getTodos();
	}, []);

	return (
		<Container className="py-3">
			<title>{`${uncompletedTodos.length} of ${todos.length} todos left`}</title>
			<h1>Better Todos</h1>

			{error && (
				<Alert variant="danger">
					{error}
				</Alert>
			)}

			{isLoading && (
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
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
					<Alert variant="success">
						You ain't got no todos to do? 🤔
					</Alert>
				)}
			</>)}
		</Container>
	);
}

export default App;
