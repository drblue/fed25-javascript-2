import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import type { RandomDogImage } from "../types/DogAPI.types";

const useGetRandomDogImage = (defaultUrl: string | null = null) => {
	const [data, setData] = useState<RandomDogImage | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [status, setStatus] = useState<"error" | "loading" | "pending" | "success">("pending");
	const [requestUrl, setRequestUrl] = useState<string | null>(defaultUrl);

	// 🦴
	const getData = useCallback(async () => {
		if (!requestUrl) {
			return;
		}

		// reset state
		setData(null);
		setError(null);
		setStatus("loading");

		try {
			// get data from api
			const res = await axios.get<RandomDogImage>(requestUrl);
			await new Promise(r => setTimeout(r, 1500));

			// update state with data
			setData(res.data);
		} catch (err) {
			setError(err instanceof Error
				? err
				: new Error("Unknown error when fetching doggos, who let the dogs out?")
			);
			setStatus("error");
		} finally {
			setStatus("success");
		}
	}, [requestUrl]);

	const setUrl = (url: string | null) => {
		setRequestUrl(url);
	}

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		getData();
	}, [getData]);

	return {
		data,
		error,
		isError: status === "error",
		isLoading: status === "loading",
		isPending: status === "pending",
		isSuccess: status === "success",
		refetch: getData,
		setUrl,
	}
}

export default useGetRandomDogImage
