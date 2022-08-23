import React  from 'react'
import { Button, View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()


function Shop({ navigation }){
    return (
        <View>
            <Text>Shop</Text>
        </View>
    )
}


function Perfil({ navigation }){
    return (
        <View>
            <Text>Perfil</Text>
        </View>
    )
}


function Login({ navigation }) {
    return (
        <View>
            <Text>Login</Text>
            <Button
                onPress={() => navigation.navigate('Register')}
                title="Go to Register"
            />
            <Button
                onPress={() => navigation.navigate('Main')}
                title="Go to Main"
            />
        </View>
    )
}


function Register({ navigation }) {
    return (
        <View>
            <Text>Register</Text>
            <Button
                onPress={() => navigation.navigate('Login')}
                title="Go to Login"
            />
        </View>
    )
}


function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={() => navigation.navigate('Notifications')}
          title="Go to notifications"
        />
      </View>
    );
  }
  
function NotificationsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={() => navigation.goBack()} title="Go back home" />
      </View>
    );
  }


function StackNavigator() {
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Main'component={DrawerNavigator} options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
            <Stack.Screen name='Register' component={Register} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}

function DrawerNavigator() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name='Home' component={HomeScreen} />
            <Drawer.Screen name='Notifications' component={NotificationsScreen} />
            <Drawer.Screen name='Shop' component={Shop} />
            <Drawer.Screen name='Perfil' component={Perfil} />
        </Drawer.Navigator>
    )
}

export default () => {
    return (
        <NavigationContainer>
            <StackNavigator/>
        </NavigationContainer>
    )
}