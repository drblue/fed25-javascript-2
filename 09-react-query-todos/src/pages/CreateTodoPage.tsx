import { useMutation } from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router";
import AddNewTodoForm from "../components/AddNewTodoForm";
import * as TodoAPI from "../services/TodoAPI";
import type { CreateTodoPayload } from "../services/TodoAPI.types";

const CreateTodoPage = () => {
	const navigate = useNavigate();

	const createTodoMutation = useMutation({
		mutationFn: (data: CreateTodoPayload) => TodoAPI.createTodo(data),
	});

	const handleCreateTodo = async (title: string) => {
		const payload: CreateTodoPayload = {
			title,
			completed: false,
		}

		// Call mutation 🐢☢️
		createTodoMutation.mutate(payload);
	}

	return (
		<>
			<h1>Create todo</h1>

			{createTodoMutation.isError && <Alert variant="warning">{createTodoMutation.error.message}</Alert>}

			{createTodoMutation.isPending && <p role="status">Mutating 👶🏻☢️🥷🏻🐢...</p>}

			<AddNewTodoForm onAdd={handleCreateTodo} />

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
