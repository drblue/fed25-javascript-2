import { CollectionReference, doc, getDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

const useGetDocument = <T>(colRef: CollectionReference<T>, id: string | undefined) => {
	const [error, setError] = useState<Error | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState<T | null>(null);

	const getData = useCallback(async (docId: string) => {
		setError(null);
		setData(null);
		setIsLoading(true);

		// Get reference to document in collection
		// and a snapshot of the document
		const docRef = doc(colRef, docId);
		const snapshot = await getDoc(docRef);

		// Check if document actually existed
		if (!snapshot.exists()) {
			setError(new Error("Document not found"));
			setIsLoading(false);
			return;
		}

		// Transform document
		const document = {
			...snapshot.data(),
			_id: snapshot.id,
		}

		setData(document);
		setIsLoading(false);
	}, [colRef]);

	useEffect(() => {
		if (!id) {
			return;
		}

		(() => {
			getData(id);
		})();
	}, [getData, id]);

	return {
		data,
		error,
		getData,
		isLoading,
	}
}

export default useGetDocument;
