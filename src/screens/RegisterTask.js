import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import { DateTimePickerAndroid} from '@react-native-community/datetimepicker'
import moment from 'moment'

// import { AuthContext } from '../context/Auth'
import { TarefaContext } from '../context/Tarefa'



const priorityOptions = [
    {label: 'Baixa', value: 0 },
    {label: 'Media', value: 1 },
    {label: 'Alta',  value: 2 }
]

const difficultyOptions = [
    {label: 'Baixa', value: 0 },
    {label: 'Media', value: 1 },
    {label: 'Alta',  value: 2 }
]

export default props => {
    // const { state } = useContext(AuthContext)
    const { dispatch } = useContext(TarefaContext)

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [estimateDate, setEstimateDate] = useState(new Date())
    const [estimateTime, setEstimateTime] = useState(new Date())
    const [doneAt, setDoneAt] = useState(null)
    const [priority, setPriority] = useState(0)
    const [difficulty, setDifficulty] = useState(0)

    const stringDateFormated = moment(estimateDate).format('D[/]MMM[/]YY')
    const stringTimeFormated = moment(estimateTime).format('HH[:]mm')

    const save = () => {
        const newTask = {
            id: Math.random() * 1000,
            name,
            desc,
            estimateDate,
            estimateTime,
            doneAt,
            priority,
            difficulty,
            isActive: false
        }

        setName('')
        setDesc('')
        setEstimateDate(new Date())
        setEstimateTime(new Date())
        setDoneAt(null)
        setPriority(0)
        setDifficulty(0)

        dispatch({
            type: 'addTask',
            payload: newTask
        })
    }

    return (
            <View style={{ flex: 1 }}>
                 <View style={styles.container}>
                    <TextInput
                        value={name}
                        label='Nome'
                        onChangeText={(name) => setName(name)}
                        mode='outlined'
                        outlineColor='#6495ED'
                        placeholder='Nome da Tarefa'
                        activeOutlineColor='#6495ED'
                    />
                    <TextInput
                        value={desc}
                        label='Descrição'
                        onChangeText={(desc) => setDesc(desc)}
                        mode='outlined'
                        outlineColor='#6495ED'
                        placeholder='Descrição'
                        activeOutlineColor='#6495ED'
                        numberOfLines={2}
                        multiline={true}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
                        <View>
                            <Text>Prioridade</Text>
                            <RadioForm
                                radio_props={priorityOptions}
                                initial={0}
                                onPress={(value) => setPriority(value)}
                                formHorizontal={true}
                                labelHorizontal={false}
                            />
                        </View>
                        <View>
                            <Text>Dificuldade</Text>
                            <RadioForm
                                radio_props={difficultyOptions}
                                initial={0}
                                onPress={(value) => setDifficulty(value)}
                                formHorizontal={true}
                                labelHorizontal={false}
                            />
                        </View>
                    </View>
                    <View>
                        <Text>Prazo</Text>
                        <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center', justifyContent: 'center' }}>
                            <Button mode='contained' icon='clock-time-nine' style={{ margin: 10, borderRadius: 25 }} onPress={() => {
                                DateTimePickerAndroid.open({
                                    value: estimateTime,
                                    onChange: (_, time) => {
                                        if (new Date(time) > new Date())
                                            setEstimateTime(new Date(time))
                                    },
                                    is24Hour: true,
                                    mode: 'time',
                                })
                            }} >{stringTimeFormated}</Button>
                            <Button mode='contained' icon='calendar-range' style={{ margin: 10, borderRadius: 25 }} onPress={() => {
                                DateTimePickerAndroid.open({
                                    value: estimateDate,
                                    onChange: (_, date) => {
                                        if (new Date(date) >= new Date())
                                            setEstimateDate(new Date(date))
                                    },
                                    mode: 'date',
                                })
                            }} >{stringDateFormated}</Button>
                        </View>
                    </View>
                    <Button onPress={save} >
                        Salvar
                    </Button>
                    
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
    },
})