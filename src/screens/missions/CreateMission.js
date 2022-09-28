import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Modal, FlatList, Alert, ScrollView } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { DateTimePickerAndroid} from '@react-native-community/datetimepicker'
import moment from 'moment'

import TouchableView from '../../components/TouchableView'
import TaskSelectBox from '../../components/TaskSelectBox'

import { TasksContext } from '../../context/Tasks'
import { MissionsContext } from '../../context/Missions'

const ModalList = (props) => {

    const { state } = useContext(TasksContext)
    const [selectedTasks, setSelectedTasks] = useState([])


    const tasks = state.tasks.filter(task => {
        // get the tasks that has the same category and was not initialized and not missonid
        // not done and not expired
        return (task.category === props.tasksCategory && !task.isActive 
                && task.missionId === null && !task.expired && !task.doneAt) 
    })

    // array with all selected tasks

    // insert task if is not in array or exlude tasks if the array includes
    const selectedTasksID = (id, selected) => {
        const [ task ] = tasks.filter(task => task.id === id ? true : false)
        
        if (selected && !selectedTasks.includes(task)) {
            setSelectedTasks([...selectedTasks, task])
         }
        
         if (!selected && selectedTasks.includes(task)) {
            setSelectedTasks(selectedTasks.filter(task => task.id !== id ? true : false))
         }

    }

    return (
        <Modal
            animationType='slide'
            visible={props.isVisible}
            transparent={true}
            onRequestClose={props.onClose}
        >
            <TouchableView {...props} />
            <View style={styles.centerView}>
                <TouchableView {...props} />
                <View style={styles.contentView}>
                    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                        <View style={styles.titileContainer}>
                            <Text style={styles.title}>Tarefas com categoria:</Text>
                            <Text style={styles.title}>{props.tasksCategory}</Text>
                        </View>
                        <FlatList
                            data={tasks}
                            keyExtractor={item => `${item.id}`}
                            renderItem={({ item }) => <TaskSelectBox {...item} onPress={selectedTasksID} />}
                        />
                        <Button onPress={() => {
                            props.onSave(selectedTasks)
                            props.onClose()
                        }} >
                            Salvar
                        </Button>
                    </View>
                </View>
                <TouchableView {...props} />
            </View>
            <TouchableView {...props} />
        </Modal>
    )
}

export default props => {

    const { state, dispatch } = useContext(TasksContext)
    const { dispatch: dispacthMission } = useContext(MissionsContext)

    const [modalVisibilty, setModalVisibility] = useState(false) 
    const [category, setCategory] = useState('')
    const [name, setName] = useState('')
    const [selectedTasks, setSelectedTasks] = useState([])
    const [estimateDate, setEstimateDate] = useState(new Date())
    const [estimateTime, setEstimateTime] = useState(new Date())
    const [initDate, setInitDate] = useState(null)
    const [initTime, setInitTime] = useState(null)
    
    const stringDateFormated = moment(estimateDate).format('D[/]MMM[/]YY')
    const stringTimeFormated = moment(estimateTime).format('HH[:]mm')

    const stringinitDateFormated = initDate ? moment(initDate).format('D[/]MMM[/]YY') : '__/___/__'
    const stringinitTimeFormated = initTime ? moment(initTime).format('HH[:]mm') : '__:__ '

    // get the selectedTask returned by ModaList component and save as the new state
    const saveSelectedTask = (selectedTasks) => {
        setSelectedTasks(selectedTasks)
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

    const saveMission = () => {
        //calculate avarage time left
        //calculate avarage difficult

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

        // if (selectedTasks.length < 2) {
        //     Alert.alert('Erro ao criar Missão', 'A missão deve conter ao menos duas tarefas',
        //         [{ text: 'Ok' }], { cancelable: true })
        //     return 
        // }

        //calculate avarage difficult
        const difficultyAvg = Math.floor(selectedTasks.reduce((sum, task) => sum + task.difficulty, 0) / selectedTasks.length)
        const priorityAvg = Math.floor(selectedTasks.reduce((sum, task) => sum + task.priority, 0) / selectedTasks.length) 

        const mission = {
            id: Math.random() * 1000,
            name,
            estimateDate: finalDate,
            initDate: startDate,
            doneAt: null,
            startAt: null,
            isActive: false,
            expired: false,
            category,
            difficulty: difficultyAvg,
            priority: priorityAvg,
            tasks: selectedTasks,
            completition: 0,
        }

        // set task id for each task in the mission array
        // setNull2Date for each task (reset date status)
        selectedTasks.forEach(sTask => {
            state.tasks.forEach(task => {
                if (task.id === sTask.id) {
                    dispatch({
                        type: 'setMission',
                        payload: {
                            id: task.id,
                            missionId: mission.id
                        }
                    })
                    dispatch({
                        type: 'setNull2Date',
                        payload: {
                            id: task.id
                        }
                    })
                } 
            })
        })
       
        dispacthMission({
            type: 'addMission',
            payload: mission
        })  
        props.navigation.navigate('Missões')
         //convert data to json to pass through screen (navigation)
        // const missionJSON = JSON.stringify(mission)
        // props.navigation.navigate('MissionList', missionJSON)
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF', padding: 20 }} >
            <ScrollView>
                <View style={styles.container}>
                    <ModalList isVisible={modalVisibilty} 
                        onClose={() => setModalVisibility(false)} 
                        tasksCategory={category}
                        onSave={saveSelectedTask} 
                    />
                    <TextInput
                        value={name}
                        label='Nome'
                        onChangeText={(name) => setName(name)}
                        mode='outlined'
                        outlineColor='#6495ED'
                        placeholder='Nome da Missão'
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
                    <View style={{ alignItems: 'center', margin: 10 }} >
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }} >Tarefas:</Text>
                        {selectedTasks.length > 0 ?
                            selectedTasks.map((task) => {
                                return (
                                    <View key={task.id} >
                                        <Text style={{ fontWeight: 'bold', fontSize: 15 }} >{task.name}</Text>
                                    </View>
                                )
                            }) : null}
                    </View>
                    <Button
                        type='text'
                        onPress={() => setModalVisibility(true)}
                        style={{ marginBottom: 20}}
                        color='#104FB6'
                    >
                        Selecionar Tarefas
                    </Button>
                    <View style={{ alignItems: 'center' }} >
                        <Text style={{ color: '#000' }} >Prazo Incial(Opicional)</Text>
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
                    <View style={{ alignItems: 'center' }} >
                        <Text style={{ color: '#000' }}>Prazo Final</Text>
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
                        onPress={saveMission}
                        style={{ borderRadius: 25, width: '25%', backgroundColor: '#6e37af' }} 
                    >
                        Salvar
                    </Button>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
        justifyContent: 'center',
    },
    centerView: {
        height: '85%',
        flexDirection: 'row'
    },
    contentView: {
        backgroundColor: '#FFF',
        flex: 8,
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
    dateButton: {
        margin: 10, 
        borderRadius: 25,
        backgroundColor: '#8e47e1',
    },
    titileContainer:{
        width: '100%',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#AAA'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000',
    },
    infoContainer: {
        padding: 20,
    },
})

