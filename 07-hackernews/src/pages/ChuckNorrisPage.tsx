import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import BorderSpinner from "../components/spinners/BorderSpinner";
import useChuckNorrisFact from "../hooks/useChuckNorrisFact";

const ChuckNorrisPage = () => {
	const { data, error, isError, isLoading, refetch } = useChuckNorrisFact();

	return (
		<>
			<h1>A totally true fact about Chuck Norris</h1>

			<div className="d-flex justify-content-center mb-4">
				<Button
					disabled={isLoading}
					onClick={refetch}
				>
					{isLoading
						? <BorderSpinner />
						: <>😎 Summon Chuck Norris</>
					}
				</Button>
			</div>

			{isError && <Alert variant="warning">{error!.message}</Alert>}

			<div className="mx-auto w-75">
				{data &&
					<p id="fact">{data.value}</p>
				}
			</div>
		</>
	)
}

export default ChuckNorrisPage;
