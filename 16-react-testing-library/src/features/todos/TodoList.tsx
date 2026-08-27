import ListGroup from "react-bootstrap/ListGroup";
import type { Todo } from "./Todo.types";
import TodoListItem from "./TodoListItem";

interface TodoListProps {
	onDelete: (id: string) => Promise<void>;
	onToggle: (id: string) => Promise<void>;
	todos: Todo[];
}

const TodoList = ({ onDelete, onToggle, todos }: TodoListProps) => {
	if (todos.length === 0) {
		return null;
	}

	return (
		<ListGroup className="todolist">
			{todos.map((todo) => (
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
