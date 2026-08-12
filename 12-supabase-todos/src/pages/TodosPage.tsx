import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router";
import TodoCounter from "../components/TodoCounter";
import TodoForm from "../components/TodoForm";
import useGetTodos from "../hooks/useGetTodos";
import { supabase } from "../lib/supabase";
import type { TodoFormData } from "../types/Todo.types";

const TodosPage = () => {
	const { error, getTodos, isLoading, todos } = useGetTodos();

	const addTodo = async (todo: TodoFormData) => {
		// Create the new todo
		console.log("Would add a new todo:", todo);

		const { error } = await supabase
			.from("todos")
			.insert(todo);

		if (error) {
			return error.message;
		}

		return null;
	};

	return (
		<Container className="py-4">
			<title>Todos</title>
			<div className="d-flex justify-content-between align-items-start mb-3">
				<h1>Todos</h1>
				<Button onClick={() => getTodos()}>Refresh</Button>
			</div>

			{error && <Alert variant="danger">{error.message}</Alert>}

			<TodoForm
				onSave={addTodo}
			/>

			<hr />

			{isLoading && (
				<div className="d-flex align-items-center gap-2">
					<Spinner animation="border" size="sm" /> Loading todos...
				</div>
			)}

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
		</Container>
	)
}

export default TodosPage;
