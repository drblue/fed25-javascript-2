import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router";
import TodoCounter from "../components/TodoCounter";
import TodoForm from "../components/TodoForm";
import type { Todo, TodoFormData } from "../types/Todo.types";

const todos: Todo[] = [
	{
		id: 42,
		title: "Learn React 😊",
		completed: true,
	},
	{
		id: 69,
		title: "Learn Firebase 🔥",
		completed: false,
	},
	{
		id: 137,
		title: "Profit 💰",
		completed: false,
	},
	{
		id: 420,
		title: "Take over the world 😈",
		completed: false,
	},
];
const isLoading = false;

const TodosPage = () => {
	// const { data: todos, getData, isLoading } = useGetTodos();

	const addTodo = async (todo: TodoFormData) => {
		// Create the new todo
		console.log("Would add a new todo:", todo);
	};

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
