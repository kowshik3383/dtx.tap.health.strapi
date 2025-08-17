import { revalidatePath, revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server'
 
export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');
  const path = request.nextUrl.searchParams.get('path');
  const revalidate_secret = request.nextUrl.searchParams.get('secret');
  // console.log('Revalidation request received:', { tag, path, revalidate_secret });/
  if(!revalidate_secret || revalidate_secret !== process.env.REVALIDATION_SECRET) {
    return Response.json({ error: 'Invalid or missing secret' }, { status: 403 })
  }
  if(tag){
    revalidateTag(tag)
  }
  if(path){
    if(path==='/'){
      revalidatePath('/')
    }else{
      revalidatePath(`/${path}`)
    }

  }
  if(!path && !tag){
    return Response.json({ error: 'No tag or path provided' }, { status: 400 })
  }
  return Response.json({ revalidated: true, now: Date.now(), tag:tag, path:path })
  
}