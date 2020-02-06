import { isObject } from './utils'

function normalizeHeaderName(header: any, normalizeName: string): void {
  if (!header) return
  Object.keys(header).forEach(key => {
    if (key !== normalizeName && key.toUpperCase() === normalizeName) {
      header[normalizeName] = header[key]
      delete header[key]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-type')
  if (isObject(data)) {
    if (headers && !headers['Content-type']) {
      headers['Content-type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parsedHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    if (val) val.trim()
    parsed[key] = val
  })
  return parsed
}
