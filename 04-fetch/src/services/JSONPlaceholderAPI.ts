import type { Resource } from "../types/Resource";

export const getResource = async (resource: string) => {
	// fetch resource
	const res = await fetch("https://jsonplaceholder.typicode.com/" + resource);

	// make sure request was ok ☺️
	if (!res.ok) {
		throw new Error("Response was not OK 🥴");
	}

	// parse response from json
	const body: Resource[] = await res.json();

	// fake slow api
	await new Promise(r => setTimeout(r, 2500));

	return body;
}
