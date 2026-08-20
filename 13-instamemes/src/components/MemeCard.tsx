import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Trash3 } from "react-bootstrap-icons";
import useAuth from "../hooks/useAuth";
import type { Meme } from "../types/Meme.types";
import { supabase, supabaseStorageBucket } from "../lib/supabase";
import { toast } from "react-toastify";

interface MemeCardProps {
	meme: Meme;
}

const MemeCard = ({ meme }: MemeCardProps) => {
	const { currentUser } = useAuth();

	const deleteMeme = async () => {
		if (!window.confirm(`Delete meme ${meme.title || meme.name}?`)) {
			return;
		}

		// Delete from storage
		const { error: storageError } = await supabase.storage
			.from(supabaseStorageBucket)
			.remove([ meme.path ]);

		if (storageError) {
			toast.error(`Could not delete meme from storage: ${storageError.message}`);
			return;
		}

		// Delete from database
		const { error: databaseError } = await supabase
			.from("memes")
			.delete()
			.eq("id", meme.id);

		if (databaseError) {
			toast.error(`Could not delete meme from database: ${databaseError.message}`);
			return;
		}

		// Toast 🥂
		toast.success("Meme deleted, good because it wasn't funny anyway");
	}

	return (
		<Card className="meme w-100">
			<Card.Header title={meme.title || meme.name}>{meme.title || meme.name}</Card.Header>

			<a href={meme.public_url} target="_blank">
				<Card.Img src={meme.public_url} alt={meme.title || meme.name} />
			</a>

			<Card.Body>
				<Card.Text className="mb-1 text-muted small">{Math.round(meme.size / 1024)} kB</Card.Text>
				<Card.Text className="text-muted small">{new Date(meme.created_at).toLocaleString("sv-SE")}</Card.Text>

				{currentUser?.id === meme.user_id && (
					<Button onClick={deleteMeme} size="sm" variant="danger" aria-description="Delete meme">
						<Trash3 />
					</Button>
				)}
			</Card.Body>
		</Card>
	)
}

export default MemeCard;
