import { components } from "@/types/strapi";

export function optimisedImageUrl(image: components['schemas']['SharedImageTextComponent']['image']) {
    if (!image || !image.url) return '';
    const actual_url = image.url;
    const formats_ = image.formats as {
        thumbnail?: {url : string},
        small?: {url : string},
        medium?: {url : string},
        large?: {url : string},
    } | undefined;
    const optimisedImageUrl = formats_?.small?.url || formats_?.medium?.url || formats_?.large?.url || actual_url;
    console.log('Optimised image URL:', optimisedImageUrl);
    return optimisedImageUrl;
}