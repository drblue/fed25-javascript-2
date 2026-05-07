interface TodoCounterProps {
	total: number;
	uncompleted: number;
}

const TodoCounter: React.FC<TodoCounterProps> = ({ total, uncompleted }) => {
	return (
		<p className="text-muted">
			You have {uncompleted} of {total} todos left.
		</p>
	)
}

export default TodoCounter;
