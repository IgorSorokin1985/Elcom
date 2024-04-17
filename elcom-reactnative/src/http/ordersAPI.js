import { $authHost, $host } from ".";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const fetchOrders = async () => {
    const {data} = await $authHost.get('orders/')
    return data
}

export const fetchLastOrdeerID = async () => {
    try {
        const {data} = await $authHost.get('lastorder/')
        return data
    } catch (error) {
        console.error('Error during fetching last order ID:', error);
        throw error; // Propagate the error
    }

}

export const fetchOneOrder = async (id) => {
    const {data} = await $authHost.get('order/' + id + '/')
    return data
}

export const addPosition = async (itemID, quantity, price) => {
    try {
        if ( await AsyncStorage.getItem('token')) {
            const orderID = await fetchLastOrdeerID();

            const newPosition = {
                order: orderID.order_id,
                item: itemID,
                quantity: quantity,
                price: price
            };
            const response = await $authHost.post('position/create/', newPosition);
            return response;
        } else {
            console.log('need autorization')
        }

    } catch (error) {
        console.error('Error during adding position:', error);
        throw error; // Propagate the error
    }
    
}

export const updatePosition = async (positionID, newQuantity) => {
    try {
        const data = {
            quantity: newQuantity
        }
        const response = await $authHost.put('position/' + positionID + /update/, data);
        return response
    } catch (error) {
        console.error('Error during updating position:', error);
        throw error; // Propagate the error
    }

}

export const deletePosition = async (positionID) => {
    try {
        const response = await $authHost.delete('position/' + positionID + /delete/);
        return response
    } catch (error) {
        console.error('Error during deleting position:', error);
        throw error; // Propagate the error
    }
}


export const completeOrder = async (orderID) => {  
    try {
        const response = await $authHost.put('order/' + orderID + '/update/', {
            status: "R"
        });
        console.log(response)
    } catch (error) {
        console.error('Error during completing order:', error);
        throw error; // Propagate the error
    } 

}
