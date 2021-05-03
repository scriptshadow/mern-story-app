import { AUTH } from "../constants/actionTypes";
import * as api from '../api'

//Action creators
export const signin = (formData, history) => async (dispatch) => {
    try {
        //Connecter l'utilisateur
        const { data } = await api.signIn(formData)
        dispatch({type: AUTH, data});

        history.push('/')
    } catch (error) {
        console.log(error.message)
    }
}
export const signup = (formData, history) => async (dispatch) => {
    try {
        //Inscrire l'utilisateur
        const { data } = await api.signUp(formData)
        dispatch({type: AUTH, data});
        history.push('/')
    } catch (error) {
        console.log(error)
    }
}