import { useIsFetching } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";

const GlobalLoadingSpinner = () => {
	const isFetching = useIsFetching();

	return isFetching
		? <LoadingSpinner />
		: null;
}

export default GlobalLoadingSpinner;
