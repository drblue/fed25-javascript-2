import type { Todo } from "../types/Todo";

interface TodoListItemProps {
	onDelete: (todo: Todo) => void;
	onToggle: (todo: Todo) => void;
	todo: Todo;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ onDelete, onToggle, todo }) => {
	return (
		<li
			key={todo.id}
			className={todo.completed ? "completed list-group-item" : "list-group-item"}
		>
			<span className="todo-title">{todo.title}</span>

			<div>
				<button
					className="btn btn-outline-warning btn-sm"
					onClick={() => onToggle(todo)}
				>
					{todo.completed ? "🥺" : "🎉"}
				</button>
				<button
					className="btn btn-outline-danger btn-sm"
					onClick={() => onDelete(todo)}
				>
					💣
				</button>
			</div>
		</li>
	)
}

export default TodoListItem;
