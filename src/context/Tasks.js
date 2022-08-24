import React, { createContext, useReducer } from 'react'

export const TasksContext = createContext({})

const initialState = { tasks: [] }
export default TasksProvider = ({ children })  => {
    // const [tarefas, setTarefas] = useState([{ name: 'Tarefa 1', desc: 'Descricao 1', id: Math.random() }])

    const reducer = (state, action) => {
        switch(action.type) {
            case 'addTask':
                return {
                    ...state, 
                    tasks: [...state.tasks, action.payload],
                }
            case 'startTask':
                let tasks = [...state.tasks]
                tasks.forEach(task => {
                    if (task.id === action.payload.id) {
                        // calculate the timeleft until task expire
                        let until = task.estimateDate.getTime() - new Date().getTime()
                        task.isActive = true
                        task.countdown(until)
                    }
                        
                })
                return {
                    ...state,
                    tasks: tasks,
                }
            case 'expiredTask':
                // console.warn('TASK HAS BEEN EXPIRED')
                tasks = [...state.tasks]
                tasks.forEach(task => {
                    let until = task.estimateDate.getTime() - new Date().getTime()
                    if (until < 0) {
                        task.expired = true
                    }
                })
                return {
                    ...state,
                    tasks: tasks
                }
            case 'doneTask':
                console.log('Entrou doneTask')
                tasks = [...state.tasks]
                tasks.forEach(task => task.id === action.payload.id ? 
                        task.doneAt = new Date() : task.doneAt = null )
                return {
                    ...state,
                    tasks: tasks
                }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <TasksContext.Provider value={{
            state, dispatch
        }}>
            { children }
        </TasksContext.Provider>
    )
}

