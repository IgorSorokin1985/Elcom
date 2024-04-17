import { $authHost, $host } from ".";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const registration = async (name, email, password, telegram_chat_id) => {
    try {
        const {data} = await $host.post('user/create/', {
            name: name, 
            email: email, 
            password: password, 
            telegram_chat_id: telegram_chat_id
        })
        return data;
    } catch (error) {
            console.error('Error during registration:', error);
            throw error; // Propagate the error
        }
}

export const login = async (email, password) => {
    try {
        const { data } = await $host.post('token/', { email, password });
        await AsyncStorage.setItem('login', email);
        await AsyncStorage.setItem('password', password);
        await AsyncStorage.setItem('token', data.access);
        return data.access;
    } catch (error) {
        console.error('Error during login:', error);
        throw error; // Propagate the error
    }
};

export const userInfo = async (userID) => {
    try {
        const {data} = await $authHost.get('user/' + userID + '/')
        return data
    } catch (error) {
        console.error('Error during user info:', error);
        throw error; // Propagate the error
    }

}

export const addCompany = async (name, inn, kpp, address, amount) => {
    try {
        const data = {
            name: name,
            inn: inn,
            kpp: kpp,
            address: address,
            amount: amount,
        }
        const {response} = await $authHost.post('company/create/', data)
        return response
    } catch (error) {
        console.error('Error during add company:', error);
        throw error; // Propagate the error
    }

}
