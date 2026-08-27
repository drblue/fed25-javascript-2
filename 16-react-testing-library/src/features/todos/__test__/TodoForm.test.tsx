import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TodoForm from "../TodoForm";
import { renderWithUserInteraction } from "../../../tests/render-utils";
import { act } from "react";

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

	it("Empties input field after clicking on the 'Save' button", async () => {
		// Render/arrange (with interaction)
		const { user } = renderWithUserInteraction(<TodoForm onSave={mockOnSave} />);

		// Find/act
		const inputElement = screen.getByRole("textbox");
		const btnSaveElement = screen.getByRole("button", { name: /save/i });  // Since we have two buttons, we have to say which one we want

		// (Interact)
		await user.type(inputElement, todoTitle);
		await user.click(btnSaveElement);

		// Interact the React way (so any useEffects are executed before continuing)
		/*
		await act(async () => {
			await user.type(inputElement, todoTitle);
			await user.click(btnSaveElement);
		});
		*/

		// Assert
		expect(inputElement).toHaveValue("");
	});
});
