import type { ComponentProps } from "react";
import Spinner from "react-bootstrap/Spinner";

interface BorderSpinnerProps extends ComponentProps<"div"> {
	text?: string;
}

const BorderSpinner: React.FC<BorderSpinnerProps> = ({ text, ...props }) => {
	return (
		<div {...props}>
			<Spinner
				animation="border"
				as="span"
				role="status"
				size="sm"
			>
			</Spinner>
			{" "}
			<span className="loading-text">
				{text ?? "Loading..."}
			</span>
		</div>
	)
}

export default BorderSpinner;
