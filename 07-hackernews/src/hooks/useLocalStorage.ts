import { useState } from "react";

const useLocalStorage = <T>(key: string, defaultValue: T): [T, (newValue: T) => void] => {
	const [storedValue, setStoredValue] = useState<T>(() => {
		// Get initial state from localStorage
		const value = window.localStorage.getItem(key);

		return value !== null
			? JSON.parse(value)
			: defaultValue;
	});

	const setValue = (newValue: T) => {
		// Set new state
		setStoredValue(newValue);

		// Save new value to localStorage
		window.localStorage.setItem(key, JSON.stringify(newValue));
	}

	return [
		storedValue,
		setValue,
	];
}

export default useLocalStorage;
