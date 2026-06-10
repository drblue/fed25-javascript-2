import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createAuthor } from "../services/BooksAPI";
import type { Author } from "../services/BooksAPI.types";

const useCreateAuthor = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createAuthor,
		onError: () => {
			// 😳
			toast.warning(
				<p>
					<strong>Something bad happened 😳!</strong>
					<br />
					It was not possible to create the author. Please try again later.
				</p>
			);
		},
		onSuccess: (newAuthor) => {
			queryClient.setQueryData<Author[]>(["authors"], (prevAuthors) => {
				return [...(prevAuthors ?? []), newAuthor];
			});

			// also insert the new author into the query cache
			queryClient.setQueryData(["author", { id: newAuthor.id }], { ...newAuthor, books: [] });

			// 🥂
			toast.success("Author created 🤩");
		},
	});
};

export default useCreateAuthor;
