import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { TextInput, Button } from 'react-native-paper'

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import { DateTimePickerAndroid} from '@react-native-community/datetimepicker'
import moment from 'moment'

// import { AuthContext } from '../context/Auth'
import { TasksContext } from '../../context/Tasks'



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
    const { dispatch } = useContext(TasksContext)

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [estimateDate, setEstimateDate] = useState(new Date())
    const [estimateTime, setEstimateTime] = useState(new Date())
    const [initDate, setInitDate] = useState(null)
    const [initTime, setInitTime] = useState(null)
    const [priority, setPriority] = useState(0)
    const [difficulty, setDifficulty] = useState(0)
    const [category, setCategory] = useState('')

    const stringDateFormated = moment(estimateDate).format('D[/]MMM[/]YY')
    const stringTimeFormated = moment(estimateTime).format('HH[:]mm')

    const stringinitDateFormated = initDate ? moment(initDate).format('D[/]MMM[/]YY') : '__/___/__'
    const stringinitTimeFormated = initTime ? moment(initTime).format('HH[:]mm') : '__:__ '

    const save = () => {
        // get the datetime setup
        
        if ((initDate && !initTime) || (initTime && !initDate)) {
            Alert.alert('Data inválida!', 'Forneça uma incial data válida',
                [{ text: 'Ok' }], { cancelable: true })
            return 
        }

        const finalDate = setupDateTime(estimateTime, estimateDate)
        const startDate = initDate && initTime ? setupDateTime(initTime, initDate) : null

        // returns if date is invalid
        if (finalDate <= new Date()) {
            Alert.alert('Data inválida!', 'Forneça uma data válida',
                [{ text: 'Ok' }], { cancelable: true })
            return 
        }
        // returns if date is invalid
        if (startDate !== null && startDate <= new Date()) {
            Alert.alert('Data inválida!', 'Forneça uma data válida',
                [{ text: 'Ok' }], { cancelable: true })
            return 
        }

        const newTask = {
            id: Math.random() * 1000,
            name,
            desc,
            estimateDate: finalDate,
            initDate: startDate,
            doneAt: null,
            startAt: null,
            priority,
            difficulty,
            category,
            isActive: false,
            expired: false,
            missionId: null,
            completition: 0,
        }
        // call the dispatch
        dispatch({
            type: 'addTask',
            payload: newTask
        })
        // go to Main Page
        props.navigation.navigate('Main')

    }

    // returns the date with the time setup
    const setupDateTime = (estimateTime, estimateDate) => {
        // alterar para eceber estimeTime e o estimateDate
        // convert the hours, minuts of the time to ms
        const time2Ms = 
            (estimateTime.getHours() * 3600 + estimateTime.getMinutes() * 60) * 1000
        const dateMidnight = 
            new Date(estimateDate.getFullYear(), estimateDate.getMonth(), estimateDate.getDate(), 0, 0, 0, 0).getTime()
        return new Date(dateMidnight + time2Ms)
    }


    return (
            <View style={styles.container}>
                <View style={styles.centerView}>
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
                        value={category}
                        label='Categoria'
                        onChangeText={(category) => setCategory(category)}
                        mode='outlined'
                        outlineColor='#6495ED'
                        placeholder='Ex: Estudo, Trabalho, Domestica...'
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
                    <View style={styles.selectedBox}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={styles.txt} >Prioridade</Text>
                            <RadioForm
                                radio_props={priorityOptions}
                                initial={0}
                                onPress={(value) => setPriority(value)}
                                formHorizontal={true}
                                labelHorizontal={false}
                            />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={styles.txt}>Dificuldade</Text>
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
                    <View style={{ alignItems: 'center' }} >
                        <Text style={styles.txt}>Prazo Incial(Opicional)</Text>
                        <View style={styles.dateView}>
                            <Button mode='contained' icon='clock-time-nine' style={styles.dateButton} onPress={() => {
                                DateTimePickerAndroid.open({
                                    value: initTime ? initTime : new Date(),
                                    onChange: (_, time) => {
                                        setInitTime(new Date(time))
                                    },
                                    is24Hour: true,
                                    mode: 'time',
                                })
                            }} >{stringinitTimeFormated}</Button>
                            <Button mode='contained' icon='calendar-range' style={styles.dateButton} onPress={() => {
                                DateTimePickerAndroid.open({
                                    value: initDate ? initDate : new Date(),
                                    onChange: (_, date) => {
                                        setInitDate(new Date(date))
                                    },
                                    mode: 'date',
                                })
                            }} >{stringinitDateFormated}</Button>
                        </View>
                    </View>
                    
                    </View>
                    <View style={{ alignItems: 'center' }} >
                        <Text style={styles.txt}>Prazo Final</Text>
                        <View style={styles.dateView}>
                            <Button mode='contained' icon='clock-time-nine' style={styles.dateButton} onPress={() => {
                                DateTimePickerAndroid.open({
                                    value: estimateTime,
                                    onChange: (_, time) => {
                                        setEstimateTime(new Date(time))
                                    },
                                    is24Hour: true,
                                    mode: 'time',
                                })
                            }} >{stringTimeFormated}</Button>
                            <Button mode='contained' icon='calendar-range' style={styles.dateButton} onPress={() => {
                                DateTimePickerAndroid.open({
                                    value: estimateDate,
                                    onChange: (_, date) => {
                                        setEstimateDate(new Date(date))
                                    },
                                    mode: 'date',
                                })
                            }} >{stringDateFormated}</Button>
                        </View>
                    </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                        <Button 
                            mode='contained' 
                            onPress={save}
                            style={{ borderRadius: 25, width: '25%', backgroundColor: '#104FB6' }} 
                        >
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
    centerView: {
        flex: 1,
        padding: 20,
        // justifyContent: 'center',
    },
    dateButton: {
        margin: 10, 
        borderRadius: 25,
        backgroundColor: '#1081B6',
    },
    selectedBox: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        padding: 20,
    },
    dateView: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    txt: {
        color: '#000',
    }
})