import type { RandomDogImage } from "../types/DogAPI.types";
import useGetData from "./useGetData"

/**
 * Dog API URLs
 *
 * Random breed: https://dog.ceo/api/breeds/image/random
 * Specific breed: https://dog.ceo/api/breed/{BREED}/images/random
 */
const getImageUrl = (breed: string | null) => {
	if (breed === null) {
		return null;
	}

	return breed === "random"
		? "https://dog.ceo/api/breeds/image/random"
		: `https://dog.ceo/api/breed/${breed}/images/random`;
}

const useGetRandomDogImage = (breed: string | null = null) => {
	const url = getImageUrl(breed);

	return useGetData<RandomDogImage>(url);
}

export default useGetRandomDogImage;
