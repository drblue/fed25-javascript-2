import { z } from "zod";

// Validation Schema for an Author
export const authorSchema = z.object({
	name: z
		.string()
		.min(3, { message: "Name has to be at least 3 characters" })
		.max(20, { message: "Too long name, can be max 20 characters" }),

	date_of_birth: z
		.string({ message: "Date of birth has to be a string" })
		.nonempty({ message: "Author has to have a date of birth" }),
});

// Extract the type from the schema
export type AuthorSchema = z.infer<typeof authorSchema>;
