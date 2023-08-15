import { defineStore }      from 'pinia';
import { IPropValuesMap }   from 'common/interfaces';
import { useOffersStore }   from './offers';
import { useProductsStore } from './products';
import { useBasketStore }   from './basket';



export const useCatalogStore = defineStore('catalog', () => {
	let productsStore = useProductsStore();
	let offersStore   = useOffersStore();
	let basketStore   = useBasketStore();

	//Назначаем на кнопки товаров количества соответственно лежащему в корзине
	for (let [offerId, count] of Object.entries(basketStore.byId)) {
		let offer = offersStore.byId[+offerId];
		if (offer) {
			productsStore.setPropValueCount(offer.productId, offer.props, count);
		}
	}

	function setOfferCount (offerId: number, count: number) {
		let offer = offersStore.byId[offerId];
		if (offer) {
			basketStore.changeCount(offer.id, count);
		}
	}

	function setProductOfferCount (productId: number, propValues: IPropValuesMap, count: number) {
		productsStore.setPropValueCount(productId, propValues, count);
		let offer = offersStore.findOffer(productId, propValues);
		if (offer) {
			basketStore.changeCount(offer.id, count);
		}
	}

	return {setOfferCount, setProductOfferCount};
});
