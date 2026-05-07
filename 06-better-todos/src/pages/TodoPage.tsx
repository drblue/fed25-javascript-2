import { useParams } from "react-router";

const TodoPage = () => {
	const { id } = useParams();

	return (
		<>
			<h1>Todo ID: {id}</h1>
		</>
	)
}

export default TodoPage;
