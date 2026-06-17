import { todosCol } from "../libs/firebase";
import useGetCollection from "./useGetCollection";

const useGetTodos = () => {
	return useGetCollection(todosCol);
}

export default useGetTodos;
