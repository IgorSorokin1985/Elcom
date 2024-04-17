import { $authHost, $host } from ".";


export const companyInfo = async (companyID) => {
    const {data} = await $authHost.get('company/' + companyID + '/')
    return data
}

export const deleteCompany = async (companyID) => {
    const {data} = await $authHost.delete('company/' + companyID + '/delete/')
    return data
}

export const addCompany = async (name, inn, kpp, address, amount) => {
    const data = {
        name: name,
        inn: inn,
        kpp: kpp,
        address: address,
        amount: amount,
    }
    const {response} = await $authHost.post('company/create/', data)
    return response
}