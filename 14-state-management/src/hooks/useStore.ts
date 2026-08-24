import { useContext } from "react";
import { StoreContext } from "../contexts/StoreContext";

const useStore = () => {
	const storeContext = useContext(StoreContext);
	if (!storeContext) {
		throw new Error("Trying to access StoreContext outside of StoreContextProvider")
	}

	return storeContext;
}

export default useStore;
