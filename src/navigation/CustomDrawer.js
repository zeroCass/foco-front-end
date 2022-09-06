import React, { useContext } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer'
import { Avatar } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { AuthContext } from '@context/Auth'
import { TasksContext } from '@context/Tasks'


export default props => {
    const { user, signout } = useContext(AuthContext)
    const { setInitial } = useContext(TasksContext)

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.perfil}>
                <View style={styles.userAvatar}>
                    <Avatar.Icon size={80} icon='account'/>
                </View>
                <View style={styles.userInfo} >
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.userInfoTxt}>{user.email}</Text>
                    <Text style={styles.userInfoTxt}>ID: {user.id}</Text>
                </View>
            </View>
            <View style={styles.menu}>
                <DrawerContentScrollView {...props} >
                    {/* <DrawerItemList {...props} /> */}
                    <DrawerItem 
                        label='Tarefas'
                        icon={() => <Icon name='text-box-check-outline' size={25} />}
                        onPress={() => props.navigation.navigate('Home')}
                    />
                    <DrawerItem 
                        label='Perfil'
                        icon={() => <Icon name='account' size={25} />}
                        onPress={() => props.navigation.navigate('Perfil')}
                    />
                    <DrawerItem 
                        label='Loja'
                        icon={() => <Icon name='cart' size={25} />}
                        onPress={() => props.navigation.navigate('Shop')}
                    />
                    <DrawerItem 
                        label='Help'
                        icon={() => <Icon name='help-circle-outline' size={25} />}
                    />
                </DrawerContentScrollView>
            </View>
            <View style={styles.bottom}>
                <View style={{ flexDirection:'row', padding: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => {
                        signout()
                        setInitial(false)
                    }} >
                        <Icon name='exit-to-app' color='#FFF' size={30}/>
                    </TouchableOpacity>
                    <Text style={{ color:'#FFF', fontWeight:'bold' }} >Sair</Text>
                </View>
            </View>
        </View>
        
    )
    
}

const styles = StyleSheet.create({
    perfil: {
        flex: 2,  
        backgroundColor: '#FFF', 
        // justifyContent: 'center', 
        flexDirection: 'row',
        padding: 5,
        marginBottom: 10,
    },
    userAvatar: {
        justifyContent: 'center', 
        alignItems: 'center', 
        width:'30%', 
    },
    userInfo: {
        justifyContent: 'center', 
        alignItems: 'flex-start',
        width:'70%',
        marginLeft: 10,
    },
    name: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
    userInfoTxt: {
        fontSize: 12,
    },
    menu: {
        flex: 7, 
        backgroundColor: '#FFF',
        borderTopWidth: 2,
        borderTopColor: '#AAA',
    },
    bottom: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'flex-start', 
        backgroundColor: '#6401ee',
    }
})