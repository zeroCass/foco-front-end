import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, ImageBackground } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

import TouchableView from '../../components/TouchableView'
import imgSource from '../../assets/images/cart_market.png'

export default props => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
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
                    <View style={styles.imgContainer}>
                        <ImageBackground source={imgSource} style={{ flex: 1 }}></ImageBackground>
                    </View>
                    
                    <TextInput
                        value={name}
                        label='Nome do item'
                        onChangeText={(name) => setName(name)}
                        mode='outlined'
                        outlineColor='#6495ED'
                        placeholder='Ex: Chocolate, Jogar Video Game...'
                        activeOutlineColor='#6495ED'
                    />
                    <TextInput
                        value={price}
                        label='Preço'
                        onChangeText={(price) => setPrice(price)}
                        mode='outlined'
                        outlineColor='#6495ED'
                        placeholder='150'
                        activeOutlineColor='#6495ED'
                    />
                    <Button onPress={() => {
                        const item = {
                            name,
                            price,
                            image: imgSource,
                        }
                        props.saveItem(item)
                        props.onClose()
                    }} >Salvar</Button>
                </View> 
                <TouchableView {...props} />
            </View>
            <TouchableView {...props} />
        </Modal>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    centerView: {
        height: '70%',
        flexDirection: 'row',
    },
    contentView: {
        backgroundColor: '#FFF',
        flex: 8,
        padding: 20,
    },
    imgContainer: {
        height: '60%',
        width: '100%',
        backgroundColor: '#AAA',
        borderRadius: 20,
    },
})