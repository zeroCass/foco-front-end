import React, { useContext } from 'react'
import { StyleSheet, TouchableOpacity} from 'react-native'


import { TasksContext } from '@context/Tasks'

import DotTask from '@components/DotTask'

export default props => {
    const { toggleDoneAt } = useContext(TasksContext)
    const setDone = () => {
        if (props.mission.isActive) {
            toggleDoneAt(props.id)
            // setIsDone(!isDone)
        }
    }

    return (
        <TouchableOpacity onPress={setDone} >
            <DotTask {...props} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        borderColor: '#AAA',
        borderWidth: 1,
        height: 35,
        borderRadius: 10,
        margin: 5,
        flexDirection: 'row',
    },
    checkContainer: {
        width: '15%',
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    check: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#000',
    },
    txtContainer:{
        width: '75%',
        alignItems: 'center',
        justifyContent: 'center'
    },
})