import React from 'react'
import { Text } from 'react-native'
import { Button } from 'react-native-paper'
import moment from 'moment'


export default (props) => {

    // active and not completed
    if (props.isActive && props.doneAt === null && !props.expired) {
        return (
            <Button onPress={() => {
                // task completed
                props.done(props.id)
                // by clicking in finalizate, open the completitin modal
                if (props.onOpenCompletition) props.onOpenCompletition()
            }}>
                Finalizar
            </Button>      
        )
    }
    // not active and not expired and not done
    if (!props.isActive && !props.expired && props.doneAt === null) {
        return (
            <Button onPress={() => {
                // startTask in Tasks
                props.start(props.id)
            }}>
                Iniciar
            </Button>
        )
    }
    // has been completed
    if (props.doneAt !== null) {
        return (
            <Text> Finalizada em: {moment(props.doneAt).format('HH[:]mm D[/]MMM[/]YY')} </Text> 
       )
    }

    // expired
    if (props.expired) {
        return (
            <Text>Expirada em: {moment(props.estimateAt).format('HH[:]mm D[/]MMM[/]YY')}</Text>
        )
    }  

}