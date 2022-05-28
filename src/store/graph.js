import RequestsServices from "@/services/requestsServices";
import ParseDate from "date-fns/parse";
import {fr} from "date-fns/locale";

function strToDate (str) {
    return ParseDate(str, 'dd/MM/yyyy', new Date(), {locale: fr})
}

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
                return Object.keys(children).sort((a, b) => {
                    const date1 = strToDate(children[a].date);
                    const date2 = strToDate(children[b].date);

                    if (date1 < date2)
                        return 1
                    else
                        return -1
                });
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