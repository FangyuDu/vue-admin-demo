import axios from 'axios'

export function getProjectList() {
  return axios({
    url: '/api/projectList',
    method: 'get'
  })
}

export function updateProject(item) {
  const data = Object.assign({}, item)
  delete data.edit
  return axios({
    url: '/api/projectUpdate',
    method: 'post',
    data: item
  })
}
