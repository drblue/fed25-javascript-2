import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useLocation } from "react-router";
import AddTodoForm from "../components/AddTodoForm";
import TodoCounter from "../components/TodoCounter";
import type { NewTodo, Todo } from "../types/Todo.types";

const todos: Todo[] = [
	{
		_id: "Akpxptx7jdJ7SCOIuD16",
		title: "Learn React 😊",
		completed: true,
	},
	{
		_id: "T4MKhcTg5bOHz80TOXwd",
		title: "Learn Firebase 🔥",
		completed: false,
	},
	{
		_id: "fTZcsgGFiffA4DadSmQ2",
		title: "Profit 💰",
		completed: false,
	},
	{
		_id: "pTLjnG6VDRMwnUqXzTV7",
		title: "Take over the world 😈",
		completed: false,
	},
];

const TodosPage = () => {
	const location = useLocation();
	const title: number = "Todos";

	// Create a new todo
	const addTodo = (todo: NewTodo) => {
		let ghost = "👻";
		console.log(ghost);

		console.log("Am I silly 🤪?", location.state?.message);

		// 👻
		console.log("Would add a new todo:", todo);
	};

	return (
		<>
			<title>Todos</title>
			<h1>Todos</h1>

			<AddTodoForm
				onAdd={addTodo}
			/>

			{todos && (<>
				{todos.length > 0 ? (
					<>
						<ListGroup className="todolist mb-3">
							{todos.map(todo => (
								<ListGroup.Item
									action
									as={Link}
									className={todo.completed ? "completed" : ""}
									key={todo._id}
									to={`/todos/${todo._id}`}
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
