import { dev } from '$app/env';
import type { Handle } from '@sveltejs/kit/hooks';

export const handle: Handle = async ({ event }) => {
  const url = dev ? 'http://localhost:3000' : 'https://safira.me';
  return Response.redirect(`${url}/doodles${event.url.pathname}`, 308);
};
