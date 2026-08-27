import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

/**
 * Render a component with React Router context
 *
 * @param ui Component to render
 * @param param1 Route options
 */
export const renderWithRouter = (ui: React.ReactNode, { route = "/" } = {}) => {
	return render(
		<MemoryRouter initialEntries={[route]}>
			{ui}
		</MemoryRouter>
	);
}

/**
 * Render a component with user interaction
 *
 * @param ui Component to render
 */
export const renderWithUserInteraction = (ui: React.ReactNode) => {
	return {
		user: userEvent.setup(),
		...render(ui),
	}
}
