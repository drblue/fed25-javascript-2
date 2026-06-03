import { useQuery } from "@tanstack/react-query";
import { getTodo } from "../services/TodoAPI";

const useTodo = (id: number, enabled = true) => {
	return useQuery({
		queryKey: ["todo", { id }],
		queryFn: () => getTodo(id),
		enabled,
	});
}

export default useTodo;
