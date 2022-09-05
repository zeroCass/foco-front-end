import { Platform, Alert } from 'react-native'

const server = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000'
// const server = 'http://localhost:3000'

const showError = (err) => {
    if (err.response && err.response.data) {
        Alert.alert(`Ops!Algo deu errado: ${err.response.data}`)
    }
    Alert.alert(`Ops!Algo deu errado: ${err.response}`)
}

const showSucess = (msg) => {
    Alert.alert('Sucesso!', msg)
}

export { server, showError, showSucess }