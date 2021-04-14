import axios from 'axios'
const wz = 'https://www.liulongbin.top:8888/api/private/v1/'

function LoginApi(url, data = {}, type = 'GET') {
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

function request(url, data = {}, type = 'GET') {
  // 添加请求拦截器
  axios.interceptors.request.use(function (config) {
    config.headers.Authorization = localStorage.getItem('token')
    return config;
  });
  if (type === 'GET') {
    return axios.get(wz + url, {
      params: {
        ...data
      }
    })
  } else if (type === 'DELETE') {
    return axios.delete(wz + url)
  } else if (type === 'PUT') {
    if (Object.keys(data).length > 0) {
      return axios.put(wz + url, {
        ...data
      })
    } else {
      return axios.put(wz + url)
    }

  } else {
    return axios.post(wz + url, {
      ...data
    })
  }
}

export {
  LoginApi,
  request
};