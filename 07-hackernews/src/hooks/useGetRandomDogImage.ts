import type { RandomDogImage } from "../types/DogAPI.types";
import useGetData from "./useGetData"

/**
 * Dog API URLs
 *
 * Random breed: https://dog.ceo/api/breeds/image/random
 * Specific breed: https://dog.ceo/api/breed/{BREED}/images/random
 */
const useGetRandomDogImage = (breed: string | null = null) => {
	const url = breed
		? `https://dog.ceo/api/breed/${breed}/images/random`
		: "https://dog.ceo/api/breeds/image/random";

	return useGetData<RandomDogImage>(url);
}

export default useGetRandomDogImage;
