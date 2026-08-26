import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useAppDispatch } from "../../app/hooks";
import { deposit, withdraw } from "./accountSlice";

const AccountButtons = () => {
	const dispatch = useAppDispatch();

	return (
		<ButtonGroup>
			<Button variant="danger" onClick={() => dispatch( withdraw() )}>
				Withdraw
			</Button>
			<Button variant="success" onClick={() => dispatch( deposit() )}>
				Deposit
			</Button>
		</ButtonGroup>
	)
}

export default AccountButtons;
