import { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

interface ConfirmDeleteButtonProps {
	onConfirm: () => void;
}

const ConfirmDeleteButton: React.FC<ConfirmDeleteButtonProps> = ({ onConfirm }) => {
	const [showConfirm, setShowConfirm] = useState(false);

	return showConfirm
		? (
			<ButtonGroup>
				<Button
					onClick={onConfirm}
					variant="primary"
				>Confirm Delete</Button>

				<Button
					onClick={() => setShowConfirm(false)}
					variant="secondary"
				>Cancel</Button>
			</ButtonGroup>
		) : (
			<Button
				onClick={() => setShowConfirm(true)}
				variant="danger"
			>Delete</Button>
		)
}

export default ConfirmDeleteButton;
