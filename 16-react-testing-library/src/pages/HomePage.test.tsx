import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./HomePage";

describe("HomePage", () => {
	it("Welcomes the user on the home page", () => {
		// Render/arrange
		render(<HomePage />);

		// Find/act
		// const headingEl = screen.getByText("Welcome!");
		// const headingEl = screen.getByRole("heading");  // will fail because two headings exist
		// const headingEl = screen.getByRole("heading", { name: "Welcome!" });
		const headingEl = screen.getByRole("heading", { level: 1 });

		// Assert
		// expect(headingEl).toBeInTheDocument();
		// expect(headingEl).toBeInTheDocument();  // tests only that we have A heading, not the content
		expect(headingEl).toHaveTextContent("Welcome!");
	});
});
