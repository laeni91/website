export default function withTrailingSlash(path) {
  if (!path) return '/'
  return path.endsWith('/') ? path : path + '/'
}
