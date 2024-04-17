import { makeAutoObservable } from "mobx"

export default class ItemStore {
    constructor() {
        this._category = []
        this._items = []
        this._selectedCategory = {id: 1}
        makeAutoObservable(this)
    }

    setSelectedCategory (type) {
        this._selectedCategory = type
    }

    setCategory (category) {
        this._category = category
    }
    setItems (items) {
        this._items = items
    }
    get category () {
        return this._category
    }
    get items () {
        return this._items
    }
    get selectedCategory () {
        return this._selectedCategory
    }
}
