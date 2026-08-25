import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const AccountButtons = () => {
	return (
		<ButtonGroup>
			<Button variant="success" onClick={() => null}>
				Deposit
			</Button>
			<Button variant="warning" onClick={() => null}>
				Withdraw
			</Button>
		</ButtonGroup>
	)
}

export default AccountButtons;
