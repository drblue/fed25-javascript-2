import type { User } from "@supabase/supabase-js";

type ProfileMetadata = {
	display_name?: string;
	photo_url?: string;
}

export const getProfileMetadata = (user: User | null) => {
	const metadata: ProfileMetadata = user?.user_metadata ?? {};

	return {
		display_name: metadata.display_name ?? "",
		photo_url: metadata.photo_url ?? "",
	};
}
