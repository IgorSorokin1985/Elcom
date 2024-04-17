import { $authHost, $host } from ".";


export const fetchItems = async () => {
    try {const {data} = await $host.get('items/')
    return data
    } catch (error) {
        console.error('Error during fetchItems:', error);
        throw error; // Propagate the error
    }
}

export const fetchOneItem = async (id) => {
    try {const {data} = await $authHost.get('item/' + id)
    return data
    } catch (error) {
        console.error('Error during fetchOneItem:', error);
        throw error; // Propagate the error
    }
}

export const fetchCategories = async () => {
    try {const {data} = await $host.get('categories/')
    return data
    } catch (error) {
        console.error('Error during fetchCategories:', error);
        throw error; // Propagate the error
    }
}