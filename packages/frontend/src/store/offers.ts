import { defineStore } from 'pinia';
import { ref, watch }  from 'vue';
import { IOffer, IOffers, IPropValuesMap, TOfferSearchParams } from "common/interfaces";



export const useOffersStore = defineStore('offers', () => {
	let offers: IOffers = {};
	let byId   = ref(offers);
	let allIds = ref(Object.keys(offers));

	let offersMap: Record<string, IOffer> = {};

	function getOffersMapKey (productId: number, propValues: IPropValuesMap): string {
		let propValuesString = '';
		for (let [propId, valueId] of Object.entries(propValues)) {
			propValuesString += `${propId}=${valueId};`;
		}
		return `${productId};${propValuesString}`;
	}

	watch(byId, (newById, oldById) => {
		for (let offer of Object.values<IOffer>(newById)) {
			let key        = getOffersMapKey(offer.productId, offer.props);
			offersMap[key] = offer;
		}
	});

	function getOfferSearchParams (offerId: number): TOfferSearchParams|null {
		let offer = byId.value[offerId];
		if (!offer) {
			return null;
		}
		return [offer.productId, offer.props];
	}

	function findOffer (productId: number, propValues: IPropValuesMap): IOffer|null {
		let key   = getOffersMapKey(productId, propValues);
		let offer = offersMap[key] ?? null;
		return offer;
	}

	return {byId, allIds, getOfferSearchParams, findOffer};
});
