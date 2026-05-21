import type { RandomChuckNorrisJoke } from "../types/ChuckNorrisAPI.types";
import useGetData from "./useGetData";

const useChuckNorrisFact = () => {
	return useGetData<RandomChuckNorrisJoke>("https://api.chucknorris.io/jokes/random");
}

export default useChuckNorrisFact;
