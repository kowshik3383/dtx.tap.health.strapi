import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// List of static file extensions and paths to skip
const STATIC_FILE_EXTENSIONS = [
	'.ico',
	'.png',
	'.jpg',
	'.jpeg',
	'.svg',
	'.webp',
	'.gif',
	'.css',
	'.js',
	'.woff',
	'.woff2',
	'.ttf',
	'.eot',
	'.otf',
	'.txt',
	'.xml',
	'.json',
	'.map',
	'.mp4',
	'.webm',
	'.ogg',
	'.mp3',
	'.pdf',
	'.zip',
	'.tar',
	'.gz',
	'.rar',
	'.7z',
	'.csv',
	'.md',
	'.yml',
	'.yaml',
	'.env',
	'.tsbuildinfo',
];
const STATIC_PATHS = ['/public', '/_next', '/favicon.ico', '/robots.txt'];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Skip static files by extension
	if (STATIC_FILE_EXTENSIONS.some(ext => pathname.endsWith(ext))) {
		return NextResponse.next();
	}

	// Skip static paths
	if (STATIC_PATHS.some(path => pathname.startsWith(path))) {
		return NextResponse.next();
	}

	// Otherwise, continue (could add custom logic here if needed)
	return NextResponse.next();
}

// Optionally, limit the middleware to only run on certain paths
export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico|robots.txt|.*\\.[a-z]+$).*)',
	],
};
