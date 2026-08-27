import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TodoCounter from "../TodoCounter";

describe("Todo Counter", () => {
	it("Shows correct count with no todos", () => {
		// Render/arrange
		render(<TodoCounter count={0} />);

		// Find/act
		const textElement = screen.getByText(/0 todos/i);  // 🙂

		// Assert
		expect(textElement).toBeVisible();
	});

	it("Shows correct count with a single todo", () => {
		// Render/arrange
		render(<TodoCounter count={1} />);

		// Find/act
		const textElement = screen.getByRole("paragraph");  // 😃

		// Assert
		expect(textElement).toHaveTextContent(/1 todo /i);  // important whitespace!
	});

	it("Shows correct count with multiple todos", () => {
		// Render/arrange
		render(<TodoCounter count={5} />);

		// Find/act
		const textElement = screen.getByTestId("todo-counter");  // 😑

		// Assert
		expect(textElement).toHaveTextContent(/5 todos/i);
	});
});
