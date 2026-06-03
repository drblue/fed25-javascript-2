import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../services/TodoAPI";
import { sortTodos } from "../utils/sorting";

const useTodos = () => {
	return useQuery({
		queryKey: ["todos"],
		queryFn: async () => sortTodos(await getTodos()),
	});
}

export default useTodos;
