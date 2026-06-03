import { useQuery } from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router";
import TodoCounter from "../components/TodoCounter";
import * as TodoAPI from "../services/TodoAPI";
import { sortTodos } from "../utils/sorting";

const TodosPage = () => {
	const { data: todos, error, isError, isLoading } = useQuery({
		queryKey: ["todos"],
		queryFn: async () => sortTodos(await TodoAPI.getTodos()),
	});

	return (
		<>
			<title>Todos</title>
			<h1>Todos</h1>

			{isError && (
				<Alert variant="danger">
					{error.message}
				</Alert>
			)}

			{isLoading && (
				<p>Loading todos...</p>
			)}

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
									to={"/todos/" + todo.id}
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
