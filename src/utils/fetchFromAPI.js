import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';
export const BASE_URL_IMG = 'http://localhost:8080/public/img';

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
    'token': localStorage.getItem("LOGIN_USER")
  },
};



export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};

// get danh sách video
export const getVideoApi = async () => {
  const { data } = await axios.get(`${BASE_URL}/video/get-video`, options)

  return data.data
}


// get danh sách type video
export const getVideoTypeApi = async () => {
  const { data } = await axios.get(`${BASE_URL}/video/get-video-type`, options)

  return data.data
}

// get danh sách type video theo id
export const getVideoWithTypeApi = async (typeId) => {
  const { data } = await axios.get(`${BASE_URL}/video/get-video-with-type/${typeId}`, options)

  return data.data
}


// get danh sách video page
export const getVideoPageApi = async (page) => {
  const { data } = await axios.get(`${BASE_URL}/video/get-video-page/${page}`, options)

  return data.data
}

// get chi tiết video theo id
export const getVideoDetailApi = async (videoId) => {
  const { data } = await axios.get(`${BASE_URL}/video/get-video-detail/${videoId}`, options)

  return data.data
}

// đăng ký
export const signUpApi = async (model) => {
  const { data } = await axios.post(`${BASE_URL}/auth/signup`, model, options)

  return data.message
}

// đăng nhập
export const loginApi = async (model) => {
  const { data } = await axios.post(`${BASE_URL}/auth/login`, model, options)

  return data.data
}

// đăng nhập facebook
export const loginFacebookApi = async (model) => {
  const { data } = await axios.post(`${BASE_URL}/auth/login-facebook`, model, options)

  return data.data
}

// check mail
export const checkEmailApi = async (email) => {
  const { data } = await axios.post(`${BASE_URL}/auth/check-email/${email}`, "", options)

  return data.data
}

// check code

export const checkCodeApi = async (code) => {
  const { data } = await axios.post(`${BASE_URL}/auth/check-code/${code}`, "", options)

  return data.data
}

// reset token
export const resetTokenApi = async (code) => {
  const { data } = await axios.post(`${BASE_URL}/auth/reset-token`, "", options)

  return data.data // token
}


export const getCommentApi = async (videoId) => {
  const { data } = await axios.get(`${BASE_URL}/video/get-comment-video/${videoId}`, options)

  return data.data // token
}

export const commentApi = async (model) => {
  const { data } = await axios.post(`${BASE_URL}/video/comment-video`, model, options)

  return data.data // token
}

export const uploadClound = async (formData) => {

  const { data } = await axios.post(`https://api.cloudinary.com/v1_1/dghvdbogx/upload`, formData)

  return data // token
}

axios.interceptors.response.use(
  (response) => {

    return response
  },
  (error) => {

    if (error.response.data?.message?.name == "TokenExpiredError") {
      // gọi API refresh token
      resetTokenApi().then(result => {
        localStorage.setItem("LOGIN_USER", result)
        window.location.reload()

      }).catch(error => {
        localStorage.removeItem("LOGIN_USER")
        window.location.reload()
      })
    }
    return Promise.reject(error);
  });