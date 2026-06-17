import { CollectionReference, getDocs } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

const useGetCollection = <T>(colRef: CollectionReference<T>) => {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState<T[] | null>(null);

	const getData = useCallback(async () => {
		setData(null);
		setIsLoading(true);

		// Get query snapshot of collection
		const snapshot = await getDocs(colRef);

		// Map over all documents and extract the data
		const documents = snapshot.docs.map(doc => {
			return {
				...doc.data(),
				_id: doc.id,
			};
		});

		setData(documents);
		setIsLoading(false);
	}, [colRef]);

	useEffect(() => {
		(() => {
			getData();
		})();
	}, [getData]);

	return {
		data,
		getData,
		isLoading,
	}
}

export default useGetCollection;
