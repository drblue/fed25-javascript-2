import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

const ChuckNorrisPage = () => {
	return (
		<>
			<h1>A totally true fact about Chuck Norris</h1>

			<div className="d-flex justify-content-center mb-4">
				<Button>
					😎 Summon Chuck Norris
				</Button>
			</div>

			{<Alert variant="warning">ERROR</Alert>}

			<div className="mx-auto w-75">
				<p id="fact">FACT</p>
			</div>
		</>
	)
}

export default ChuckNorrisPage;
