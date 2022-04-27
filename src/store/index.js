import {createStore} from 'vuex'
import VuexPersist from 'vuex-persist'

import UserModule from "./token"
import GraphModule from "./graph"

const vuexLocalStorage = new VuexPersist({
    storage: window.localStorage,
    modules: ["UserModule"]
})

export default createStore({
    modules: {
        UserModule,
        GraphModule
    },
    plugins: [vuexLocalStorage.plugin]
})