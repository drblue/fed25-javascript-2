/**
 * Bortakväll API
 *
 * <https://www.bortakvall.se/api/v2/>
 */
import axios from "axios";
import type { ProductResponse, ProductsResponse } from "./BortakvallAPI.types";

// Create Axios instance
const http = axios.create({
	baseURL: "https://www.bortakvall.se/api/v2",
	timeout: 10000,
});

/**
 * Generic HTTP GET method
 *
 * @param endpoint Endpoint to GET
 */
const get = async <T>(endpoint: string) => {
	const res = await http.get<T>(endpoint);

	// Fake slow api 🐢
	await new Promise(r => setTimeout(r, 1000));

	return res.data;
}

/**
 * Get all products
 *
 */
export const getProducts = async () => {
	const body = await get<ProductsResponse>("/products");
	if (body.status !== "success") {
		throw new Error("No success");
	}
	return body.data;
}

/**
 * Get a product
 *
 */
export const getProduct = async (id: number) => {
	const body = await get<ProductResponse>("/products/" + id);
	if (body.status !== "success") {
		throw new Error("No success");
	}
	return body.data;
}
