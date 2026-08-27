import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TodoForm from "../TodoForm";
import { renderWithUserInteraction } from "../../../tests/render-utils";

const mockOnSave = async () => {}
const todoTitle = "This is my todo title";

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

	it("Can type into input field", async () => {
		// Render/arrange (with interaction)
		const { user } = renderWithUserInteraction(<TodoForm onSave={mockOnSave} />);

		// Find/act
		const inputElement = screen.getByRole("textbox");

		// (Interact)
		await user.type(inputElement, todoTitle);

		// Assert
		expect(inputElement).toHaveValue(todoTitle);
	});
});
