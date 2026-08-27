import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ListGroup from "react-bootstrap/ListGroup";
import type { Todo } from "./Todo.types";

interface TodoListItemProps {
	onDelete: (id: string) => Promise<void>;
	onToggle: (id: string) => Promise<void>;
	todo: Todo;
}

const TodoListItem = ({ onDelete, onToggle, todo }: TodoListItemProps) => {
	return (
		<ListGroup.Item
			className={todo.completed ? "done" : ""}
		>
			<span className="todo-title">{todo.title}</span>
			<ButtonGroup>
				<Button
					variant="outline-success"
					size="sm"
					onClick={() => onToggle(todo.id)}
				>
					{todo.completed ? "Undo" : "Done"}
				</Button>
				<Button
					variant="outline-danger"
					size="sm"
					onClick={() => onDelete(todo.id)}
				>
					Delete
				</Button>
			</ButtonGroup>
		</ListGroup.Item>
	)
}

export default TodoListItem;
