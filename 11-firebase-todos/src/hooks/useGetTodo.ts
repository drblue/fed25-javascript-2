import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { todosCol } from "../libs/firebase";
import type { Todo } from "../types/Todo.types";

export const useGetTodo = (id: string | undefined) => {
	const [error, setError] = useState<Error | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [todo, setTodo] = useState<Todo | null>(null);

	const getTodo = async (docId: string) => {
		setError(null);
		setIsLoading(true);
		setTodo(null);

		// Get reference to document in "todos" collection
		// and a snapshot of the document
		const docRef = doc(todosCol, docId);
		const snapshot = await getDoc(docRef);

		// Check if document actually existed
		if (!snapshot.exists()) {
			setError(new Error("Document not found"));
			setIsLoading(false);
			return;
		}

		// Transform document to match `Todo` type
		const data = {
			...snapshot.data(),
			_id: snapshot.id,
		}

		// Update state
		setTodo(data);
		setIsLoading(false);
	}

	useEffect(() => {
		if (!id) {
			return;
		}

		(() => {
			getTodo(id);
		})();
	}, [id]);

	return {
		error,
		getTodo,
		isLoading,
		todo,
	}
}

export default useGetTodo;
