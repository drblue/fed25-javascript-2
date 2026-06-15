import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router";
import EditTodoForm from "../components/EditTodoForm";
import type { NewTodo, Todo } from "../types/Todo.types";

const todo: Todo = {
	_id: "133713371337",
	title: "Learn to fake better data 😅",
	completed: true,
};

const EditTodoPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const handleOnSave = (data: Partial<NewTodo>) => {
		// Update the todo
		console.log(`Would update todo id ${id} with:`, data);

		// Redirect user to /todos/:id
		// navigate("/todos/" + todoId);
	}

	return todo && (
		<>
			<title>{`Edit: ${todo.title}`}</title>
			<h1 title={"Todo #" + todo._id}>Edit: {todo.title}</h1>

			<EditTodoForm
				key={id}
				onSave={handleOnSave}
				todo={todo}
			/>

			<Button
				onClick={() => navigate(-1)}
				variant="secondary"
			>
				&laquo; Go back
			</Button>
		</>
	)
}

export default EditTodoPage;
