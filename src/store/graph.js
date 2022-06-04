import RequestsServices from "@/services/requestsServices";

export default {
    state: {
        children: {},
        data: {}
    },
    mutations: {
        updateChildren(state, data) {
            state.children = data;
        },
        updateData(state, data) {
            state.data = data;
        }
    },
    getters: {
        children(state) {
            return state.children
        },
        data(state) {
            return state.data
        },
        names(state) {
            let children = state.children

            if (children)
                return Object.keys(children).sort();
            else
                return [];
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