import axios from 'axios'
const wz = 'https://www.liulongbin.top:8888/api/private/v1/'

function request(url, data = {}, type = 'GET') {
  if (type === 'GET') {
    return axios.get(wz + url, {
      params: {
        ...data
      }
    })
  } else {
    return axios.post(wz + url, {
      ...data
    })
  }
}
export default request;