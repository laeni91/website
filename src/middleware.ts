import { defineMiddleware } from 'astro:middleware'

const PLATFORM_PREFIXES = ['/_vercel', '/_image', '/_astro', '/_server-islands', '/_fonts']

export const onRequest = defineMiddleware(({ url, redirect, request }, next) => {
  const { pathname } = url

  if (pathname === '/') return next()

  for (const prefix of PLATFORM_PREFIXES) {
    if (pathname.startsWith(prefix)) return next()
  }

  if (!pathname.endsWith('/')) {
    const target = pathname + '/' + (url.search || '')
    return redirect(target, 308)
  }

  return next()
})
