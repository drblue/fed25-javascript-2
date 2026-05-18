import axios from "axios";
import { useEffect, useState } from "react";
import type { RandomDogImage } from "../types/DogAPI.types";

const useGetRandomDogImage = (defaultUrl: string | null = null) => {
	const [data, setData] = useState<RandomDogImage | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(true);
	const [requestUrl, setRequestUrl] = useState<string | null>(defaultUrl);

	// 🦴
	const getData = async (resource: string) => {
		// reset state
		setData(null);
		setError(false);
		setIsLoading(true);

		try {
			// get data from api
			const res = await axios.get<RandomDogImage>(resource);
			await new Promise(r => setTimeout(r, 1500));

			// update state with data
			setData(res.data);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unknown error when fetching doggos, who let the dogs out?");
		} finally {
			setIsLoading(false);
		}
	}

	const setUrl = (url: string | null) => {
		setRequestUrl(url);
	}

	useEffect(() => {
		if (!requestUrl) {
			return;
		}

		// eslint-disable-next-line react-hooks/set-state-in-effect
		getData(requestUrl);
	}, [requestUrl]);

	return {
		data,
		error,
		isLoading,
		setUrl,
	}
}

export default useGetRandomDogImage
