import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'POST',
    data:{
      username: data.username,
      password: data.password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
