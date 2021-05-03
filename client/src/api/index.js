import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL
const API = axios.create({baseURL: baseUrl})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})
const postUri = '/posts'
const authUri = '/users'
//const url = 'http://127.0.0.1:5000/posts'
//const url = 'https://memoire-app.herokuapp.com/posts'
export const fetchPosts = () => API.get(postUri)
export const createPost = (newPost) => API.post(postUri, newPost)
export const updatePost = (id, updatedPost) => API.patch(`${postUri}/${id}`, updatedPost)
export const likePost = (id) => API.patch(`${postUri}/${id}/likePost`)
export const deletePost = (id) => API.delete(`${postUri}/${id}`)

export const signIn = (formData) => API.post(`${authUri}/signin`, formData)
export const signUp = (formData) => API.post(`${authUri}/signup`, formData)
