import './style.css';
import { createSSRApp } from 'vue';
import { createPinia }  from 'pinia';
import { createRouter } from './router';
import App              from './App.vue';

export function createApp () {
	let pinia  = createPinia();
	let app    = createSSRApp(App);
	let router = createRouter(pinia);

	app.use(pinia);
	app.use(router);

	return {app, router};
}
