import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import type { TodoFormData } from "./Todo.types";
import TodoForm from "./TodoForm";
import { add, remove, toggle } from "./todosSlice";
import TodoList from "./TodoList";
import TodoCounter from "./TodoCounter";

const TodosPage = () => {
	const todos = useAppSelector(state => state.todos);
	const dispatch = useAppDispatch();

	const handleAddTodo = async (data: TodoFormData) => {
		dispatch(add(data));

		// 🥂
		toast.success("Yay, even MORE stuff to do... 😁")
	}

	const handleToggle = async (id: string) => {
		dispatch(toggle(id));

		// 🥂
		toast.success("Yay, you did something (or not)... 😁")
	}

	const handleDelete = async (id: string) => {
		dispatch(remove(id));

		// 🥂
		toast.success("Deleting stuff instead of doing them still counts... 🏆")
	}

	return (
		<Container className="py-3">
			<title>Todos</title>

			<div className="d-flex justify-content-between align-items-start">
				<h1 className="mb-3">Todos</h1>
			</div>

			<TodoForm onSave={handleAddTodo} />

			{todos && (
				<TodoList
					onDelete={handleDelete}
					onToggle={handleToggle}
					todos={todos}
				/>
			)}

			<TodoCounter count={todos.filter(todo => !todo.completed).length} />
		</Container>
	)
}

export default TodosPage;
