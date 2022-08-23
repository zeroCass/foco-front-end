import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'

// import { AuthContext } from '../context/Auth'
import { TarefaContext } from '../context/Tarefa'

export default props => {
    // const { state } = useContext(AuthContext)
    const { state } = useContext(TarefaContext)

    return (
        <View style={styles.container}>
            <Text>Pefil</Text>
            <Text>{}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})