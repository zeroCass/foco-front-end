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
        // get the tasks that has the sae category and was not initialized
        return (task.category === props.tasksCategory && !task.isActive) 
    })

    // array with all selected tasks

    // insert task if is not in array or exlude tasks if the array includes
    const selectedTasksID = (id) => {
        const task = tasks.filter(task => task.id === id ? true : false)
        console.log('selectedTask[0]: ', selectedTasks)
        selectedTasks.includes(...task) 
            ? setSelectedTasks(selectedTasks.filter(task => task.id !== task.id ? true : false))
            : setSelectedTasks((prev) => {
                const newTasks = [...prev, ...task]
                console.log('selectedTask[1]: ', newTasks)
                return newTasks
            })
        console.log('selectedTask[2]: ', selectedTasks)
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
    const [modalVisibilty, setModalVisibility] = useState(false) 
    const [category, setCategory] = useState('')
    

    const save = (selectedTasks) => {
        console.log('selectedTask(save): ', selectedTasks)
        const mission = {
            id: Math.random() * 1000,
            name: 'Missao 1',
            category,
            // difficult,
            tasks: selectedTasks,
        }
        const missionJSON = JSON.stringify(mission)
        props.navigation.navigate('MissionList', missionJSON)
    }

    return (
        <View>
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

