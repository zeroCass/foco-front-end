import React, { createContext, useReducer } from 'react'

export const TasksContext = createContext({})

const initialState = []
export default TasksProvider = ({ children })  => {
    // const [tarefas, setTarefas] = useState([{ name: 'Tarefa 1', desc: 'Descricao 1', id: Math.random() }])

    const reducer = (state, action) => {
        switch(action.type) {
            case 'addTask':
                return [...state, action.payload]
            default:
                return state
        }
    }

    const [tasks, dispatch] = useReducer(reducer, initialState)

    return (
        <TasksContext.Provider value={{
            tasks, dispatch
        }}>
            { children }
        </TasksContext.Provider>
    )
}

