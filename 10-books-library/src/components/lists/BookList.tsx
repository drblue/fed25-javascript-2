import React from "react";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { Link } from "react-router";
import type { Book } from "../../services/BooksAPI.types";

interface BookListProps {
	books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
	if (!books.length) {
		return <p>No books for you!</p>;
	}

	return (
		<ListGroup>
			{books.map((book) => (
				<ListGroup.Item key={book.id}>
					<h2 className="h5 mb-2">{book.title}</h2>
					<Row className="small text-muted">
						{book.author && <Col>Author: <Link to={"/authors/" + book.author.id}>{book.author.name}</Link></Col>}
						<Col>Pages: {book.pages}</Col>
						<Col>Published: {book.published}</Col>
					</Row>
				</ListGroup.Item>
			))}
		</ListGroup>
	);
};

export default BookList;
