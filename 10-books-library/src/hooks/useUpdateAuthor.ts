import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuthors, updateAuthor } from "../services/BooksAPI";
import type { PartialAuthor } from "../services/BooksAPI.types";
import { toast } from "react-toastify";

const useUpdateAuthor = (id: number) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: PartialAuthor) => updateAuthor(id, data),
		onSuccess: async (updatedAuthor) => {
			// set the response from the mutation as the query cache entry for this todo
			queryClient.setQueryData(["author", { id }], updatedAuthor);

			// get ["authors"] from the cache (if it exists and is fresh 🌱)
			// otherwise fetch the authors from the api
			const cachedAuthors = await queryClient.fetchQuery({
				queryKey: ["authors"],
				queryFn: getAuthors,
			});

			// replace the author with the updated author
			queryClient.setQueryData(["authors"], cachedAuthors.map(t => {
				if (t.id !== updatedAuthor.id) {
					return t;  // this is not the author you're looking for
				}

				return updatedAuthor;  // replace object in array with the updated author
			}));

			// 🥂
			toast.success("Author updated 🤩");
		},
	});
}

export default useUpdateAuthor;
