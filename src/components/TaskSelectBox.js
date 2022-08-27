import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'

// retorna o componente selectbox  
export default props => {
    const [selected, setSelected] = useState(false)

    useEffect(() => {
        props.onPress(props.id, selected)
    }, [selected])

    return (
        <TouchableOpacity onPress={() => setSelected(!selected)}>
            <View style={styles.container}>
                <View style={styles.checkContainer}>
                    <View style={[styles.checkBox, selected ? {backgroundColor: '#7CFC00'} : {}]} />
                </View>
                <View style={styles.taskInfo}>
                    <View style={styles.titleContainer}>
                        <Text>{props.name}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text>Categoria: {props.category} </Text>
                        <Text>Prazo: {props.estimateAt} </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        
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