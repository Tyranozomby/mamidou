import RequestsServices from "@/services/requestsServices";

export default {
    state: {
        children: null,
        data: null,
        lastClicked: null
    },
    mutations: {
        updateChildren(state, data) {
            state.children = data;
        },
        updateData(state, data) {
            state.data = data;
        },
        setLastClicked(state, point) {
            state.lastClicked = point
        }
    },
    getters: {
        children(state) {
            return state.children
        },
        data(state) {
            return state.data
        }
    },
    actions: {
        async updateChildren(context) {
            const response = await RequestsServices.getChildren()
            context.commit("updateChildren", response.data)
        },
        async updateData(context) {
            const response = await RequestsServices.getData()
            context.commit("updateData", response.data)
        }
    }
}