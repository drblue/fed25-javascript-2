export interface ApiResponse<T> {
	status: "fail" | "error" | "success";
	data: T;
}

export type ProductsResponse = ApiResponse<Product[]>;
export type ProductResponse = ApiResponse<ProductDetail>;

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

export interface ProductDetail extends Product {
	description: string;
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
