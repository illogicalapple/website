import { createApp } from 'vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'

let app = createApp()
let router = createRouter({
	history: createWebHistory(),
	routes: import.meta.hot ? [] : routes,
})

if (import.meta.hot) {
	let removeRoutes = []

	for (let route of routes) {
		removeRoutes.push(router.addRoute(route))
	}

	import.meta.hot.accept('./routes.js', ({ routes }) => {
		for (let removeRoute of removeRoutes) removeRoute()
		removeRoutes = []
		for (let route of routes) {
			removeRoutes.push(router.addRoute(route))
		}
		router.replace('')
	})
}

app.use(router)

app.mount('#app')
