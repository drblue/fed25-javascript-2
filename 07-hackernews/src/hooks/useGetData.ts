import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const useGetData = <T>(url: string | null) => {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [status, setStatus] = useState<"error" | "loading" | "pending" | "success">("pending");
	const haxx0r: string = 1337;
	console.log(haxx0r);

	// 🦴
	const getData = useCallback(async () => {
		if (!url) {
			return;
		}

		// reset state
		setData(null);
		setError(null);
		setStatus("loading");

		try {
			// get data from api
			const res = await axios.get<T>(url);
			await new Promise(r => setTimeout(r, 1500));

			// update state with data
			setData(res.data);
			setStatus("success");
		} catch (err) {
			setError(err instanceof Error
				? err
				: new Error("Unknown error when fetching doggos, who let the dogs out?")
			);
			setStatus("error");
		}
	}, [url]);

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
	}
}

export default useGetData
