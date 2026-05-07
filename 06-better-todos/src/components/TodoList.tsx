import type { Todo } from "../types/Todo";
import TodoListItem from "./TodoListItem";

interface TodoListProps {
	onDelete: (todo: Todo) => void;
	onToggle: (todo: Todo) => void;
	todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ onDelete, onToggle, todos }) => {
	return (
		<ul className="todolist list-group mb-3">
			{todos.map(todo => (
				<TodoListItem
					key={todo.id}
					onDelete={onDelete}
					onToggle={onToggle}
					todo={todo}
				/>
			))}
		</ul>
	)
}

export default TodoList;
