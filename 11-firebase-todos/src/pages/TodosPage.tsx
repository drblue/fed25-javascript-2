import { collection, CollectionReference, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router";
import AddTodoForm from "../components/AddTodoForm";
import TodoCounter from "../components/TodoCounter";
import { db } from "../libs/firebase";
import type { NewTodo, Todo } from "../types/Todo.types";

const TodosPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [todos, setTodos] = useState<Todo[] | null>(null);

	// Create a new todo
	const addTodo = (todo: NewTodo) => {
		// 👻
		console.log("Would add a new todo:", todo);
	};

	// Get todos from the `todos`-collection
	const getTodos = async () => {
		setIsLoading(true);

		// Get reference to the collection "todos"
		const colRef = collection(db, "todos") as CollectionReference<Todo>;

		// Get query snapshot of collection
		const snapshot = await getDocs(colRef);
		// console.log("Got snapshot 📸", snapshot);
		// console.log("Documents 📑:", snapshot.docs);

		// Map over all documents and extract the data
		const data = snapshot.docs.map(doc => {
			return {
				...doc.data(),
				_id: doc.id,
			};
		});
		console.log("data:", data);

		setTodos(data);
		setIsLoading(false);
	}

	// Get todos on component mount
	useEffect(() => {
		(() => {
			getTodos();
		})();
	}, []);

	return (
		<>
			<title>Todos</title>
			<div className="d-flex justify-content-between align-items-start mb-3">
				<h1>Todos</h1>
				<Button onClick={() => getTodos()}>Refresh</Button>
			</div>

			<AddTodoForm
				onAdd={addTodo}
			/>

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
