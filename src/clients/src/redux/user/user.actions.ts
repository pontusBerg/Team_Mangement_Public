import axios from 'axios'
import { User, AppActions, LoginInfo } from './user.types'

export const loginUser = (user: LoginInfo): AppActions => ({
    type: 'LOGIN_USER',
    payload: user
})

export const loginRequestLoading = () => ({
    type: "LOGIN_REQUEST_LOADING"
})

export const loginRequestFailed = () => ({
    type: "LOGIN_REQUEST_FAILED",

})

export const loginRequestSucess = (user: User) => ({
    type: "LOGIN_REQUEST_SUCCESS",
    user
})

export const authByToken = () => ({
    type: "AUTH_BY_TOKEN"
})

export const authRequestFailed = () => ({
    type: "AUTH_REQUEST_FAILED"
})

export const authRequestSuccess = (user: User) => ({
    type: "AUTH_REQUEST_SUCCESS",
    user
})

export const logoutRequest = () => ({
    type: "LOGOUT_USER"
})

export const startLoginUser = (user: any) => {
    return async (dispatch: any, getState: any) => {


        dispatch(loginRequestLoading())
        const {email, password} = user
        
        try {
           const response = await axios.post('/api/login', {
                email,
                password
            })
            dispatch(loginRequestSucess(response.data))
        } catch (error) {
            dispatch(loginRequestFailed())
        }
    }
}

export const startAuthUser = () => {
    return async (dispatch: any, getState: any) => {
        try {
            const response = await axios.get('/api/authByToken')
            dispatch(authRequestSuccess(response.data))
        } catch (error) {
            dispatch(authRequestFailed())
        }
        
    }
}

export const startLogoutUser = () => {
    return async (dispatch: any, getState: any) => {
        try {
            const response = await axios.post('/api/logout' , {}, { withCredentials: true })
            
            dispatch(logoutRequest())
        } catch (error) {

        }
    }
}