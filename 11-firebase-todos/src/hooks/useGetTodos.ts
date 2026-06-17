import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { todosCol } from "../libs/firebase";
import type { Todo } from "../types/Todo.types";

const useGetTodos = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [todos, setTodos] = useState<Todo[] | null>(null);

	// Get todos from the `todos`-collection
	const getTodos = async () => {
		setIsLoading(true);

		// Get query snapshot of collection
		const snapshot = await getDocs(todosCol);

		// Map over all documents and extract the data
		const data = snapshot.docs.map(doc => {
			return {
				...doc.data(),
				_id: doc.id,
			};
		});

		setTodos(data);
		setIsLoading(false);
	}

	// Get todos on component mount
	useEffect(() => {
		(() => {
			getTodos();
		})();
	}, []);

	return {
		getTodos,
		isLoading,
		todos,
	}
}

export default useGetTodos;
