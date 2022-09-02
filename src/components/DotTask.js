import React, { useState, useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { TasksContext } from '@context/Tasks'

export default (props) => {
    const { state: { tasks } } = useContext(TasksContext)
    const [isDone, setIsDone] = useState(false)
    const iconName = isDone ? 'check-circle' : 'dots-horizontal-circle-outline'
    const iconColor = isDone ? '#9d53f3' : '#AAA'
    const [ task ] = tasks.filter(t => t.id === props.id ? true : false)
    useEffect(() => {
        task.doneAt ? setIsDone(true) : setIsDone(false)
    },[tasks])

    // #9d53f3 (roxo)
    // #16CBC8 (auzl)
    return (
        <View style={{ flexDirection:'row', alignItems: 'center' }} >
            <View>
                <Icon name={iconName} size={30} color={iconColor} />
            </View>
            <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 13 }} >{task.name}</Text>
            </View>
        </View>
    )
}