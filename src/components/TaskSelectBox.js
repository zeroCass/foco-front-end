import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

// retorna o componente selectbox  

export default () => {
    return (
        <View style={styles.container}>
            <View style={styles.checkContainer}>
                <View style={styles.checkBox} />
            </View>
            <View style={styles.taskInfo}>
                <View style={styles.titleContainer}>
                    <Text>Titulo</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text>Categoria</Text>
                    <Text>Prazo</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        // backgroundColor: '#F00',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#AAA',
        borderBottomWidth: 5,
    },
    checkContainer: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    checkBox: {
        width: 25,
        height: 25,
        borderWidth: 2,
        borderColor: '#000',
    },
    taskInfo: {
        flex: 1,
    },
    titleContainer: {
        alignItems: 'center',
    },
    infoContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        alignItems: 'center',
    },
})