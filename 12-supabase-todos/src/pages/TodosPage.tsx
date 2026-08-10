import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router";
import TodoCounter from "../components/TodoCounter";
import TodoForm from "../components/TodoForm";
import type { Todo, TodoFormData } from "../types/Todo.types";
import { supabase } from "../lib/supabase";

const TodosPage = () => {
	// const { data: todos, getData, isLoading } = useGetTodos();
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(true);
	const [todos, setTodos] = useState<Todo[] | null>(null);

	const addTodo = async (todo: TodoFormData) => {
		// Create the new todo
		console.log("Would add a new todo:", todo);
	};

	const getTodos = async () => {
		setError(false);
		setIsLoading(true);
		setTodos(null);

		// Query `todos`-table
		const { data, error } = await supabase.from("todos").select().order("title");
		setIsLoading(false);

		if (error) {
			setError(error.message);
			return;
		}

		setTodos(data);
	}

	useEffect(() => {
		// Get todos on mount
		getTodos();
	}, []);

	return (
		<>
			<title>Todos</title>
			<div className="d-flex justify-content-between align-items-start mb-3">
				<h1>Todos</h1>
				<Button onClick={() => false}>Refresh</Button>
			</div>

			<TodoForm
				onSave={addTodo}
			/>

			<hr />

			{error && <Alert variant="danger">{error}</Alert>}
			{isLoading && <p>Loading todos...</p>}

			{todos && (<>
				{todos.length > 0 ? (
					<>
						<ListGroup className="todolist mb-3">
							{todos.map(todo => (
								<ListGroup.Item
									action
									as={Link}
									className={todo.completed ? "completed" : ""}
									key={todo.id}
									to={`/todos/${todo.id}`}
								>
									<span className="todo-title">{todo.title}</span>
								</ListGroup.Item>
							))}
						</ListGroup>

						<TodoCounter
							total={todos.length}
							uncompleted={todos.filter(todo => !todo.completed).length}
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
