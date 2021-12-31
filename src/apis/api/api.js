import request from '../request/apiRequest'

export const getDoingList = () => {
  return request({
    url: `/doing`,
    method: 'get',
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
