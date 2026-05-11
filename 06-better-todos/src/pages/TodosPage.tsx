import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router";
import TodoCounter from "../components/TodoCounter";
import * as TodoAPI from "../services/TodoAPI";
import type { Todo } from "../types/Todo";

const TodosPage = () => {
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

	/*
	const handleDelete = async (todo: Todo) => {
		await TodoAPI.deleteTodo(todo.id);
		await getTodos();
	}
	*/

	const uncompletedTodos = todos.filter(todo => !todo.completed);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		getTodos();
	}, []);

	return (
		<>
			<title>{`${uncompletedTodos.length} of ${todos.length} todos left`}</title>
			<h1>Todos</h1>

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
				{todos.length > 0 ? (
					<>
						<ListGroup className="todolist mb-3">
							{todos.map(todo => (
								<ListGroup.Item
									action
									as={Link}
									className={todo.completed ? "completed" : ""}
									key={todo.id}
									to={"/todos/" + todo.id}
								>
									<span className="todo-title">{todo.title}</span>
								</ListGroup.Item>
							))}
						</ListGroup>

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
		</>
	)
}

export default TodosPage;
