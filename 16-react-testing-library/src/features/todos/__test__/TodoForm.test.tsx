import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TodoForm from "../TodoForm";

const mockOnSave = async () => {}

describe("Todo Form", () => {
	it("Renders input field initially empty", () => {
		// Render/arrange
		render(<TodoForm onSave={mockOnSave} />);

		// Find/act
		const inputElement = screen.getByRole("textbox");

		// Assert
		expect(inputElement).toHaveValue("");
		// expect(inputElement).not.toHaveValue();
	});

	it("Can type into input field", () => {
		// Render/arrange
		render(<TodoForm onSave={mockOnSave} />);

		// Find/act
		const inputElement = screen.getByRole<HTMLInputElement>("textbox");
		inputElement.value = "LOlolololol";

		// Assert
		expect(inputElement).toHaveValue("LOlolololol");
		// expect(inputElement).not.toHaveValue();
	});
});
