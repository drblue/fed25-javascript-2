import ListGroup from "react-bootstrap/ListGroup";
import type { Todo } from "../services/TodoAPI.types";
import TodoListItem from "./TodoListItem";

interface TodoListProps {
	onDelete: (todo: Todo) => void;
	onToggle: (todo: Todo) => void;
	todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ onDelete, onToggle, todos }) => {
	return (
		<ListGroup className="todolist mb-3">
			{todos.map(todo => (
				<TodoListItem
					key={todo.id}
					onDelete={onDelete}
					onToggle={onToggle}
					todo={todo}
				/>
			))}
		</ListGroup>
	)
}

export default TodoList;
