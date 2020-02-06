import { isDate, isObject } from './utils'

function encode(val: string): string {
  return encodeURIComponent(val)
}

export function buildUrl(url: string, params?: any): string {
  if (!params) return url
  const parts: string[] = []
  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) val = val.toISOString()
      else if (isObject(val)) val = JSON.stringify(val)
      parts.push(`${key}=${val}`)
    })
  })
  let serializedParams = parts.join('&')
  if (serializedParams) {
    const index = serializedParams.indexOf('#')
    url = url.slice(0, index)
    url += url.indexOf('?') === -1 ? '?' : '&' + serializedParams
  }
  return url
}
