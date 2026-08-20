import { useEffect, useState } from "react";
import type { Meme } from "../types/Meme.types";
import { supabase } from "../lib/supabase";

const useMemes = () => {
	const [error, setError] = useState<Error | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [memes, setMemes] = useState<Meme[] | null>(null);

	const getMemes = async () => {
		// Reset state
		setError(null);
		setIsLoading(true);

		// Get memes from the `memes` table
		const { data, error } = await supabase
			.from("memes")
			.select()
			.order("created_at", { ascending: false });

		if (error) {
			setError(error);
			setMemes(null);
		} else {
			setMemes(data);
		}

		setIsLoading(false);
	}

	useEffect(() => {
		getMemes();
	}, []);

	return {
		getMemes,
		error,
		isLoading,
		memes,
	}
}

export default useMemes;
