import { createApp } from 'vue'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'

let app = createApp({
	data: () => ({
		menuOpen: false
	}),
	template: "<router-view />"
});
let router = createRouter({
	history: createWebHistory(),
	routes: import.meta.hot ? [] : routes
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
router.beforeEach((to, from, next) => {

    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

    if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

    if (!nearestWithMeta) return next();

    nearestWithMeta.meta.metaTags.map(tagDef => {
            const tag = document.createElement('meta');

            Object.keys(tagDef).forEach(key => {
                tag.setAttribute(key, tagDef[key]);
            });

            tag.setAttribute('data-vue-router-controlled', '');

            return tag;
        })
        .forEach(tag => document.head.appendChild(tag));

    next();
});

app.use(router)

app.mount('#app')
