import request from '../request/apiRequest'

export const getTrelloList = () => {
  return request({
    url: `/list`,
    method: 'get',
  })
}

export const postTrelloList = (data) => {
  return request({
    url: `/list`,
    method: 'post',
    data,
  })
}

export const deleteTrelloList = (id) => {
  return request({
    url: `/list/${id}`,
    method: 'delete',
  })
}

export const getTodoList = () => {
  return request({
    url: `/todo`,
    method: 'get',
  })
}

export const getDoneList = () => {
  return request({
    url: `/done`,
    method: 'get',
  })
}
