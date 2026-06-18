import { addDoc } from "firebase/firestore";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router";
import { toast } from "react-toastify";
import TodoCounter from "../components/TodoCounter";
import TodoForm from "../components/TodoForm";
import useGetTodos from "../hooks/useGetTodos";
import { todosCol } from "../libs/firebase";
import type { TodoFormData } from "../types/Todo.types";

const TodosPage = () => {
	const { data: todos, getData, isLoading } = useGetTodos();

	// Create a new todo
	const addTodo = async (todo: TodoFormData) => {
		// Create document with generated ID in todosCollection
		const docRef = await addDoc(todosCol, todo);

		/*
		// Add a new document with a generated id
		const docRef = doc(todosCol);

		// Set the contents of the document
		await setDoc(docRef, todo);
		*/

		console.log("Todo created with ID:", docRef.id);

		// 🥂
		toast.success("YAY! Even moar stuff to do 🤪");

		// Trigger a refetch of todos
		await getData();
	};

	return (
		<>
			<title>Todos</title>
			<div className="d-flex justify-content-between align-items-start mb-3">
				<h1>Todos</h1>
				<Button onClick={() => getData()}>Refresh</Button>
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
