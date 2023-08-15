import { defineStore } from 'pinia';
import { ref }         from 'vue';
import { TOfferSearchParams, IOffer, IBasketFullData, IBasketTotal, IBasket } from 'common/interfaces';
import { useOffersStore }   from './offers';
import { useProductsStore } from './products';
import { fetchApi }         from 'common/utils';



export const useBasketStore = defineStore('basket', () => {
	let productsStore = useProductsStore();
	let offersStore   = useOffersStore();

	let basket: IBasket = {};
	let byId = ref(basket);

	function getOfferSearchParams (productId: number): TOfferSearchParams {
		return [productId, productsStore.getActivePropValuesMap(productId)];
	}

	function findOffer (productId: number): IOffer|null {
		return offersStore.findOffer(...getOfferSearchParams(productId));
	}



	function getCount (offerId: number): number {
		return offersStore.byId[offerId] ? byId.value[offerId] : 0;
	}

	function add (offerId: number, count: number = 1) {
		if (offersStore.byId[offerId]) {
			byId.value[offerId] = count;
			fetchApi(`/basket/${offerId}/?count=${count}`, 'POST');
		}
	}

	function changeCount (offerId: number, count: number) {
		if (offersStore.byId[offerId] && byId.value[offerId]) {
			byId.value[offerId] = count;
			fetchApi(`/basket/${offerId}/?count=${count}`, 'PATCH');
		}
	}

	function remove (offerId: number) {
		delete byId.value[offerId];
		fetchApi(`/basket/${offerId}/`, 'DELETE');
	}

	function clear (callback: ()=>void = ()=>undefined) {
		byId.value = {};
		fetchApi(`/basket/`, 'DELETE').then(callback);
	}



	function getOffersCountForProduct (productId: number): number {
		let offer = findOffer(productId);
		return offer ? getCount(offer.id) : 0;
	}

	function addOfferForProduct (productId: number, count: number = 1) {
		let offer = findOffer(productId);
		if (offer) {
			add(offer.id, count);
		}
	}

	function changeOffersCountForProduct (productId: number, count: number) {
		let offer = findOffer(productId);
		if (offer) {
			changeCount(offer.id, count);
		}
	}



	function getTotal (): IBasketTotal {
		let count = 0;
		let price = 0;
		for (let [offerId, cnt] of Object.entries<number>(byId.value)) {
			let offer = offersStore.byId[+offerId];
			if (offer) {
				count += cnt;
				price += offer.price * cnt;
			}
		}
		return {count, price};
	}

	function getFullData (): IBasketFullData {
		let r: IBasketFullData = {
			total: getTotal(),
			items: [],
		};
		for (let [offerId, count] of Object.entries<number>(byId.value)) {
			let offer = offersStore.byId[+offerId];
			if (offer) {
				let price = offer.price * count;
				r.items.push({offer, count, price});
			}
		}
		return r;
	}



	return {
		byId,
		getCount, add, changeCount, remove, clear,
		getOffersCountForProduct, addOfferForProduct, changeOffersCountForProduct,
		getTotal, getFullData
	};
});
