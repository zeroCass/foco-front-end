import React, { useContext, useState, useEffect } from 'react'
import { View, StyleSheet, Alert, Text, ActivityIndicator } from 'react-native'
import { TextInput, Button, Checkbox } from 'react-native-paper'
import { TextInputMask } from 'react-native-masked-text'

import { AuthContext } from '@context/Auth'

import axios from 'axios'
import { server, showError } from '../../common'

export default (props) => {
    const { 
        signin: userSignin
    } = useContext(AuthContext)
    
    // multiple states
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        hidePass: true,
        hidePassConfirm: true,
        confirmPass: '',
        birthDate: null,
        godparentId: null,
        godparentType: '',
        godparent: false,
        newUser: false,
        age: null,
        isLoading: false,
    })
    
    // everytime birthDate changes, calculate the current age
    useEffect(() => {
        setState({...state, age: getAge()})
    }, [state.birthDate])


    // get formatted fate to store in databse (0000-00-00)
    const getFormattedBirthDate = () => {
        let formattedBirthDate = state.birthDate.split('/')
        return `${formattedBirthDate[2]}-${formattedBirthDate[1]}-${formattedBirthDate[0]}`
    }

    // calculates the age
    const getAge = () => { 
        if (state.birthDate && state.birthDate.length === 10) {
            let today = new Date();
            let auxbirthDate = state.birthDate.split('/')
            auxbirthDate = new Date(auxbirthDate[2], auxbirthDate[1]-1, auxbirthDate[0])
            let age = today.getFullYear() - auxbirthDate.getFullYear();
            let m = today.getMonth() - auxbirthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < auxbirthDate.getDate())) {
                age--;
            }
            return age;
        }
    }


    const getGodparentId = () => {
        return axios.get(`${server}/users/godparent/${state.godparentId}`)
    }

    const signup = async () => {
        // if is dependet user
        if (state.godparentId) {
            // check if the godparentId is valid
            try {
                setState({...state, isLoading: true})
                const godparentIdData = await getGodparentId()
                if (godparentIdData.length === 0) {
                    setState({...state, isLoading: false})
                    throw 'Parent com id nao encontrado'
                }
                // signup user
                const data = await axios.post(`${server}/auth/signup`, {
                    name: state.name,
                    email: state.email,
                    password: state.password,
                    birthDate: getFormattedBirthDate(),
                    mainGodparent: state.godparentId,
                    type: 'dependent'
                })
                // if not sucess 
                if (data.status !== 200) showError(data.data)

            }catch(err) {
                setState({...state, isLoading: false})
                showError(err)
                console.log(err)
            }
            //reset values
            setState({...state, 
                age: null, 
                newUser: false,
                godparent: false,
                birthDate: null,
                name: '',
                hidePass: true,
                hidePassConfirm: true,
                confirmPass: '',
                godparentId: '',
                godparentType: '',
            })
            return 
        }

        // if not dependent user
        let type = 'autonomous'
        if (state.godparent) {
            type = 'godparent'
        }

        try {
            setState({...state, isLoading: true})
            const data = await axios.post(`${server}/auth/signup`, {
                name: state.name,
                email: state.email,
                password: state.password,
                birthDate: getFormattedBirthDate(),
                type,
                descr: state.godparentType,
            })

            if (data.status !== 200) showError(data.data)

        } catch (err) {
            setState({...state, isLoading: false})
            console.log(err)
            showError(err)
        }

        //reset values
        setState({...state, 
            age: null, 
            newUser: false,
            godparent: false,
            birthDate: null,
            name: '',
            hidePass: true,
            hidePassConfirm: true,
            confirmPass: '',
            godparentId: '',
            godparentType: '',
        })
    }



    const signin = async () => {
        try {
            setState({...state, isLoading: true})
            const res = await axios.post(`${server}/auth/signin`, {
                email: state.email, 
                password: state.password
            })
            const [data] = res.data
            userSignin(data)
            setState({...state, isLoading: false}) 

        } catch(err) {
            setState({...state, isLoading: false})
            console.log(err)
            showError(err)

        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.centerView} >
                <TextInput
                    value={state.email}
                    label='E-mail'
                    onChangeText={(email) => setState({...state, email})}
                    mode='outlined'
                    outlineColor='#6495ED'
                    placeholder='email@mail.com'
                    activeOutlineColor='#6495ED'
                    left={<TextInput.Icon icon='at' />}
                />
                { state.newUser && 
                <TextInput
                    value={state.name}
                    label='Nome Completo'
                    onChangeText={(name) => setState({...state, name})}
                    mode='outlined'
                    outlineColor='#6495ED'
                    placeholder=''
                    activeOutlineColor='#6495ED'
                    left={<TextInput.Icon icon='account-box' />}
                /> 
                }
                <TextInput
                    value={state.password}
                    label='Senha'
                    onChangeText={(password) => setState({...state, password})}
                    mode='outlined'
                    outlineColor='#6495ED'
                    placeholder='*********'
                    activeOutlineColor='#6495ED'
                    secureTextEntry={state.hidePass}
                    right={<TextInput.Icon icon='eye' onPress={() => setState({...state, hidePass: !state.hidePass})} />}
                    left={<TextInput.Icon icon='lock' />}
                />
                { state.newUser && 
                <TextInput
                    value={state.confirmPass}
                    label='Confirme a Senha'
                    onChangeText={(confirmPass) => setState({...state, confirmPass})}
                    mode='outlined'
                    outlineColor='#6495ED'
                    placeholder='*********'
                    activeOutlineColor='#6495ED'
                    secureTextEntry={state.hidePassConfirm}
                    right={<TextInput.Icon icon='eye' onPress={() => setState({...state, hidePassConfirm: !state.hidePassConfirm})} />}
                    left={<TextInput.Icon icon='lock' />}
                /> 
                }
                { state.newUser && 
                <TextInput
                    value={state.birthDate}
                    label='Data de Nascimento'
                    onChangeText={(birthDate) => { 
                        setState({...state, birthDate})
                    }}
                    mode='outlined'
                    outlineColor='#6495ED'
                    placeholder='dd/mm/aaaa'
                    activeOutlineColor='#6495ED'
                    left={<TextInput.Icon icon='calendar' />}
                    render={props => 
                        <TextInputMask
                            {...props}
                            type={'custom'}
                            options={{
                                mask:'99/99/9999'
                            }}
                            // ref={(ref) => ageRef.current = ref}
                        />
                    }
                /> 
                }
                { state.age && state.age < 16 && !state.godparentId ? 
                Alert.alert(`Usuario menor de 16 anos`, `É necessário informar o ID do padrinho ou madrinha para continuar`,[
                            { text: 'OK' }], { cancelable: true }) : null }
                { state.age && state.age < 16 ?
                <TextInput
                    value={state.godparentId}
                    label='ID do(a) Padrinho/Madrinha'
                    onChangeText={(id) => setState({...state, godparentId: id})}
                    mode='outlined'
                    outlineColor='#6495ED'
                    placeholder='37'
                    activeOutlineColor='#6495ED'
                    left={<TextInput.Icon icon='key-outline' />}
                />  : null}
                {state.godparent ? 
                <TextInput
                    value={state.godparentType}
                    label='Tipo de Padrinho/Madrinha'
                    onChangeText={(type) => setState({...state, godparentType: type})}
                    mode='outlined'
                    outlineColor='#6495ED'
                    placeholder='Ex: Mãe'
                    activeOutlineColor='#6495ED'
                    left={<TextInput.Icon icon='account' />}
                />  : null }
                {state.age && state.age > 16 ?
                <View style={styles.checkBox}>
                    <Checkbox
                        status={state.godparent ? 'checked' : 'unchecked'}
                        onPress={() => setState({...state, godparent: !state.godparent})}
                        color='purple'
                    />
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Sou Padrinho/Madrinha</Text>
                    </View>
                </View>
                    : null}
                {!state.newUser 
                    ?  <Button onPress={() => signin()} >LOGIN</Button>
                    : <Button onPress={() => signup()} >REGISTRAR-SE</Button>}   
                {!state.newUser
                ?  <Button onPress={() => {
                    setState({...state, newUser: !state.newUser, age: null, godparent: false}) 
                }} >REGISTRE-SE</Button>
                :  <Button onPress={() => {
                    setState({...state, newUser: !state.newUser, age: null, godparent: false}) 
                }} >JÁ POSSUO CONTA</Button>} 
                
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent:'center', 
        alignItems: 'center',
    },
    centerView: {
        flex: 1, 
        justifyContent:'center', 
        width: '80%',
    },
    checkBox: {
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingRight: 10, 
        margin: 10,
    },
})