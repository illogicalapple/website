import { createApp } from 'vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'

let app = createApp()
let router = createRouter({
	history: createWebHistory(),
	routes: routes
});

app.use(router);
app.mount("#app");
