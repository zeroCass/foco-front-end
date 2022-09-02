import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// retorna o componente selectbox  
export default props => {
    const [selected, setSelected] = useState(false)

    useEffect(() => {
        props.onPress(props.id, selected)
    }, [selected])

    return (
        <TouchableOpacity onPress={() => setSelected(!selected)}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={{ color:'#FFF', fontWeight: 'bold' }} >{props.name}</Text>
                </View>
                <View style={{ flexDirection: 'row' }} >
                    <View style={styles.checkContainer}>
                        {!selected 
                            ? <Icon name='checkbox-blank-circle-outline' size={25} /> 
                            : <Icon name='check-circle' color='#9d53f3' size={25} />}
                    </View>
                    <View style={styles.taskInfo}>
                        <View style={styles.infoContainer}>
                            <Text>Dificuldade: {props.difficulty == 0 ? 'Baixa' : props.difficulty == 1 ? 'Media' : 'Alta'}</Text>
                            <Text>Prioridade: {props.priority == 0 ? 'Baixa' : props.priority == 1 ? 'Media' : 'Alta'} </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 90,
        // backgroundColor: '#F00',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        borderBottomColor: '#AAA',
        borderBottomWidth: 2,
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
        borderColor: '#AAA',
        borderRadius: 13,
    },
    taskInfo: {
        flex: 1,
    },
    titleContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#45068f',
    },
    infoContainer: {
        padding: 10,

    },
})