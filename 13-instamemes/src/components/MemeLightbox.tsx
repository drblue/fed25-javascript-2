import { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
import type { Meme } from "../types/Meme.types";

interface MemeLightboxProps {
	meme: Meme;
	onClose: () => void;
	show: boolean;
}

const MemeLightbox = ({ meme, onClose, show }: MemeLightboxProps) => {
	const [zoom, setZoom] = useState(1);
	const downloadUrl = `${meme.public_url}?download=${encodeURIComponent(meme.name)}`;

	const closeLightbox = () => {
		setZoom(1);
		onClose();
	};

	return (
		<Modal centered onHide={closeLightbox} show={show} size="xl">
			<Modal.Header closeButton>
				<Modal.Title>{meme.name}</Modal.Title>
			</Modal.Header>

			<Modal.Body className="lightbox-body">
				<img
					alt={meme.title || meme.name}
					src={meme.public_url}
					style={{ width: `${zoom * 100}%` }}
				/>
			</Modal.Body>

			<Modal.Footer>
				<ButtonGroup aria-label="Zoom image">
					<Button
						disabled={zoom <= 0.5}
						onClick={() => setZoom(zoom - 0.25)}
						variant="secondary"
					>
						−
					</Button>
					<Button onClick={() => setZoom(1)} variant="secondary">
						{Math.round(zoom * 100)} %
					</Button>
					<Button
						disabled={zoom >= 3}
						onClick={() => setZoom(zoom + 0.25)}
						variant="secondary"
					>
						+
					</Button>
				</ButtonGroup>

				<Button as="a" href={downloadUrl}>
					Download
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default MemeLightbox;
