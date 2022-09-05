import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { IconButton } from 'react-native-paper'
import { AuthContext } from '@context/Auth'

import ShopItem from '../../components/ShopItem'
import CreateShopItem from './CreateShopItem'

export default props => {
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [shopItems, setShopItems] = useState([])
    const { user } = useContext(AuthContext)

    const addShopItem = (item) => {
        item.id = Math.floor((Math.random() * 1000))
        setShopItems([...shopItems, item])
    }

    const redeemItem = (itemId) => {
        const newShopItems = [...shopItems]
        let idx = null
        for(let i = 0; i < newShopItems.length; i++) {
            if (newShopItems[i].id === itemId) {
                idx = i
            }
        }
        if (idx !== null){
            newShopItems.splice(idx, 1)
            console.log(idx, newShopItems)
            setShopItems(newShopItems)
        }
    }

    return (
        <>
            <CreateShopItem 
                isVisible={showCreateModal} 
                onClose={() => setShowCreateModal(false)}
                saveItem={addShopItem} 
            />
            <View style={{ flex: 1 }} >
                <ScrollView contentContainerStyle={styles.container} >
                    {shopItems.map(item => {
                        return <ShopItem key={item.id} {...item} redeemItem={redeemItem} />
                    })}
                </ScrollView>
                {!user.mainGodparent ? 
                <View style={styles.addButton}>
                    <IconButton
                        icon='plus-circle'
                        size={50}
                        color='blue'
                        onPress={() => setShowCreateModal(true)}
                    />
                </View>
                :null}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
})