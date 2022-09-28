import React, { createContext, useState } from 'react'

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

    // const getUserInfo = () => {
    //     axios.get(`${server}/users/bytype/${user.id}`)
    //     .then(res => {
    //         const [data] = res.data 
    //         setUser({...user, ...data}) 
    //     }) 
    // }

    // const getGodparentId = (id) => {
    //     return axios.get(`${server}/users/godparent/${id}`)
    // }
    
    const signin = (data) => {
        setUser({...data, token: true})  
    }

    // const signup = (user) => {
    //     return axios.post(`${server}/auth/signup`, {...user})
    // }

    const signout = () => {
        setUser({ token: null })
    }

    // const updateStatus = (status) => {
    //     axios.put(`${server}/users/update/${user.id}`, {
    //         mainGodparent: user.mainGodparent ? true : false,
    //         data: status
    //     })
    //     .then(res => res.status === 200 ? getUserInfo() : null)
    // }


    return (
        <AuthContext.Provider value={{ 
            user,
            signin, 
            signout, 
            // signup, 
            // getGodparentId,
            // updateStatus,
        }}>
            {children}
        </AuthContext.Provider>

    )
    
}