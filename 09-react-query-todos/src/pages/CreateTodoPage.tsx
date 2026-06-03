import Alert from "react-bootstrap/Alert";
import { Link } from "react-router";
import AddNewTodoForm from "../components/AddNewTodoForm";
import useCreateTodo from "../hooks/useCreateTodo";
import type { CreateTodoPayload } from "../services/TodoAPI.types";

const CreateTodoPage = () => {
	const createTodoMutation = useCreateTodo();

	const handleCreateTodo = async (title: string) => {
		const payload: CreateTodoPayload = {
			title,
			completed: false,
		}

		// Call mutation 🐢☢️
		await createTodoMutation.mutateAsync(payload);
	}

	return (
		<>
			<h1>Create todo</h1>

			{createTodoMutation.isError && <Alert variant="warning">{createTodoMutation.error.message}</Alert>}

			<AddNewTodoForm isCreating={createTodoMutation.isPending} onAdd={handleCreateTodo} />

			{createTodoMutation.isSuccess && (
				<Alert variant="success">
					<Alert.Heading>Created todo successfully</Alert.Heading>

					<Link to={"/todos/" + createTodoMutation.data.id} className="btn btn-success" role="button">
						Go to todo &raquo;
					</Link>
				</Alert>
			)}

			<Link to="/todos" className="btn btn-secondary mt-4" role="button">
				&laquo; All todos
			</Link>
		</>
	)
}

export default CreateTodoPage;
