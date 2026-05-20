import type { RandomDogImage } from "../types/DogAPI.types";
import useGetData from "./useGetData"

const useGetRandomDogImage = (url: string | null) => {
	return useGetData<RandomDogImage>(url);
}

export default useGetRandomDogImage;
