import { $authHost, $host } from ".";


export const fetchOrders = async () => {
    const {data} = await $authHost.get('orders/')
    return data
}

export const fetchLastOrdeerID = async () => {
    try {const {data} = await $authHost.get('lastorder/')
    return data
    } catch (error) {
        console.error('Error during fetchLastOrdeerID:', error);
        throw error; // Propagate the error
    }
}

export const fetchOneOrder = async (id) => {
    try {const {data} = await $authHost.get('order/' + id + '/')
    return data
    } catch (error) {
        console.error('Error during fetchOneOrder:', error);
        throw error; // Propagate the error
    }
}

export const addPosition = async (itemID, quantity, price) => {
    try {const dataFetchLastOrderID = await fetchLastOrdeerID()
    const newPosition = {
        order: dataFetchLastOrderID.order_id,
        item: itemID,
        quantity: quantity,
        price: price
    };
    const response = await $authHost.post('position/create/', newPosition);
    return response;
    } catch (error) {
        console.error('Error during addPosition:', error);
        throw error; // Propagate the error
    }
}

export const updatePosition = async (positionID, newQuantity) => {
    try {console.log(newQuantity)
    const data = {
        quantity: newQuantity
    }
    const response = await $authHost.put('position/' + positionID + /update/, data);
    console.log(response)
    return response
    } catch (error) {
        console.error('Error during updatePosition:', error);
        throw error; // Propagate the error
    }
}

export const deletePosition = async (positionID) => {
    try {const response = await $authHost.delete('position/' + positionID + /delete/);
    console.log(response)
    return response
    } catch (error) {
        console.error('Error during deletePosition:', error);
        throw error; // Propagate the error
    }
}


export const completeOrder = async (orderID) => {        
    try {const response = await $authHost.put('order/' + orderID + '/update/', {
        status: "R"
    });
    console.log(response)
    } catch (error) {
        console.error('Error during completeOrder:', error);
        throw error; // Propagate the error
    }
}
