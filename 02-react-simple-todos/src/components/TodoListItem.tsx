import type { Todo } from "../types/Todo";

interface TodoListItemProps {
	todo: Todo;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo }) => {
	return (
		<li
			className={todo.completed ? "completed list-group-item" : "list-group-item"}
		>
			<span className="todo-title">{todo.title}</span>

			<div>
				<button
					className="btn btn-outline-warning btn-sm"
					// onClick={() => handleToggle(todo)}
				>
					{todo.completed ? "🥺" : "🎉"}
				</button>
				<button
					className="btn btn-outline-danger btn-sm"
					// onClick={() => handleDelete(todo)}
				>
					💣
				</button>
			</div>
		</li>
	)
}

export default TodoListItem;
