import request from '../request/apiRequest'

export const getTrelloList = () => {
  return request({
    url: `/list`,
    method: 'get',
  })
}

// export const postDoingList = (data) => {
//   return request({
//     url: `/doing`,
//     method: 'post',
//     data
//   })
// }

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
