export interface User {
    user: {
        id: string | null, 
        name: string | null, 
        profileImg: string | null, 
        team: string | null, 
    }
    loading: boolean
    error: boolean
    authenticated: boolean
}

export interface LoginInfo {    
    user: {
        email: string,
        password: string, 
    }
    }


export const LOGIN_USER = "LOGIN_USER"
export const FETCH_LOAD_REQUEST = "FETCH_LOAD_REQUEST"

export interface LoginUserAction {
    type: typeof LOGIN_USER
    payload: LoginInfo, 
}

export type UserActionTypes = LoginUserAction 

export type AppActions = UserActionTypes