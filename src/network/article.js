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

export const getActiclesDelete = articleId => {
  return request({
    method: 'Detele',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

export const addArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft
    },
    data
  })
}

export const updateArticle = (articleId, draft = false, data) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      draft
    },
    data
  })
}

export const getArticle = (articleId) => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

export const updataCommentStauts = (articleId, allowComment) => {
  return request({
    method: 'PUT',
    url: '/mp/v1_0/comments/status',
    params: {
      article_id: articleId
    },
    data: {
      allow_comment: allowComment
    }
  })
}
