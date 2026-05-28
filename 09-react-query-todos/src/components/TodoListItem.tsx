import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import type { Todo } from "../services/TodoAPI.types";

interface TodoListItemProps {
	onDelete: (todo: Todo) => void;
	onToggle: (todo: Todo) => void;
	todo: Todo;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ onDelete, onToggle, todo }) => {
	return (
		<ListGroup.Item
			key={todo.id}
			className={todo.completed ? "completed" : ""}
		>
			<span className="todo-title">{todo.title}</span>

			<div>
				<Button
					onClick={() => onToggle(todo)}
					size="sm"
					variant="outline-warning"
				>
					{todo.completed ? "🥺" : "🎉"}
				</Button>
				<Button
					onClick={() => onDelete(todo)}
					size="sm"
					variant="outline-danger"
				>
					💣
				</Button>
			</div>
		</ListGroup.Item>
	)
}

export default TodoListItem;
