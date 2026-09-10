import fs from 'fs/promises'
import path from 'path'

const configPath = path.resolve('./.vercel/output/config.json')

async function patch() {
  try {
    const raw = await fs.readFile(configPath, 'utf-8')
    const config = JSON.parse(raw)

    const trailingSlashRoute = config.routes.find(
      (r) => r.src && r.status === 308 && r.src.includes('[^/\\.]+)$')
    )

    if (trailingSlashRoute && !trailingSlashRoute.src.includes('_vercel')) {
      trailingSlashRoute.src = trailingSlashRoute.src.replace(
        '^/(',
        '^/(?!_vercel|_image|_astro|_server-islands|_fonts)('
      )
      await fs.writeFile(configPath, JSON.stringify(config, null, '\t'))
      console.log('Patched Vercel routes: excluded platform paths from trailing slash redirect')
    } else {
      console.log('Vercel routes already patched or no trailing slash route found')
    }
  } catch (e) {
    console.warn('Could not patch Vercel routes:', e.message)
  }
}

patch()
