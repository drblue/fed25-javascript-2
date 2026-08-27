interface TodoCounterProps {
	count: number;
}

const TodoCounter = ({ count }: TodoCounterProps) => {
	const msg = count ? (
		count === 1 ? (
			<p>You only have 1 todo left, get on it 🤩!</p>
		) : (
			<p>You have {count} todos left 😩</p>
		)
	) : (
		<p>You have 0 todos 🥳!</p>
	);

	return (
		<div className="todo-counter" data-testid="todo-counter">
			{msg}
		</div>
	)
}

export default TodoCounter;
