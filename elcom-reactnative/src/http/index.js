import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const REACT_APP_API_URL = 'http://158.160.68.151:9000/'

const $host = axios.create({
    baseURL: REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: REACT_APP_API_URL
})

const authInterceptor = async (config) => {
    config.headers.authorization = "Bearer " + await AsyncStorage.getItem('token');
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}