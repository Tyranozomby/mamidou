import {createApp} from 'vue'
import App from './App.vue'
import store from "./store"
import {createI18n} from 'vue-i18n/index'
import messages from './locale'

const i18n = createI18n({
    locale: 'fr',
    fallbackLocale: 'en',
    warnHtmlInMessage: 'off',
    messages
});

createApp(App).use(store).use(i18n).mount('#app')