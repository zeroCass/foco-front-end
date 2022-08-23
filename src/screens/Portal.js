import React, { useState } from 'react'
import { Text } from 'react-native'
import { Portal, Provider, Button, Modal } from 'react-native-paper'

export default () => {
    const [visible, setVisible] = useState(false)

    return (
        <Provider>
            <Portal>
                <Modal 
                    visible={visible} 
                    onDismiss={() => setVisible(false)}
                    contentContainerStyle={{ backgroundColor: 'white', flex: 1, alignItems: 'center' }}
                    style={{ height: '80%', padding: 20, justifyContent: 'center' }}
                >
                    <Text>Some Text</Text>
                </Modal>
            </Portal>
            <Button  onPress={() => setVisible(true)} >Show</Button>
        </Provider>
        
    )
}