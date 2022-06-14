import axios from "axios";
import store from "@/store"

const URL = process.env.VUE_APP_API_URL

class RequestsService {

    async login(password) {
        try {
            return await axios.post(URL + "login", {password})
        } catch (e) {
            return e.response
        }
    }

    async getChildren() {
        try {
            return await axios.get(URL + 'children')
        } catch (e) {
            return e.response
        }
    }

    async getData() {
        return await axios.get(URL + 'data')
    }

    async addData(child, date, value) {
        try {
            return await axios.put(URL + "data/" + child, {date, value}, store.getters.authHeader)
        } catch (e) {
            store.commit("logout")
            return e.response
        }
    }

    async addChild(child, date, color) {
        try {
            return await axios.put(URL + "children/" + child, {date, color}, store.getters.authHeader)
        } catch (e) {
            store.commit("logout")
            return e.response
        }
    }

    async editData(child, date, value) {
        try {
            return await axios.patch(URL + "data/" + child + "/" + date, {value}, store.getters.authHeader)
        } catch (e) {
            store.commit("logout")
            return e.response
        }
    }

    async deleteData(child, pos) {
        try {
            return await axios.delete(URL + "data/" + child + "/" + pos, store.getters.authHeader)
        } catch (e) {
            store.commit("logout")
            return e.response
        }
    }

    async deleteAllData(child) {
        try {
            return await axios.delete(URL + "data/" + child, store.getters.authHeader)
        } catch (e) {
            store.commit("logout")
            return e.response
        }
    }

    async deleteChild(child) {
        try {
            return await axios.delete(URL + "children/" + child, store.getters.authHeader)
        } catch (e) {
            store.commit("logout")
            return e.response
        }
    }

    async refreshToken() {
        try {
            return await axios.get(URL + "refreshToken", store.getters.authHeader)
        } catch (e) {
            store.commit("logout")
            return e.response
        }
    }
}

export default new RequestsService()