import { IBookmark } from '../interface'
import http from './http'

export function add(payload: IBookmark) {
  return http.post('/bookmark', payload)
}

export function update(payload: IBookmark) {
  return http.put('/bookmark', payload)
}

export function remove(id: number) {
  return http.delete('/bookmark', { params: { id } })
}

export function query(tagId: number) {
  return http.get('/bookmark', { params: { tagId } })
}
