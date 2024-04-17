import { $authHost, $host } from ".";
import { jwtDecode } from "jwt-decode";

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
    try {const {data} = await $host.post('token/', {email, password})
    localStorage.setItem('login', email)
    localStorage.setItem('password', password)
    localStorage.setItem('token', data.access)
    return jwtDecode(data.access)
    } catch (error) {
        console.error('Error during login:', error);
        throw error; // Propagate the error
    }
}

export const userInfo = async (userID) => {
    try {const {data} = await $authHost.get('user/' + userID + '/')
    return data
    } catch (error) {
        console.error('Error during userInfo:', error);
        throw error; // Propagate the error
    }
}
