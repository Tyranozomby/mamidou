export default {
    state: {
        token: null
    },
    mutations: {
        login(state, payload) {
            state.token = payload.token
        },
        logout(state) {
            state.token = null
        }
    },
    getters: {
        authHeader(state) {
            if (state.token)
                return {headers: {'x-access-token': state.token}};
            else
                return {};
        },
        isConnected(state) {
            return !!state.token
        }
    }
}