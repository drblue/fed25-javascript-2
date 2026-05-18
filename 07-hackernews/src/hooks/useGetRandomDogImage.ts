import axios from "axios";
import { useEffect, useState } from "react";
import type { RandomDogImage } from "../types/DogAPI.types";

const useGetRandomDogImage = () => {
	const [data, setData] = useState<RandomDogImage | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(true);

	// 🦴
	const getData = async () => {
		// reset state
		setData(null);
		setIsLoading(true);

		try {
			// get data from api
			const res = await axios.get<RandomDogImage>("https://dog.ceo/api/breeds/image/random");
			await new Promise(r => setTimeout(r, 1500));

			// update state with data
			setData(res.data);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unknown error when fetching doggos, who let the dogs out?");
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		getData();
	}, []);

	return {
		data,
		error,
		isLoading,
	}
}

export default useGetRandomDogImage
