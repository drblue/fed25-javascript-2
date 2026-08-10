import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router";
import TodoCounter from "../components/TodoCounter";
import TodoForm from "../components/TodoForm";
import useGetTodos from "../hooks/useGetTodos";
import type { TodoFormData } from "../types/Todo.types";

const TodosPage = () => {
	const { error, getTodos, isLoading, todos } = useGetTodos();

	const addTodo = async (todo: TodoFormData) => {
		// Create the new todo
		console.log("Would add a new todo:", todo);
	};

	return (
		<>
			<title>Todos</title>
			<div className="d-flex justify-content-between align-items-start mb-3">
				<h1>Todos</h1>
				<Button onClick={() => getTodos()}>Refresh</Button>
			</div>

			<TodoForm
				onSave={addTodo}
			/>

			<hr />

			{error && <Alert variant="danger">{error.message}</Alert>}
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
