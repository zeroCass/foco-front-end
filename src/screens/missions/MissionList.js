import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { IconButton } from 'react-native-paper'


export default props => {

    const [missions, setMissions] = useState([])

    // the mission obj is recieve by params
    // everytime the params changed, rerender the component
    useEffect(() => {
        if (props.route.params) {
            const mission = JSON.parse(props.route.params)
            setMissions((prevMissions) => [...prevMissions, mission])
        }
    }, [props.route.params])



    return (
        <View style={styles.container}>
            <Text>Missoes</Text>
            <FlatList
                data={missions}
                keyExtractor={item => `${item.id}`}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <Text>{item.name}</Text>
                            {item.tasks.map((task) => {
                                return <Text>Tarefa: {task.name}</Text>
                            })}
                        </View>
                    )
                }}
            />
            <View style={styles.addButton}>
                <IconButton
                    icon='plus-circle'
                    size={50}
                    color='blue'
                    onPress={() => props.navigation.navigate('CreateMission')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
})