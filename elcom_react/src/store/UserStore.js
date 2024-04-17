import { makeAutoObservable } from "mobx"

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._lastOrderID = null
        this._userID = null
        makeAutoObservable(this)
    }

    setIsAuth (bool) {
        this._isAuth = bool
    }
    setUser (user) {
        this._user = user
    }
    setUserID (ID) {
        this._userID = ID
    }
    setLastOrderID (ID) {
        this._lastOrderID = ID
    }
    get isAuth () {
        return this._isAuth
    }
    get user () {
        return this._user
    }
    get userID () {
        return this._userID
    }
    get lastOrderID () {
        return this._lastOrderID
    }
}
