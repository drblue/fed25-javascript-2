import Container from "react-bootstrap/Container";
import Counter from "../../components/Counter";

const CounterPage = () => {
	return (
		<Container className="py-3">
			<h1>Counter</h1>

			<div className="mb-5">
				<h2>Home</h2>
				<Counter />
			</div>

			<div className="mb-5">
				<h2>Away</h2>
				<Counter />
			</div>
		</Container>
	);
};

export default CounterPage;
