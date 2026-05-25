export interface ProductsResponse {
	status: "fail" | "error" | "success";
	data: Product[];
}

export interface Product {
	id: number;
	name: string;
	price: number;
	on_sale: boolean;
	images: ProductImages;
	stock_status: "instock" | "outofstock";
	stock_quantity: number | null;
	tags: ProductTag[];
}

interface ProductImages {
	thumbnail: string;
	large: string;
}

interface ProductTag {
	id: number;
	name: string;
	slug: string;
}
