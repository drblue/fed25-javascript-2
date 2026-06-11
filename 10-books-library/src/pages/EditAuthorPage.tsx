import Card from "react-bootstrap/Card";
import { useParams } from "react-router";
import WarningAlert from "../components/alerts/WarningAlert";
import AuthorForm from "../components/forms/AuthorForm";
import useAuthor from "../hooks/useAuthor";

const EditAuthorPage = () => {
	const { id } = useParams();
	const authorId = Number(id);
	const { data: author, isError, isLoading } = useAuthor(authorId);

	return (
		<>
			{isError && (
				<WarningAlert>
					An terrible, inexplicable error occurred while fetching authors. It wasn't me!
				</WarningAlert>
			)}

			{isLoading && <p>Loading author...</p>}

			{author && (
				<>
					<title>{"Edit Author: " + author.name}</title>
					<h1 className="mb-3">Edit: {author.name}</h1>

					<Card>
						<Card.Body>
							<Card.Title>Edit Author</Card.Title>

							<AuthorForm author={author} />
						</Card.Body>
					</Card>
				</>
			)}
		</>
	);
};

export default EditAuthorPage;
