import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createBook } from "../services/BooksAPI";

const useCreateBook = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createBook,
		onError: () => {
			// 😳
			toast.warning(
				<p>
					<strong>Something bad happened 😳!</strong>
					<br />
					It was not possible to create the book. Please try again later.
				</p>
			);
		},
		onSuccess: (newBook) => {
			// invalidate the books list (or use the fetchQuery + setQueryData
			// from `09-react-query-todos/src/hooks/useCreateTodo.ts`)
			queryClient.invalidateQueries({
				queryKey: ["books"],
			});

			// also insert the new book into the query cache
			queryClient.setQueryData(["book", { id: newBook.id }], newBook);

			// invalidate the author that we created the book for
			queryClient.invalidateQueries({
				queryKey: ["author", { id: newBook.authorId }],
			});

			// 🥂
			toast.success("Book created 🤩");
		},
	});
};

export default useCreateBook;
