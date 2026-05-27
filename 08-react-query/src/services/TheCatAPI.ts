/**
 * The Cat API
 *
 * <https://thecatapi.com/>
 * <https://developers.thecatapi.com/>
 */
import axios from "axios";
import type { CatImage } from "./TheCatAPI.types";

const API_KEY = import.meta.env.VITE_CATAPI_KEY;
const FAKE_DELAY = 2500;

export const CAT_BREEDS = [
	{ id: "", name: "Any" },
	{ id: "ragd", name: "Ragdoll" },
	{ id: "sibe", name: "Siberian" },
	{ id: "beng", name: "Bengal" },
	{ id: "pers", name: "Persian" },
];

if (!API_KEY) {
	throw new Error("VITE_CATAPI_KEY missing in environment variables");
}

// Create Axios instance
const http = axios.create({
	baseURL: "https://api.thecatapi.com/v1",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
		"x-api-key": API_KEY,
	},
});

/**
 * Generic HTTP GET method
 *
 * @param endpoint Endpoint to GET
 */
const get = async <T>(endpoint: string) => {
	const res = await http.get<T>(endpoint);

	// Fake slow api 🐢
	if (FAKE_DELAY) {
		await new Promise(r => setTimeout(r, FAKE_DELAY));
	}

	return res.data;
}

/**
 * Get a random cat image
 */
export const getRandomCatImage = async (breed_id = "") => {
	const data = await get<CatImage[]>("/images/search?breed_ids=" + breed_id);
	/*
	const fail = Math.random() > 0.2;
	if (fail) {
		throw new Error("The Cat has you!");
	}
	*/
	return data[0];
}
