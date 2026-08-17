import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { UpdateProfileFormData } from "../types/Form.types";
import useAuth from "../hooks/useAuth";
import { getProfileMetadata } from "../lib/profile";
import { supabase } from "../lib/supabase";
import { toast } from "react-toastify";

const UpdateProfile = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const { currentUser } = useAuth();
	const profile = getProfileMetadata(currentUser);
	if (!currentUser) {
		throw new Error("You must be logged in to update your profile (duh...).");
	}

	const { handleSubmit, register, reset, resetField, watch, formState: { errors, isSubmitting } } = useForm<UpdateProfileFormData>({
		defaultValues: profile,
	});

	// Watch the selected filelist
	const photoFiles = watch("photoFiles");

	const onUpdateProfile: SubmitHandler<UpdateProfileFormData> = async (data) => {
		console.log("Will update user with:", data);
		let photo_url = profile.photo_url;

		// Check if user has selected a photo
		if (data.photoFiles && data.photoFiles.length > 0) {
			const file = data.photoFiles[0];

			// Construct file path
			const supabaseUploadPath = currentUser.id + "/profile/" + file.name;

			// Upload file to path
			const { error: uploadError, data: uploadData } = await supabase
				.storage
				.from("supabase-basics")
				.upload(supabaseUploadPath, file, {
					contentType: file.type,
					upsert: true,  // overwrite existing file (default behaviour is false)
				});

			if (uploadError) {
				setErrorMessage(uploadError.message);
				toast.error(`Error uploading photo: ${uploadError.message}`, { icon: () => "🙅‍♀️" });
				return;
			}

			const { data: { publicUrl } } = await supabase.storage.from("supabase-basics").getPublicUrl(supabaseUploadPath);
			photo_url = publicUrl;

			console.log("File uploaded:", uploadData, publicUrl);
		}

		// Update user metadata in Supabase
		const { error } = await supabase.auth.updateUser({
			data: {
				display_name: data.display_name,
				photo_url,
			},
		});

		// Handle any errors that may occur
		if (error) {
			setErrorMessage(error.message);
			toast.error(`Error: ${error.message}`, { icon: () => "⚠️" });
			return;
		}

		// Reset form back to its initial state
		reset();

		// If successful, show toast 🥂
		toast.success("🛟 Great profile!");
	}

	return (
		<Container className="py-4 center-y">
			<Row>
				<Col md={{ span: 8, offset: 2 }}>
					<Card className="mb-3">
						<Card.Body>
							<Card.Title className="mb-3">Update profile</Card.Title>

							{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

							<div className="profile-photo-container">
								<Image
									src={profile.photo_url || "https://dummyimage.com/500x500/222/fff&text=Y+U+NO+PHOTO+HAS?!"}
									fluid
									roundedCircle
									className="img-cover-1v1 w-75"
								/>
							</div>

							<Form className="mb-3" onSubmit={handleSubmit(onUpdateProfile)}>
								<Form.Group controlId="name" className="mb-3">
									<Form.Label>Name</Form.Label>
									<Form.Control
										autoComplete="name"
										isInvalid={!!errors.display_name}
										placeholder="Johnny Doe"
										type="text"
										{...register("display_name", {
											minLength: {
												message: "If you have a name, it has to be at least 3 characters long",
												value: 3,
											},
										})}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.display_name?.message || "Invalid value"}
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group controlId="photo_url" className="mb-3">
									<Form.Label>Photo</Form.Label>
									<Form.Control
										accept="image/heic,image/jpeg,image/webp"
										isInvalid={!!errors.photoFiles}
										type="file"
										{...register("photoFiles")}
									/>
									{photoFiles && photoFiles.length > 0 && (
										<Form.Text>
											{photoFiles[0].name}
											{" "}
											({Math.round(photoFiles[0].size / 1024)} kB)
											{" "}
											<span
												aria-description="Remove selected file"
												onClick={() => resetField("photoFiles")}
												role="button"
											>❌</span>
										</Form.Text>
									)}
									<Form.Control.Feedback type="invalid">
										{errors.photoFiles?.message || "Invalid value"}
									</Form.Control.Feedback>
								</Form.Group>

								<Button
									disabled={isSubmitting}
									type="submit"
									variant="primary"
								>
									{isSubmitting
										? "Saving..."
										: "Save"}
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default UpdateProfile;
