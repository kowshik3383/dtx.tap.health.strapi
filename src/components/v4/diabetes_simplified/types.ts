export type DescPart =
	| string
	| {
			text: string;
			bold?: boolean;
			blue?: boolean;
	  };
export interface Card {
	img1: string;
	img2: string;
	img1Styles: string;
	img2Styles: string;
	title: string;
	subtitle: string;
	descParts: DescPart[];
	videoSrc: string;
}
