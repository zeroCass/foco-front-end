import React, { createContext, useReducer } from 'react'

export const AuthContext = createContext({})
const initialState = {
    id: 1,
    name: 'João Snow',
    email: 'joao.snow@email.com',
    password: 'senhafoda',
    auth: null,
    xp: 3800,
    points: 125,
}

export default AuthProvider = ({ children }) => {
    // const [user, setUser] = useState(initialState)
    const reducer = (user, action) => {
        switch(action.type){
            case 'setAuth':
                return {
                    ...user,
                    auth: true
                }
            case 'signin': {
                return {
                    ...user,
                    auth: true,
                    id: action.payload.id,
                    name: action.payload.name,
                    email: action.payload.email,
                    birthDate: action.payload.birthDate,
                }
            }
            case 'setXP':
                console.log('settedXP')
                return {
                    ...user,
                }
            default: 
                return user
        }
    }

    const [user, dispatch] = useReducer(reducer, initialState)

    return (
        <AuthContext.Provider value={{ user, dispatch }}>
            {children}
        </AuthContext.Provider>

    )
    
}