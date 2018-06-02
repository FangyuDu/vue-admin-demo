import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8601/api'
})

export function getProjectList(params) {
  return api({
    method: 'get',
    url: '/getProjectList',
    params
  })
}

export function updateProject(oid) {
  return api({
    method: 'post',
    url: '/updateProject',
    data: {
      oid: oid
    }
  })
}
