import React from 'react'
import {
    View,
    Text,
} from 'react-native'
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer'


export default props => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 2,  backgroundColor: 'yellow'}}>
                <Text>Pefil</Text>
            </View>
            <View style={{ flex: 7,  backgroundColor: 'blue'}}>
                <DrawerContentScrollView {...props} >
                    <DrawerItemList {...props} />
                    <DrawerItem label='Help' onPress={() => console.warn('Clicked')} />
                </DrawerContentScrollView>
            </View>
            <View style={{ flex: 1, backgroundColor: 'red' }}>
                <Text>Bottom</Text>
            </View>
        </View>
        
    )
    
}