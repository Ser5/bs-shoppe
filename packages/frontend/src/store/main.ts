import { defineStore }       from 'pinia';
import { fetchApi }          from 'common/utils';
import { useBackdropStore }  from './backdrop';
import { useBasketStore }    from './basket';
import { useFavoritesStore } from './favorites';
import { useFoldersStore }   from './folders';
import { useOffersStore }    from './offers';
import { useProductsStore }  from './products';
import { useCatalogStore }   from './catalog';
import { useNavChainStore }  from './nav-chain';



export const useMainStore = defineStore('main', () => {
	let backdropStore  = useBackdropStore();
	let foldersStore   = useFoldersStore();
	let offersStore    = useOffersStore();
	let productsStore  = useProductsStore();
	let basketStore    = useBasketStore();
	let favoritesStore = useFavoritesStore();
	let catalogStore   = useCatalogStore();
	let navChainStore  = useNavChainStore();

	function backdrop  () { return backdropStore  };
	function folders   () { return foldersStore   };
	function offers    () { return offersStore    };
	function products  () { return productsStore  };
	function basket    () { return basketStore    };
	function favorites () { return favoritesStore };
	function catalog   () { return catalogStore   };
	function navChain  () { return navChainStore  };

	let _map: Record<string, any> = {
		folders:   foldersStore,
		offers:    offersStore,
		products:  productsStore,
		basket:    basketStore,
		favorites: favoritesStore,
	};

	async function load (routeName: string) {
		let data = await fetchApi<Record<string,any>>(`/page/${routeName}/`);
		for (let [storeName, storeData] of Object.entries(data)) {
			if (_map[storeName] !== undefined) {
				_map[storeName].byId = storeData;
			}
		}
	};

	return {backdrop, folders, offers, products, basket, favorites, catalog, navChain, load};
});
