export type LoginFormData = {
	email: string;
	password: string;
}

export type SignupFormData = {
	email: string;
	password: string;
	confirmPassword: string;
}

export type UpdateProfileFormData = {
	display_name: string;
	photoFiles: FileList;
}
