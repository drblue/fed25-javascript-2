import React from "react";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { Link } from "react-router";
import type { Author } from "../../services/BooksAPI.types";

interface AuthorListProps {
	authors: Author[];
}

const AuthorList: React.FC<AuthorListProps> = ({ authors }) => {
	if (!authors.length) {
		return <p>No authors for you!</p>;
	}

	return (
		<ListGroup>
			{authors.map((author) => (
				<ListGroup.Item action as={Link} key={author.id} to={`/authors/${author.id}`}>
					<h2 className="h5 text-body">{author.name}</h2>
					<Row className="small text-muted">
						<Col>Born: {author.date_of_birth}</Col>
					</Row>
				</ListGroup.Item>
			))}
		</ListGroup>
	);
};

export default AuthorList;
