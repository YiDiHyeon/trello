import request from '../request/apiRequest'

/* lists */
export const getTrelloList = () => {
  return request({
    url: `/lists?_embed=cards`,
    method: 'get',
  })
}

/* lists 추가 */
export const postTrelloList = (data) => {
  return request({
    url: `/lists`,
    method: 'post',
    data,
  })
}

/* lists 삭제 */
export const deleteTrelloList = (id) => {
  return request({
    url: `/lists/${id}`,
    method: 'delete',
  })
}

/* cards lists */
export const getTrelloCard = () => {
  return request({
    url: `/cards`,
    method: 'get',
  })
}

/* cards 추가 */
export const postTrelloCard = (data) => {
  return request({
    url: `/cards`,
    method: 'post',
    data,
  })
}

/* cards 삭제 */
export const deleteTrelloCard = (id) => {
  return request({
    url: `/cards/${id}`,
    method: 'delete',
  })
}
