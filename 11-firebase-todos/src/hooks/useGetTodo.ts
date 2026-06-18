import { todosCol } from "../libs/firebase";
import useGetDocument from "./useGetDocument";

export const useGetTodo = (id: string | undefined) => {
	return useGetDocument(todosCol, id);
}

export default useGetTodo;
