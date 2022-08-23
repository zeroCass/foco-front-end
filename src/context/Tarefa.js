import React, { createContext, useState, useReducer } from 'react'

export const TarefaContext = createContext({})

const initialState = []
export default TarefaProvider = ({ children })  => {
    // const [tarefas, setTarefas] = useState([{ name: 'Tarefa 1', desc: 'Descricao 1', id: Math.random() }])

    const reducer = (state, action) => {
        switch(action.type) {
            case 'addTask':
                console.log('reducer: ', [...state, action.payload])
                return [...state, action.payload]
            default:
                return state
        }
    }

    const [tarefas, dispatch] = useReducer(reducer, initialState)

    return (
        <TarefaContext.Provider value={{
            tarefas, dispatch
        }}>
            { children }
        </TarefaContext.Provider>
    )
}

