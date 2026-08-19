import type { UserAttributes } from "@supabase/supabase-js";
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
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import type { UpdateProfileFormData } from "../types/Form.types";
import { getProfileMetadata } from "../lib/profile";
import { supabase, supabaseStorageBucket, supabaseStorageMaxPhotoSizeMb } from "../lib/supabase";

const MAX_PHOTO_FILESIZE = Number(supabaseStorageMaxPhotoSizeMb) * 1024 * 1024;

const UpdateProfile = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const { currentUser } = useAuth();
	const profile = getProfileMetadata(currentUser);
	if (!currentUser) {
		throw new Error("You must be logged in to update your profile (duh...).");
	}

	const { handleSubmit, register, reset, resetField, watch, formState: { errors, isSubmitting } } = useForm<UpdateProfileFormData>({
		defaultValues: {
			display_name: profile.display_name,
			email: currentUser.email,
		},
	});

	// Watch the selected filelist
	const photoFiles = watch("photoFiles");

	const handleDeletePhoto = async () => {
		// Delete image from Supabase Storage bucket
		if (profile.photo_path) {
			const { error: removePhotoError } = await supabase.storage
				.from(supabaseStorageBucket)
				.remove([profile.photo_path]);

			if (removePhotoError) {
				setErrorMessage(removePhotoError.message);
				toast.error(`Error: Could not delete photo from storage`, { icon: () => "⚠️" });
				return;
			}
		}

		// Update user metadata in Supabase
		const { error } = await supabase.auth.updateUser({
			data: {
				photo_path: null,
				photo_url: null,
			},
		});

		// Handle any errors that may occur
		if (error) {
			setErrorMessage(error.message);
			toast.error(`Error: ${error.message}`, { icon: () => "⚠️" });
			return;
		}

		// If successful, show toast 🥂
		toast.success("🗑️ Photo deleted");
	}

	const onUpdateProfile: SubmitHandler<UpdateProfileFormData> = async (data) => {
		console.log("Will update user with:", data);
		let photo_path = profile.photo_path;
		let photo_url = profile.photo_url;

		// Check if user has selected a photo
		if (data.photoFiles && data.photoFiles.length > 0) {
			const file = data.photoFiles[0];

			// Construct file path
			const supabaseUploadPath = currentUser.id + "/profile/" + file.name;

			// Upload file to path
			const { error: uploadError, data: uploadData } = await supabase.storage
				.from(supabaseStorageBucket)
				.upload(supabaseUploadPath, file, {
					contentType: file.type,
					upsert: true,  // overwrite existing file (default behaviour is false)
				});

			if (uploadError) {
				setErrorMessage(uploadError.message);
				toast.error(`Error uploading photo: ${uploadError.message}`, { icon: () => "🙅‍♀️" });
				return;
			}

			const { data: { publicUrl } } = await supabase.storage.from(supabaseStorageBucket).getPublicUrl(supabaseUploadPath);
			photo_url = publicUrl;
			photo_path = supabaseUploadPath;

			// If the user already had a profile photo, delete the old photo from storage
			// But only after we're sure the new file has been successfully uploaded
			if (profile.photo_path) {
				const { error: removePreviousPhotoError } = await supabase.storage
					.from(supabaseStorageBucket)
					.remove([profile.photo_path]);

				if (removePreviousPhotoError) {
					toast.warning(`Could not delete previous photo from storage: ${removePreviousPhotoError.message}`, { icon: () => "😳" });
				}
			}

			console.log("File uploaded:", uploadData, publicUrl);
		}

		const userAttributes: UserAttributes = {
			data: {
				display_name: data.display_name,
				photo_path,
				photo_url,
			},
		}

		// Has the user changed email?
		if (data.email !== currentUser.email) {
			userAttributes.email = data.email;
		}

		// Does the user want to change password?
		if (data.newPassword) {
			userAttributes.password = data.newPassword;
		}

		console.log("💾 Supabase user attributes to save:", userAttributes);

		// Update user metadata in Supabase
		const { data: { user: updatedUser }, error } = await supabase.auth.updateUser(userAttributes);

		// Handle any errors that may occur
		if (error) {
			const message = error.code === "reauthentication_needed"
				? "You need to log in again before changing your password."
				: error.message;

			setErrorMessage(message);
			toast.error(`Error: ${message}`, { icon: () => "⚠️" });
			return;
		}

		// Reset form back to its initial state
		reset({
			display_name: getProfileMetadata(updatedUser).display_name,
			email: currentUser.email,
			photoFiles: null,
			newPassword: "",
			confirmNewPassword: "",
		});

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

							<div className="text-center mb-3">
								<div className="profile-photo-container">
									<Image
										src={profile.photo_url || "https://dummyimage.com/500x500/222/fff&text=Y+U+NO+PHOTO+HAS?!"}
										fluid
										roundedCircle
										className="img-cover-1v1 w-75"
									/>
								</div>
								{profile.photo_url && (
									<Button
										onClick={handleDeletePhoto}
										size="sm"
										variant="danger"
									>Delete photo</Button>
								)}
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

								<Form.Group controlId="email" className="mb-3">
									<Form.Label>Email</Form.Label>
									<Form.Control
										autoComplete="email"
										isInvalid={!!errors.email}
										placeholder="snelhest2000@horsemail.com"
										type="email"
										{...register("email", {
											required: "You have to enter an email 🤦🏻",
										})}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.email?.message || "Invalid value"}
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group controlId="photo_url" className="mb-3">
									<Form.Label>Photo</Form.Label>
									<Form.Control
										accept="image/heic,image/jpeg,image/webp"
										isInvalid={!!errors.photoFiles}
										type="file"
										{...register("photoFiles", {
											validate: (files) => {
												if (!files?.length || files[0].size <= MAX_PHOTO_FILESIZE) {
													return true;
												}

												return `Photo must be ${supabaseStorageMaxPhotoSizeMb} MB or smaller`;
											},
										})}
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

								<Form.Group controlId="password" className="mb-3">
									<Form.Label>New Password</Form.Label>
									<Form.Control
										isInvalid={!!errors.newPassword}
										type="password"
										autoComplete="new-password"
										{...register("newPassword", {
											minLength: {
												message: "It said to ENTER AT LEAST 6 CHARACTERS, can't read, can we?",
												value: 6,
											},
										})}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.newPassword?.message || "Invalid value"}
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group controlId="confirmPassword" className="mb-3">
									<Form.Label>Confirm New Password</Form.Label>
									<Form.Control
										isInvalid={!!errors.confirmNewPassword}
										type="password"
										autoComplete="off"
										{...register("confirmNewPassword", {
											minLength: {
												message: "It said to ENTER AT LEAST 6 CHARACTERS, can't read, can we?",
												value: 6,
											},
											validate: (value, formData) => {
												return value === formData.newPassword || "The passwords do not match 🤦🏻";
											},
										})}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.confirmNewPassword?.message || "Invalid value"}
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
