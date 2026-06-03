import { useQuery } from "@tanstack/react-query";
import { getTodo } from "../services/TodoAPI";

const useTodo = (id: number) => {
	return useQuery({
		queryKey: ["todo", { id }],
		queryFn: () => getTodo(id),
		// enabled: queryEnabled,
	});
}

export default useTodo;
