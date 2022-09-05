import React, { createContext, useState } from 'react'
import axios from 'axios'
import { server } from '../common'

export const AuthContext = createContext({})
const initialState = {
    id: null,
    name: '',
    email: '',
    password: '',
    token: null,
    xp: 0,
    points: 10,
}

export default AuthProvider = ({ children }) => {
    const [user, setUser] = useState(initialState)

    const getGodparentId = (id) => {
        return axios.get(`${server}/users/godparent/${id}`)
    }
    
    const signin = ({ email, password }) => {
        axios.post(`${server}/auth/signin`, {
            email,
            password,
        })
        .then((res) => {
            const [data] = res.data 
            setUser({...data, token: true}) 
        })
        .catch(e => console.log(e))
    }

    const signup = (user) => {
        return axios.post(`${server}/auth/signup`, {...user})
    }

    const signout = () => {
        setUser({ token: null })
    }


    return (
        <AuthContext.Provider value={{ user, signin, signout, signup, getGodparentId }}>
            {children}
        </AuthContext.Provider>

    )
    
}