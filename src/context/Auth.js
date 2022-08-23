import React, { createContext, useState } from 'react'

export const AuthContext = createContext({})
const initialState = {
    name: '',
    password: '',
    auth: null,
}

export default AuthProvider = ({ children }) => {
    const [user, setUser] = useState(initialState)

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>

    )
    
}