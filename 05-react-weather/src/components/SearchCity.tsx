import { useState } from "react";

interface SearchCityProps {
	onSearch: (location: string) => void;
}

const SearchCity: React.FC<SearchCityProps> = ({ onSearch }) => {
	const [city, setCity] = useState("");
	const trimmedCity = city.trim();

	const handleSubmit = (e: React.SubmitEvent) => {
		e.preventDefault();

		// Pass `city` to parent component (App)
		onSearch(trimmedCity);

		// Clear `city` state
		setCity("");
	}

	const tooFewCharacters = trimmedCity.length > 0 && trimmedCity.length < 3;

	return (
		<div id="search-wrapper">
			<form onSubmit={handleSubmit} id="search-form">
				<div className="input-group">
					<input
						type="text"
						className="form-control"
						placeholder="Enter city to search for"
						aria-label="City"
						aria-details="Search for city to show current weather for."
						onChange={e => setCity(e.target.value)}
						value={city}
						minLength={3}
						required
					/>

					<button
						className="btn btn-success"
						disabled={city.trim().length < 3}
						type="submit"
					>
						🔍
					</button>
				</div>

				{tooFewCharacters &&
					<div className="form-text text-danger">
						Please enter at least 3 characters
					</div>
				}
			</form>
		</div>
	);
};

export default SearchCity;
