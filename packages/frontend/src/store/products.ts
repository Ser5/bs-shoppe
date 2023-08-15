import { defineStore }    from 'pinia';
import { ref, watch }     from 'vue';
import { useOffersStore } from './offers';
import { getPropValueComboStringsList }                from 'common/utils';
import { IPropValuesMap, IOffer, IProducts, IProduct } from "common/interfaces";

interface IActivePropValues extends Record<number, IPropValuesMap> {};



export const useProductsStore = defineStore('products', () => {
	let products: IProducts = {};
	let byId   = ref(products);
	let allIds = ref(Object.keys(products));

	let offersStore = useOffersStore();

	function getPropValueMapKey (productId: number, propValues: IPropValuesMap): string {
		let propValuesString = '';
		for (let [propId, valueId] of Object.entries(propValues)) {
			propValuesString += `${propId}=${valueId};`;
		}
		return `${productId};${propValuesString}`;
	}

	let _activePropValues: IActivePropValues      = {};
	let _propValueCounts:  Record<string, number> = {};

	let activePropValues = ref(_activePropValues);
	let propValueCounts  = ref(_propValueCounts);

	watch(byId, (newById, oldById) => {
		for (let product of Object.values<IProduct>(newById)) {
			//activePropValues
			activePropValues.value[product.id] = {};
			for (let prop of Object.values(product.props)) {
				let firstValueId = Object.values(prop.values)[0].id;
				activePropValues.value[product.id][prop.id] = firstValueId;
			}
			//propValueCounts
			for (let propValuesString of getPropValueComboStringsList(product.props)) {
				let key = `${product.id};${propValuesString}`;
				propValueCounts.value[key] = 1;
			}
		}
	});



	function getPropValueCount (productId: number, propValuesMap: IPropValuesMap): number {
		let key = getPropValueMapKey(productId, propValuesMap);
		return propValueCounts.value[key] ?? 0;
	}

	function setPropValueCount (productId: number, propValuesMap: IPropValuesMap, count: number) {
		let key = getPropValueMapKey(productId, propValuesMap);
		if (propValueCounts.value[key]) {
			propValueCounts.value[key] = count;
		}
	}

	function getActivePropValueId (productId: number, propId: number): number {
		return activePropValues.value[productId][propId];
	}

	function getActivePropValuesMap (productId: number): IPropValuesMap {
		return activePropValues.value[productId];
	}

	function setActivePropValue (productId: number, propId: number, propValueId: number) {
		activePropValues.value[productId][propId] = propValueId;
	}



	function getActiveOffer (productId: number): IOffer|null {
		return offersStore.findOffer(productId, getActivePropValuesMap(productId));
	}



	function getForFolder (folderId: number): IProducts {
		let folderProducts: IProducts = {};
		for (let product of Object.values<IProduct>(byId.value)) {
			if (product.folderId == folderId) {
				folderProducts[product.id] = product;
			}
		}
		return folderProducts;
	}



	return {
		byId, allIds,
		getPropValueCount, setPropValueCount,
		getActivePropValueId, getActivePropValuesMap, setActivePropValue,
		getActiveOffer,
		getForFolder,
	};
});
