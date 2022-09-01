import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'

import { TasksContext } from '@context/Tasks'

export default props => {
    const { dispatch } = useContext(TasksContext)
    const [isDone, setIsDone] = useState(false)
    const checkStyle = isDone ? { backgroundColor: 'green' } : null

    const setDone = () => {
        dispatch({
            type: 'toggleDoneAt',
            payload: {
                id: props.id
            }
        })
        setIsDone(!isDone)
    }

    return (
        <TouchableOpacity onPress={setDone} >
            <View style={styles.container} >
                <View style={styles.checkContainer}>
                    <View style={[styles.check, checkStyle]} />
                </View>
                <View style={styles.txtContainer} >
                    <Text>{props.name}</Text>
                </View>
            </View>
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