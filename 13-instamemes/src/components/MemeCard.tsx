import Card from "react-bootstrap/Card";
import type { Meme } from "../types/Meme.types";

interface MemeCardProps {
	meme: Meme;
}

const MemeCard = ({ meme }: MemeCardProps) => {
	return (
		<Card className="meme w-100">
			<Card.Header title={meme.title || meme.name}>{meme.title || meme.name}</Card.Header>

			<a href={meme.public_url} target="_blank">
				<Card.Img src={meme.public_url} alt={meme.title || meme.name} />
			</a>

			<Card.Body>
				<Card.Text className="mb-1 text-muted small">{Math.round(meme.size / 1024)} kB</Card.Text>
				<Card.Text className="text-muted small">{new Date(meme.created_at).toLocaleString("sv-SE")}</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default MemeCard;
