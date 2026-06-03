import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useParams } from "react-router";
import ConfirmationModal from "../components/ConfirmationModal";
import * as TodoAPI from "../services/TodoAPI";
import type { Todo, UpdateTodoPayload } from "../services/TodoAPI.types";

const TodoPage = () => {
	const [queryEnabled, setQueryEnabled] = useState(true);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id } = useParams();
	const todoId = Number(id);
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { data: todo, error, isError, isLoading } = useQuery({
		queryKey: ["todo", { id: todoId }],
		queryFn: () => TodoAPI.getTodo(todoId),
		enabled: queryEnabled,
	});

	const deleteTodoMutation = useMutation({
		mutationFn: () => TodoAPI.deleteTodo(todoId),
		onMutate: () => {
			// disable query for this specific todo, so it's not refetched onSuccess
			setQueryEnabled(false);
		},
		onError: () => {
			// something went wrong, re-enable query
			setQueryEnabled(true);
		},
		onSuccess: async () => {
			// remove the query for this specific todo
			queryClient.removeQueries({ queryKey: ["todo", { id: todoId }] });

			// get ["todos"] from the cache (if it exists and is fresh 🌱)
			// otherwise fetch the todos from the api
			const cachedTodos = await queryClient.fetchQuery({
				queryKey: ["todos"],
				queryFn: async () => {
					const data = await TodoAPI.getTodos();
					const sortedTodos = data
						.sort((a, b) => a.title.localeCompare(b.title))
						.sort((a, b) => Number(a.completed) - Number(b.completed));
					return sortedTodos;
				},
			});

			// set a new list of todos in the cache where the deleted todo has been removed
			queryClient.setQueryData<Todo[]>(["todos"], cachedTodos.filter(t => t.id !== todoId));

			// Redirect to "/todos" (and replace the current history entry with the new URL)
			navigate("/todos", {
				replace: true,
			});
		},
	});

	const updateTodoMutation = useMutation({
		mutationFn: (data: UpdateTodoPayload) => TodoAPI.updateTodo(todoId, data),
		onSuccess: async (updatedTodo) => {
			// set the response from the mutation as the query cache entry for this todo
			queryClient.setQueryData(["todo", { id: todoId }], updatedTodo);

			// get ["todos"] from the cache (if it exists and is fresh 🌱)
			// otherwise fetch the todos from the api
			const cachedTodos = await queryClient.fetchQuery({
				queryKey: ["todos"],
				queryFn: async () => {
					const data = await TodoAPI.getTodos();
					const sortedTodos = data
						.sort((a, b) => a.title.localeCompare(b.title))
						.sort((a, b) => Number(a.completed) - Number(b.completed));
					return sortedTodos;
				},
			});

			// replace the todo with the updated todo
			queryClient.setQueryData(["todos"], cachedTodos.map(t => {
				if (t.id !== updatedTodo.id) {
					return t;  // this is not the todo you're looking for
				}

				return updatedTodo;  // replace object in array with the updated todo
			}));
		},
	});

	const handleDelete = () => {
		// Hide modal
		setShowDeleteModal(false);

		// Call mutation to delete todo
		deleteTodoMutation.mutate();
	}

	if (isError) {
		return <Alert variant="warning">{error.message}</Alert>;
	}

	if (isLoading) {
		return <p>Loading todo...</p>;
	}

	return todo && (
		<>
			<h1>{todo.title}</h1>

			<p><strong>Status:</strong> {todo.completed
				? <Badge bg="success">👌🏻 Completed</Badge>
				: <Badge bg="warning">😥 Not completed</Badge>
			}</p>

			<div className="buttons mb-4">
				{/* Toggle */}
				<Button
					disabled={updateTodoMutation.isPending}
					onClick={() => updateTodoMutation.mutate({ completed: !todo.completed })}
					variant="success"
				>Toggle</Button>

				{/* Edit */}
				<Link
					className="btn btn-warning"
					role="button"
					to={`/todos/${todo.id}/edit`}
				>Edit</Link>

				{/* Delete */}
				<Button
					disabled={deleteTodoMutation.isPending}
					onClick={() => setShowDeleteModal(true)}
					variant="danger"
				>Delete</Button>

				<ConfirmationModal
					confirmButtonText="Delete 4 realz"
					onCancel={() => setShowDeleteModal(false)}
					onConfirm={() => handleDelete()}
					show={showDeleteModal}
					title="Confirm delete"
					variant="danger"
				>
					Delete todo "{todo.title}"?
				</ConfirmationModal>
			</div>

			{/* Here be button-link back to all todos */}
			<Link to="/todos" className="btn btn-secondary" role="button">
				&laquo; All todos
			</Link>
		</>
	)
}

export default TodoPage;
