import axios from 'axios'
import store from '@/store'

function getCookie(name) {
  let cookieValue = null
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}

const csrfToken = getCookie('csrftoken')

const baseURL = process.env.VUE_APP_API_URL

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 0,
  headers: {
    Authorization: localStorage.getItem('access_token')
        ? 'Bearer ' + localStorage.getItem('access_token')
        : null,
    'Content-Type': 'application/json',
    accept: 'application/json',
    'X-CSRFToken': csrfToken,
  },
})


axiosInstance.interceptors.request.use(
    function (config) {
      store.commit('INCREMENT_HTTP_REQUEST_QUEUE')
      return config
    },
)

axiosInstance.interceptors.response.use(
    function (response) {
      store.commit('DECREMENT_HTTP_REQUEST_QUEUE')
      return response
    },
    async function (error) {
      store.commit('DECREMENT_HTTP_REQUEST_QUEUE')

      const originalRequest = error.config
      console.log('in axiosInstance | BEGINING OF ERROR SECTION | error: ', error)
      console.log('in axiosInstance | BEGINING OF ERROR SECTION | error.response.data: ', error.response.data)
      console.log('in axiosInstance | BEGINING OF ERROR SECTION | error.response.status: ', error.response.status)

      if (typeof error.response === 'undefined') {
        alert(
            'A server/network error occurred. ' +
            'Looks like CORS might be the problem. ' +
            'Sorry about this - we will get it fixed shortly.',
        )
        return Promise.reject(error)
      }

      if (error.response.status === 400){
        return Promise.reject(error)
      }

      if (
          error.response.status === 401 &&
          originalRequest.url === baseURL + 'token/'
      ) {
        // window.location.href = '/login/';
        return Promise.reject(error)
      }

      if (
          error.response.status === 401 &&
          originalRequest.url === baseURL + 'token/refresh/'
      ) {
        // window.location.href = '/login/';
        return Promise.reject(error)
      }

      if (
          error.response.status === 403
          //&& error.response.data.code === 'token_not_valid'
          //&& error.response.statusText === 'Unauthorized'
      ) {
        const refreshToken = localStorage.getItem('refresh_token')

        if (refreshToken) {
          console.log(`response.status was ${error.response.status} so we will use refreshToken: `, refreshToken)
          const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]))

          const now = Date.now()
          // exp date in token is expressed in seconds, while now() returns milliseconds:
          if (tokenParts.exp * 1000 > now) {
            return axiosInstance
                .post('/token/refresh/', {refresh: refreshToken})
                .then((response) => {
                  localStorage.setItem('access_token', response.data.access)
                  localStorage.setItem('refresh_token', response.data.refresh)

                  axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + response.data.access
                  originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access

                  return axiosInstance(originalRequest)
                })
                .catch((err) => {
                  console.log('error in refresh token part: ', err)
                  // window.location.href = '/login/'
                })
          } else {
            console.log('Refresh token is expired', tokenParts.exp, now)
            // throw new Error('refresh_token_expired')
            window.location.href = '/login/'
          }
        } else {
          console.log('in axiosInstance: Refresh token not available. refreshToken is: ', refreshToken)
          window.location.href = '/login/'
        }
      }

      // specific error handling done elsewhere
      return Promise.reject(error)
    },
)

export default axiosInstance