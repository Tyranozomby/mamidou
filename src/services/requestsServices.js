import axios from "axios";
import store from "@/store"

const URL = "//localhost:3000/api/"

class RequestsService {

    async login(password) {
        return await axios.post(URL + "login", {password})
    }

    async getChildren() {
        return await axios.get(URL + 'children')
    }

    async getData() {
        return await axios.get(URL + 'data')
    }

    async addData(child, date, value) {
        return await axios.put(URL + "data/" + child, {date, value}, store.getters.authHeader)
    }

    async addChild(child, date, color) {
        return await axios.put(URL + "children/" + child, {date, color}, store.getters.authHeader)
    }

    async editData(child, date, value) {
        return await axios.patch(URL + "data/" + child + "/" + date, {value}, store.getters.authHeader)
    }

    async deleteData(child, pos) {
        return await axios.delete(URL + "data/" + child + "/" + pos, store.getters.authHeader)
    }

    async deleteAllData(child) {
        return await axios.delete(URL + "data/" + child, store.getters.authHeader)
    }

    async deleteChild(child) {
        return await axios.delete(URL + "children/" + child, store.getters.authHeader)
    }
}

export default new RequestsService()