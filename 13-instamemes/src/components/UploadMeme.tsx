import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { supabase, supabaseStorageBucket, supabaseStorageMaxPhotoSizeMb } from "../lib/supabase";
import type { UploadMemeFormData } from "../types/Form.types";

const MAX_PHOTO_FILESIZE = Number(supabaseStorageMaxPhotoSizeMb) * 1024 * 1024;

interface UploadMemeProps {
	onUploadSuccess?: () => void;
}

const UploadMeme = ({ onUploadSuccess = () => {} }: UploadMemeProps) => {
	const { handleSubmit, register, reset, resetField, watch, formState: { errors, isSubmitting, isValid } } = useForm<UploadMemeFormData>();
	const { currentUser } = useAuth();

	if (!currentUser) {
		return null;
	}

	// Watch file input field
	const images = watch("images");

	const onUploadMeme: SubmitHandler<UploadMemeFormData> = async ({ title, images }) => {
		console.log("Will (maybe) upload meme:", title, images);

		if (!images || !images.length) {
			return;
		}

		const image = images[0];

		// Upload image to Supabase Storage bucket
		const path = `${currentUser.id}/${Date.now()}-${image.name}`;
		const { error: uploadError } = await supabase.storage
			.from(supabaseStorageBucket)
			.upload(path, image);

		if (uploadError) {
			toast.error(`Uppladdningen misslyckades: ${uploadError.message}`);
			return;
		}

		// Get public URL to uploaded image
		const { data: { publicUrl } } = await supabase.storage.from(supabaseStorageBucket).getPublicUrl(path);

		// Create entry in Supabase Database table
		const { error: databaseError } = await supabase.from("memes").insert({
			user_id: currentUser.id,
			name: image.name,
			title: title || null,
			size: image.size,
			type: image.type,
			path,
			public_url: publicUrl,
		});

		if (databaseError) {
			// Delete uploaded image from Supabase Storage bucket
			await supabase.storage.from(supabaseStorageBucket).remove([path]);
			toast.error(`Uppladdningen misslyckades: ${databaseError.message}`);
			return;
		}

		// Let parent know that the upload was successful
		onUploadSuccess();

		// Toast 🥂 + 🧹
		toast.success("That was a good one!", { icon: () => "😂" });
		reset();
	}

	return (
		<Form className="mb-3" onSubmit={handleSubmit(onUploadMeme)}>
			{/* Title */}
			<Form.Group controlId="title" className="mb-3">
				<Form.Label>Title</Form.Label>
				<Form.Control
					isInvalid={!!errors.title}
					placeholder="This is the funniest meme of all time"
					type="text"
					{...register("title", {
						minLength: {
							message: "If you want a title, it has to be at least 3 characters long",
							value: 3,
						},
					})}
				/>
				<Form.Control.Feedback type="invalid">
					{errors.title?.message || "Invalid value"}
				</Form.Control.Feedback>
			</Form.Group>

			{/* File */}
			<Form.Group controlId="images" className="mb-3">
				<Form.Label>Välj meme</Form.Label>
				<Form.Control
					accept="image/gif,image/heic,image/jpeg,image/png,image/webp"
					isInvalid={!!errors.images}
					type="file"
					{...register("images", {
						validate: (files) => {
							if (!files?.length || files[0].size <= MAX_PHOTO_FILESIZE) {
								return true;
							}

							return `Photo must be ${supabaseStorageMaxPhotoSizeMb} MB or smaller`;
						},
					})}
				/>
				<div><Form.Text>GIF, HEIC, JPEG, PNG eller WebP. Högst 4 MB.</Form.Text></div>
				{images && images.length > 0 && (
					<div>
						<Form.Text>
							{images[0].name}
							{" "}
							({Math.round(images[0].size / 1024)} kB)
							{" "}
							<span
								aria-description="Remove selected file"
								onClick={() => resetField("images")}
								role="button"
							>❌</span>
						</Form.Text>
					</div>
				)}
				<Form.Control.Feedback type="invalid">
					{errors.images?.message || "Invalid value"}
				</Form.Control.Feedback>
			</Form.Group>

			<Button
				disabled={!isValid || isSubmitting}
				type="submit"
			>
				{isSubmitting ? "Laddar upp..." : "Ladda upp"}
			</Button>
		</Form>
	)
}

export default UploadMeme;
