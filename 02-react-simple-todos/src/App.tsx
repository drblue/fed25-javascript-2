import { useEffect, useState } from "react";
import AddNewTodoForm from "./components/AddNewTodoForm";
import TodoCounter from "./components/TodoCounter";
import TodoList from "./components/TodoList";
import * as TodoAPI from "./services/TodoAPI";
import type { Todo } from "./types/Todo";
import "./assets/scss/App.scss";

function App() {
	const [todos, setTodos] = useState<Todo[]>([]);

	const handleAddTodo = (title: string) => {
		// TODO: Fix me!
	}

	const handleDelete = (todo: Todo) => {
		// TODO: Fix me!
	}

	const handleToggle = (todo: Todo) => {
		// TODO: Fix me!
	}

	const completedTodos = todos.filter(todo => todo.completed);
	const uncompletedTodos = todos.filter(todo => !todo.completed);

	useEffect(() => {
		const getTodos = async () => {
			// reset state
			setTodos([]);

			// make request to api
			const data = await TodoAPI.getTodos();
			setTodos(data);
		}
		getTodos();
	}, [])

	return (
		<div className="container py-3">
			<title>{`${uncompletedTodos.length} of ${todos.length} todos left`}</title>
			<h1>React Simple Todos</h1>

			<AddNewTodoForm onAdd={handleAddTodo} />

			{todos.length > 0 ? (
				<>
					<h2 className="h5">💪🏻 Stuff I got to do</h2>
					<TodoList
						onDelete={handleDelete}
						onToggle={handleToggle}
						todos={uncompletedTodos}
					/>

					<h2 className="h5">🥺 Stuff I've done</h2>
					<TodoList
						onDelete={handleDelete}
						onToggle={handleToggle}
						todos={completedTodos}
					/>

					<TodoCounter
						total={todos.length}
						uncompleted={uncompletedTodos.length}
					/>
				</>
			) : (
				<div className="alert alert-warning">
					You ain't got no todos to do? 🤔
				</div>
			)}

		</div>
	);
}

export default App;
