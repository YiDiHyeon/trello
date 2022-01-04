import request from '../request/apiRequest'

/* list */
export const getTrelloList = () => {
  return request({
    url: `/list?_embed=card`,
    method: 'get',
  })
}

/* list 추가 */
export const postTrelloList = (data) => {
  return request({
    url: `/list`,
    method: 'post',
    data,
  })
}

/* list 삭제 */
export const deleteTrelloList = (id) => {
  return request({
    url: `/list/${id}`,
    method: 'delete',
  })
}

/* card list */
export const getTrelloCard = () => {
  return request({
    url: `/card`,
    method: 'get',
  })
}

/* card 추가 */
export const postTrelloCard = (data) => {
  return request({
    url: `/card`,
    method: 'post',
    data,
  })
}

/* card 삭제 */
export const deleteTrelloCard = (id) => {
  return request({
    url: `/card/${id}`,
    method: 'delete',
  })
}
