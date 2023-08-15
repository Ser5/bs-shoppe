import { createRouter as _createRouter, createMemoryHistory, createWebHistory } from 'vue-router';
import { Pinia } from 'pinia';
import { useMainStore }  from '@store/main';
import IndexPage         from './components/pages/IndexPage.vue';
import NotFoundPage      from './components/pages/NotFoundPage.vue';
import CatalogPage       from './components/pages/CatalogPage.vue';
import FolderDetailPage  from './components/pages/FolderDetailPage.vue';
import ProductDetailPage from './components/pages/ProductDetailPage.vue';
import FavoritesPage     from './components/pages/FavoritesPage.vue';
import BasketPage        from './components/pages/BasketPage.vue';
import OrderPage         from './components/pages/OrderPage.vue';
import OrderDonePage     from './components/pages/OrderDonePage.vue';



export function createRouter (pinia: Pinia) {
	let router = _createRouter({
		history: (import.meta.env.SSR ? createMemoryHistory() : createWebHistory()),
		routes: [
			{name: 'index',         path: '/',                     component: IndexPage},
			{name: 'notFound',      path: '/404/',                 component: NotFoundPage},
			{name: 'catalog',       path: '/catalog/',             component: CatalogPage},
			{name: 'folderDetail',  path: '/catalog/:path+/',      component: FolderDetailPage, props: true },
			{name: 'productDetail', path: '/catalog/product/:id/', component: ProductDetailPage, props: route => ({id: +route.params.id}) },
			{name: 'favorites',     path: '/favorites/',           component: FavoritesPage},
			{name: 'basket',        path: '/basket/',              component: BasketPage},
			{name: 'order',         path: '/order/',               component: OrderPage},
			{name: 'orderDone',     path: '/order/done/',          component: OrderDonePage},
		],
	});

	router.beforeEach(async (to, from, next) => {
		let routeName: string = (to.name?.toString() ?? '');
		await useMainStore().load(routeName);
		next();
	});

	return router;
}
