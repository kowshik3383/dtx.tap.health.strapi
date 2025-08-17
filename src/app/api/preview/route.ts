import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  // Parse query string parameters
 const { searchParams } = new URL(request.url);
	const secret = searchParams.get('secret');
	const slug = searchParams.get('slug');
	const uid = searchParams.get('uid');
	const status = searchParams.get('status');

  // Check the secret and next parameters
  // This secret should only be known to this route handler and the CMS
  if (secret !== process.env.PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }
  const contentType = uid?.split('.').pop();

	// Specific for the application
	let slugToReturn = `/${contentType}`;

	if (contentType === 'page' || contentType === 'global') {
		if (slug && slug !== 'homepage') {
			slugToReturn = `/${slug}`;
		} else {
			slugToReturn = `/strapi`;
		}
	}
	const draft = await draftMode();
	if (status === 'draft') {
		draft.enable();
	} else {
		draft.disable();
	}
	redirect(slugToReturn);
}