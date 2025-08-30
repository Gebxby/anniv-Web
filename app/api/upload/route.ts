import { put } from '@vercel/blob';
 
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('anniv.mp4');
  if (!filename) {
    return new Response('Missing "anniv.mp4" query parameter', { status: 400 });
  }
 
  if (!request.body) {
    return new Response('Missing request body', { status: 400 });
  }
  const blob = await put(filename, request.body, {
    access: 'public',
    addRandomSuffix: true
  });
 
  return Response.json(blob);
}