import { defineStore }   from 'pinia';
import { computed, ref } from 'vue';
import { IFavorites }    from 'common/interfaces';
import { fetchApi }      from 'common/utils';



export const useFavoritesStore = defineStore('favorites', () => {
	let favorites: IFavorites = {};
	let byId     = ref(favorites);
	let allIds   = computed(() => Object.keys(byId.value).map(id => +id));

	function count (): number {
		return Object.keys(byId.value).length;
	}

	function isSet (productId: number): boolean {
		return byId.value[productId] ? true : false;
	}

	function toggle (productId: number): boolean {
		if (!byId.value[productId]) {
			byId.value[productId] = true;
			fetchApi(`/favorites/${productId}/`, 'POST');
			return true;
		} else {
			delete byId.value[productId];
			fetchApi(`/favorites/${productId}/`, 'DELETE');
			return false;
		}
	}

	return {byId, allIds, count, isSet, toggle};
});
