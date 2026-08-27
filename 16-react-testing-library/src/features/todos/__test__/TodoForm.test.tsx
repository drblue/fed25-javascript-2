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

	it("Empties input field after clicking pressing <Enter>", async () => {
		// Render/arrange (with interaction)
		const { user } = renderWithUserInteraction(<TodoForm onSave={mockOnSave} />);

		// Find/act
		const inputElement = screen.getByRole("textbox");

		// (Interact)
		await user.type(inputElement, todoTitle);
		await user.type(inputElement, "{Enter}");

		// Assert
		expect(inputElement).toHaveValue("");
	});
});

describe("Todo Form validation", () => {
	it("Shows validation error if input is empty", async () => {
		// Render (with user interaction)
		const { user } = renderWithUserInteraction(<TodoForm onSave={mockOnSave} />);

		// Find
		const inputElement = screen.getByRole("textbox");

		// Interact
		await user.type(inputElement, "{Enter}");

		// Find (again)
		const validationErrorElement = screen.getByRole("paragraph");

		// Assert
		expect(validationErrorElement).toHaveTextContent(/you have to write something/i);
	});

	it("Shows validation error if input is too short", async () => {
		// Render (with user interaction)
		const { user } = renderWithUserInteraction(<TodoForm onSave={mockOnSave} />);

		// Find
		const inputElement = screen.getByRole("textbox");

		// Interact
		await user.type(inputElement, "LOL");
		await user.type(inputElement, "{Enter}");

		// Find (again)
		const validationErrorElement = screen.getByRole("paragraph");

		// Assert
		expect(validationErrorElement).toHaveTextContent(/too short/i);
	});

	it("Does not show validation error if input is valid", async () => {
		// Render (with user interaction)
		const { user } = renderWithUserInteraction(<TodoForm onSave={mockOnSave} />);

		// Find
		const inputElement = screen.getByRole("textbox");

		// Interact
		await user.type(inputElement, todoTitle);
		await user.type(inputElement, "{Enter}");

		// Find (again)
		const validationErrorElement = screen.queryByRole("paragraph");

		// Assert
		expect(validationErrorElement).not.toBeInTheDocument();
	});
});
