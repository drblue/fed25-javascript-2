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

export const CAT_BREEDS = [{ "id": "abys", "name": "Abyssinian" }, { "id": "aege", "name": "Aegean" }, { "id": "abob", "name": "American Bobtail" }, { "id": "acur", "name": "American Curl" }, { "id": "asho", "name": "American Shorthair" }, { "id": "awir", "name": "American Wirehair" }, { "id": "amau", "name": "Arabian Mau" }, { "id": "amis", "name": "Australian Mist" }, { "id": "bali", "name": "Balinese" }, { "id": "bamb", "name": "Bambino" }, { "id": "beng", "name": "Bengal" }, { "id": "birm", "name": "Birman" }, { "id": "bomb", "name": "Bombay" }, { "id": "bslo", "name": "British Longhair" }, { "id": "bsho", "name": "British Shorthair" }, { "id": "bure", "name": "Burmese" }, { "id": "buri", "name": "Burmilla" }, { "id": "cspa", "name": "California Spangled" }, { "id": "ctif", "name": "Chantilly-Tiffany" }, { "id": "char", "name": "Chartreux" }, { "id": "chau", "name": "Chausie" }, { "id": "chee", "name": "Cheetoh" }, { "id": "csho", "name": "Colorpoint Shorthair" }, { "id": "crex", "name": "Cornish Rex" }, { "id": "cymr", "name": "Cymric" }, { "id": "cypr", "name": "Cyprus" }, { "id": "drex", "name": "Devon Rex" }, { "id": "dons", "name": "Donskoy" }, { "id": "lihu", "name": "Dragon Li" }, { "id": "emau", "name": "Egyptian Mau" }, { "id": "ebur", "name": "European Burmese" }, { "id": "esho", "name": "Exotic Shorthair" }, { "id": "hbro", "name": "Havana Brown" }, { "id": "hima", "name": "Himalayan" }, { "id": "jbob", "name": "Japanese Bobtail" }, { "id": "java", "name": "Javanese" }, { "id": "khao", "name": "Khao Manee" }, { "id": "kora", "name": "Korat" }, { "id": "kuri", "name": "Kurilian" }, { "id": "lape", "name": "LaPerm" }, { "id": "mcoo", "name": "Maine Coon" }, { "id": "mala", "name": "Malayan" }, { "id": "manx", "name": "Manx" }, { "id": "munc", "name": "Munchkin" }, { "id": "nebe", "name": "Nebelung" }, { "id": "norw", "name": "Norwegian Forest Cat" }, { "id": "ocic", "name": "Ocicat" }, { "id": "orie", "name": "Oriental" }, { "id": "pers", "name": "Persian" }, { "id": "pixi", "name": "Pixie-bob" }, { "id": "raga", "name": "Ragamuffin" }, { "id": "ragd", "name": "Ragdoll" }, { "id": "rblu", "name": "Russian Blue" }, { "id": "sava", "name": "Savannah" }, { "id": "sfol", "name": "Scottish Fold" }, { "id": "srex", "name": "Selkirk Rex" }, { "id": "siam", "name": "Siamese" }, { "id": "sibe", "name": "Siberian" }, { "id": "sing", "name": "Singapura" }, { "id": "snow", "name": "Snowshoe" }, { "id": "soma", "name": "Somali" }, { "id": "sphy", "name": "Sphynx" }, { "id": "tonk", "name": "Tonkinese" }, { "id": "toyg", "name": "Toyger" }, { "id": "tang", "name": "Turkish Angora" }, { "id": "tvan", "name": "Turkish Van" }, { "id": "ycho", "name": "York Chocolate" }];

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
