import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';

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


export const uploadAvatarApi = async (fromData) => {
  const { data } = await axios.put(`${BASE_URL}/user/upload-avatar`, fromData, options)

  return data;
}


export const updateInfo = async (model) => {
  const { data } = await axios.put(`${BASE_URL}/user/update-info`, model, options);

  return data;
}


export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};


export const getVideoApi = async () => {

  const { data } = await axios.get(`${BASE_URL}/video/get-video`);

  return data;
}

export const getVideoTypeApi = async () => {

  const { data } = await axios.get(`${BASE_URL}/video/get-video-type`);

  return data;
}

export const getVideoByIdApi = async (typeId) => {

  const { data } = await axios.get(`${BASE_URL}/video/get-video-typeid/${typeId}`);

  return data;
}



export const getVideoIdApi = async (videoId) => {

  const { data } = await axios.get(`${BASE_URL}/video/get-video/${videoId}`);

  return data;
}


export const getCommentVideoApi = async (videoId) => {

  const { data } = await axios.get(`${BASE_URL}/video/get-comment/${videoId}`);

  return data;
}

// model => {"full_name":"","email":"","pass_word":""}
export const signUpApi = async (model) => {
  const { data } = await axios.post(`${BASE_URL}/user/sign-up`, model)

  return data;
}

export const loginApi = async (model) => {
  const { data } = await axios.post(`${BASE_URL}/user/login`, model)

  return data;
}

export const loginFacebookApi = async (model) => {
  const { data } = await axios.post(`${BASE_URL}/user/login-facebook`, model)

  return data;
}

