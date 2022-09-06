import { Platform, Alert } from 'react-native'

const server = Platform.OS === 'ios' ? 'http://54.233.129.48:3000' : 'http://54.233.129.48:3000'
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