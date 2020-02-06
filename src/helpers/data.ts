import { isObject } from './utils'

export function transformRequest(data: any): any {
  if (isObject(data)) return JSON.stringify(data)
  return data
}

export function transformResponse(data: any): any {
  if (data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (err) {
      console.log(err)
    }
  }
  return data
}
