import Spinner from "react-bootstrap/Spinner";

const BorderSpinner = () => {
	return (
		<>
			<Spinner
				animation="border"
				as="span"
				role="status"
				size="sm"
			>
			</Spinner>
			{" "}
			<span className="loading-text">Loading...</span>
		</>
	)
}

export default BorderSpinner;
