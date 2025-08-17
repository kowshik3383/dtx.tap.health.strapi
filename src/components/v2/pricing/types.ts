// types.ts
export interface Plan {
	title: string;
	price: number;
	duration: string;
	perMonth: string;
	recommended?: boolean;
	discount?: string;
}

export interface FeatureItem {
	icon: string;
	text: string;
}
