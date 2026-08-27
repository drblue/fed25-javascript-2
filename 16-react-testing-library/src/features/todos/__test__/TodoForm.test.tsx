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
});
