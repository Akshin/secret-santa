import "./styles/index.scss";

import { createPinia } from "pinia";
import { createApp } from "vue";

// @ts-ignore
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount("#app");
