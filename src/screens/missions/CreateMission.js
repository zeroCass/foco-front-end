import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Modal, FlatList } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

import TouchableView from '../../components/TouchableView'
import TaskSelectBox from '../../components/TaskSelectBox'
import { TasksContext } from '../../context/Tasks'

const ModalList = (props) => {

    const { state } = useContext(TasksContext)
    const [selectedTasks, setSelectedTasks] = useState([])


    const tasks = state.tasks.filter(task => {
        // get the tasks that has the same category and was not initialized and not missonid
        return (task.category === props.tasksCategory && !task.isActive && task.missionId === null) 
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
                    <View>
                        <Text>Tarefas com categoria: {props.tasksCategory}</Text>
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
                <TouchableView {...props} />
            </View>
            <TouchableView {...props} />
        </Modal>
    )
}

export default props => {

    const { state, dispatch } = useContext(TasksContext)
    const [modalVisibilty, setModalVisibility] = useState(false) 
    const [category, setCategory] = useState('')
    const [name, setName] = useState('')
    
    //selectedTask passa a ser state
    //onSave passa a adicionar tasks no selectedTask
    //implementar botao de cancelar para sair da tela

    const save = (selectedTasks) => {
        //calculate avarage time left
        //calculate avarage difficult

        const mission = {
            id: Math.random() * 1000,
            name,
            category,
            // difficult,
            tasks: selectedTasks,
        }

        // set task id for each task in the mission array
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
                } 
            })
        })
        //convert data to json to pass through screen (navigation)
        const missionJSON = JSON.stringify(mission)
        props.navigation.navigate('MissionList', missionJSON)
    }

    return (
        <View>
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
            <ModalList isVisible={modalVisibilty} 
                onClose={() => setModalVisibility(false)} 
                tasksCategory={category}
                onSave={save} 
            />
            <Text>Criar Missão</Text> 
            <Button
                onPress={() => setModalVisibility(true)}
            >
                Selecionar Tarefas
            </Button>
            <Button>
                Salvar
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerView: {
        height: '85%',
        flexDirection: 'row'
    },
    contentView: {
        backgroundColor: '#FFF',
        flex: 8,
    }
})

