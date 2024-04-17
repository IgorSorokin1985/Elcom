import { $authHost, $host } from ".";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const companyInfo = async (companyID) => {
    try {
        const {data} = await $authHost.get('company/' + companyID + '/')
        return data
    } catch (error) {
        console.error('Error during companyInfo:', error);
        throw error; // Propagate the error
    }

}

export const deleteCompany = async (companyID) => {
    try {
        const {data} = await $authHost.delete('company/' + companyID + '/delete/')
        return data
    } catch (error) {
        console.error('Error during deleteCompany:', error);
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
        console.error('Error during addCompany:', error);
        throw error; // Propagate the error
    }
}