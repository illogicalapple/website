import { createApp } from 'vue'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'

let app = createApp(App)
let router = createRouter({
	history: createWebHistory(),
	routes: routes
});

app.use(router);
app.mount(App);
