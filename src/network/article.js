import request from '../network/request'

export const getActicles = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}

export const getActiclesChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}
